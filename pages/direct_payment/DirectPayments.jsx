import React, { useState, useEffect, useRef } from "react";
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
import httpService from "../../services/httpService";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import { useLoader } from "../../contexts/LoaderContext";
import useLmsStore  from "../../store/lmsStore";

function convertWebinarDateFormat(date) {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 10) + 'T' + newDate.toTimeString().slice(0, 5);
}

const DirectPayments = ({ courseId }) => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const addressRef = useRef(null);
    const stateRef = useRef(null);
    const countryRef = useRef(null);
    const gstinRef = useRef(null);
    const [directPaymentId, setDirectPaymentId] = useState("");
    const [invalidCoupon, setInvalidCoupon] = useState(false);
    const [invalidCouponMessage, setInvalidCouponMessage] = useState(false);
    const [couponDiscountText, setCouponDiscountText] = useState("");
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [courseDetails, setCourseDetails] = useState({});
    const [priceDetails, setPriceDetails] = useState({});
    const [taxDetails, setTaxDetails] = useState({ cgst: 0, sgst: 0, igst: 0, userState: "Telangana", userCountry: "IN" });
    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [gstinNumber, setGstinNumber] = useState("");
    const [couponDetails, setCouponDetails] = useState("");
    const [couponError, setCouponError] = useState("");
    const [proceedToCheckoutClicked, setProceedToCheckoutClicked] = useState(false);
    const [thumbnail, setThumbnail] = useState("");
    const router = useRouter();
    const queryParams = new URLSearchParams(router.asPath.search);
    const { setLoading } = useLoader();
    // const { courseId } = router.query;
    // const navigate = useNavigate();
    const MAX_RETRIES = 3;
    const RETRY_DELAY_MS = 2000; // 2 seconds
    const [errors, setErrors] = useState({})

    const processingPayment = useRef(false);
    const cartVisitor = useLmsStore((state) => state.cartVisitor);

    useEffect(() => {
        if (cartVisitor) {
            setName(cartVisitor.fullName || "");
            setEmail(cartVisitor.email || "");
            setPhone(cartVisitor.phone || "");
        }
        console.log("Cart Visitor: ", cartVisitor);
    }, [cartVisitor]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await httpService.get("course/getCountries");
                const countryData = response.data.map((country) => ({
                    id: country.id,
                    name: country.name,
                    iso: country.iso2
                }));
                setCountries(countryData);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        const fetchCourseDetails = async () => {
            try {
                setLoading(true)
                const response = await httpService.get(`course/fetchCourseDetails/${courseId}`);
                setLoading(false)
                if (response?.data?.data) {
                    setCourseDetails(response.data.data);
                    setThumbnail(response.data.thumbnail || "/images/course/thumbnail.png"); // Set default thumbnail if not available

                    const taxRates = response.data.course_selling_tax || { cgst: 0, sgst: 0, igst: 0, userState: "Telangana", userCountry: "IN" }; // Default tax values
                    setTaxDetails(taxRates);

                    //set default country
                    let userCountryObj = countries.filter(country => country.iso == taxRates.userCountry)

                    if (userCountryObj.length > 0) {
                        //console.log(userCountryObj);
                        setCountry(userCountryObj[0].id)
                    }
                    //console.log(typeof response.data.data.discount_flag, response.data.data.discount_flag == null);
                    calculateTax(
                        response.data.data.price,
                        response.data.data.discount_flag,
                        response.data.data.discounted_price,
                        taxRates
                    ).then((calculatedTaxDetails) => {
                        setPriceDetails(calculatedTaxDetails); // ✅ Correctly setting the tax details
                    }).catch(error => {
                        console.error("Error calculating tax:", error);
                    });

                } else {
                    console.error("No data received from the API");
                }
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        courseId && fetchCourseDetails();
        fetchCountries();
    }, [courseId]);

    // Fetch states based on selected country
    useEffect(() => {
        if (!country) return;

        const fetchStates = async () => {
            try {
                const response = await httpService.get(
                    `course/getStates/${country}`
                );
                if (response.data) {
                    const stateData = response.data.map((state) => ({
                        id: state.id,
                        name: state.name,
                    }));
                    setStates(stateData);
                } else {
                    setStates([]);
                }
            } catch (error) {
                console.error("Error fetching states:", error);
                setStates([]);
            }
        };
        fetchStates();
    }, [country]);

    useEffect(() => {
        const calculateTaxDetails = async () => {
            //console.log("Recalculating Tax with Coupon");
            calculateTax(
                courseDetails.price,
                courseDetails.discount_flag,
                courseDetails.discounted_price,
                taxDetails
            ).then((calculatedTaxDetails) => {
                //console.log(calculatedTaxDetails);
                setPriceDetails(calculatedTaxDetails); // ✅ Correctly setting the tax details
            }).catch(error => {
                console.error("Error calculating tax:", error);
            });
        };

        if (couponDetails) {
            calculateTaxDetails();
        }
    }, [couponDetails]);

    const calculateTax = async (price, discountFlag, discountedPrice, taxRates) => {
        let finalDiscountedPrice = discountFlag == true ? discountedPrice : price; // Start with original price
        //console.log(typeof discountFlag, discountFlag == true);

        //console.log(price, discountFlag, finalDiscountedPrice);
        // Apply coupon discount (if applicable)
        if (couponDetails && couponDetails.status === "active") {
            if (couponDetails.coupon_value_type === "amount") {
                finalDiscountedPrice = Math.max(price - couponDetails.coupon_value, 0);
            } else if (couponDetails.coupon_value_type === "percentage") {
                finalDiscountedPrice = Math.max(price - (price * couponDetails.coupon_value) / 100, 0);
            }
        } else if (discountFlag) {
            finalDiscountedPrice = discountedPrice;
        }

        // Calculate tax values based on the final discounted price
        const cgstAmount = (finalDiscountedPrice * (taxRates?.cgst || 0)) / 100;
        const sgstAmount = (finalDiscountedPrice * (taxRates?.sgst || 0)) / 100;
        const igstAmount = (finalDiscountedPrice * (taxRates?.igst || 0)) / 100;
        const totalTax = cgstAmount + sgstAmount + igstAmount;
        const totalPriceWithTax = finalDiscountedPrice + totalTax;
        //console.log(price, discountFlag, finalDiscountedPrice, totalTax);
        return {
            discountFlag: discountFlag,
            originalPrice: price,
            discountedPrice: finalDiscountedPrice,
            cgstAmount,
            sgstAmount,
            igstAmount,
            totalTax,
            totalPriceWithTax,
        };
    };

    const validateCoupon = async () => {
        if (!coupon) {
            setCouponError("Please enter a coupon code");
            return;
        }
        setInvalidCouponMessage("");

        try {
            //console.log(coupon);
            let response;
            setLoading(true)
            if (email) {
                response = await httpService.get(`course/validateCoupon/${coupon}/${courseId}/${email}`);
            } else {
                response = await httpService.get(`course/validateCoupon/${coupon}/${courseId}`);
            }
            setLoading(false)
            if (response?.data?.appliedCoupon) {
                //console.log(response.data.appliedCoupon);
                setCouponDetails(response.data.appliedCoupon);
                setCouponApplied(true);
                const couponDiscountText =
                    response.data.appliedCoupon.coupon_value_type === "percentage"
                        ? `${response.data.appliedCoupon.coupon_value}% (${(courseDetails.price / 100) * response.data.appliedCoupon.coupon_value})`
                        : `${response.data.appliedCoupon.coupon_value}`;
                //console.log(couponDiscountText);
                setCouponDiscountText(couponDiscountText);
                setInvalidCoupon(false);
                setInvalidCouponMessage("");

            } else {
                setCouponDetails({})
                setCouponApplied(false);
                setInvalidCoupon(true);
                setInvalidCouponMessage(response?.data?.message);
            }
        } catch (error) {
            setCouponDetails({})
            setCouponApplied(false);
            setInvalidCoupon(true);
            setInvalidCouponMessage(response?.data?.message);
            console.error("Error validating coupon:", error);
        }
    };

    const validateAndComposeData = () => {
        // Trim values and validate required fields
        if (!name.trim() || !validateName(name)) {
            nameRef.current?.scrollIntoView({ behavior: "smooth" });
            return { error: "Name is required" };
        }
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
            emailRef.current?.scrollIntoView({ behavior: "smooth" });
            return { error: "Valid email is required" };
        }
        if (!phone.trim() || !isValidPhoneNumber(phone)) {
            phoneRef.current?.scrollIntoView({ behavior: "smooth" });
            return { error: "Valid phone number is required (15 digits, spaces and + allowed)" };
        }
        if (!address.trim()) {
            addressRef.current?.scrollIntoView({ behavior: "smooth" });
            return { error: "Address is required" };
        }
        if (!state.trim()) {
            stateRef.current?.scrollIntoView({ behavior: "smooth" });
            return { error: "State is required" };
        }
        if (!country) {
            countryRef.current?.scrollIntoView({ behavior: "smooth" });
            return { error: "Country is required" };
        }
        if (gstinNumber.trim() && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9][A-Z0-9][0-9]$/.test(gstinNumber.trim())) {
            gstinRef.current?.scrollIntoView({ behavior: "smooth" });
            return { error: "Invalid GSTIN Number" };

        }

        // Compose validated object (excluding coupon & gstinNumber)
        return {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim(),
            state: state.trim(),
            country: country
        };
    };

    const validateName = (name) => {
        const trimmed = name.trim();
        const nameRegex = /^[A-Za-z]+(?:\s*[A-Za-z]+)+$/; // At least one space and only letters

        return nameRegex.test(trimmed);
    };

    const validateEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email.trim());
    };

    const validateGstinNumber = (gstinNumber) => {
        if (gstinNumber.trim() && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9][A-Z0-9][0-9]$/.test(gstinNumber.trim())) {
            return false;
        } else {
            return true;
        }
    }

    const loadRazorpay = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const makePayment = async (data, courseId, coupon, gstinNumber, payment_method) => {
        setLoading(true);
        let attempt = 0;
        let response = null;
        let success = false;

        while (attempt < MAX_RETRIES && !success) {
            try {
                response = await httpService.post(`payment/pay`, {
                    userData: data,
                    courseId: courseId,
                    coupon: coupon,
                    gstinNumber: gstinNumber,
                    paymentMethod: payment_method
                });

                success = true; // no error, break the loop
            } catch (err) {
                attempt++;
                console.error(`Payment attempt ${attempt} failed`, err);
                if (attempt < MAX_RETRIES) {
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                } else {
                    setLoading(false);
                    alert("Payment failed after multiple attempts. Please try again.");
                    return;
                }
            }
        }

        setLoading(false);

        if (response?.data?.finalPriceDetails) {
            setDirectPaymentId(response.data.directPaymentId);

            if (payment_method === 'razorpay') {
                openRazorpayPaymentPage(response, data);
            } else if (payment_method === 'phonepe') {
                processingPayment.current = true;
                openPhonepePaymentPage(response, data);
            }
        }
    };

    const proceedToCheckout = async (payment_method) => {
        setLoading(true)
        setProceedToCheckoutClicked(true);
        let data = validateAndComposeData();
        if (data && data.error) {
            //alert(data.error)
            setLoading(false)
            return true;
        }
        const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
        setLoading(false)
        if (!res) {
            console.error("Razorpay SDK failed to load. Check network or script URL.");
            return;
        }
        makePayment(data, courseId, coupon, gstinNumber, payment_method);
    }

    const openPhonepePaymentPage = (response, data) => {
        window.location.href = response?.data?.redirectUrl;
    }

    const openRazorpayPaymentPage = (preresponse, data) => {
        const options = {
            // key: "rzp_test_xvOk5RDYmeuXYG",
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "rzp_live_ueLIAvyKBHgxkQ", // Use environment variable or default to test key
            amount: preresponse.data.order.amount,
            currency: preresponse.data.order.currency,
            name: "Tech Leads IT",
            description: couponDetails.title,
            order_id: preresponse.data.order.id,
            handler: async function (response) {
                try {
                    // Make the POST request
                    setLoading(true)
                    const verifyRes = await httpService.post("payment/verify", response);
                    //console.log(verifyRes);
                    setLoading(false)
                    // Check if the response is successful
                    if (verifyRes && verifyRes.status === 200) {
                        //console.log("Payment verification successful:", verifyRes.data);
                        // Handle success (e.g., show success message, update UI)
                        router.push(`/paymentsuccess/${verifyRes.data.paymentId}/${preresponse.data.order.id}`);
                    } else {
                        console.error("Payment verification failed:", verifyRes.data);
                        // Handle failure (e.g., show error message)
                        router.push('/paymentfailed/' + verifyRes.data.courseId);
                    }
                } catch (error) {
                    console.error("Error occurred during payment verification:", error.message);
                    setLoading(false)
                    router.push('/paymentfailed/' + courseId);
                }

            },
            prefill: {
                name: data.name,
                email: data.email,
                contact: data.phone,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
    }


    const toggleContent = (method) => {
        setSelectedMethod(selectedMethod === method ? null : method); // Toggle selection
    };

    const handleEmailChange = async (e) => {
        const newEmail = e.target.value;
        // If coupon is applied and is offer_on_next_purchase, show confirmation before changing email
        if (
            couponApplied &&
            couponDetails &&
            Object.keys(couponDetails).length > 0 &&
            (couponDetails.coupon_type === "offer_on_next_purchase" || (couponDetails.coupon_type == 'flat_discount' && couponDetails.max_users > 0)) &&
            email &&
            newEmail !== couponDetails.email
        ) {
            const confirmChange = window.confirm(
                "If you change the email, the coupon will be removed. Do you want to continue?"
            );
            if (confirmChange) {
                setEmail(newEmail);
                setCoupon("");
                setCouponDetails({});
                setCouponApplied(false);
                setCouponDiscountText("");
                if ((couponDetails.coupon_type == 'flat_discount' && couponDetails.max_users > 0)) {
                    //remove coupon usage record
                    await httpService.get(`course/removeCouponUsage/${couponDetails.id}/${email}/${couponDetails.course_id}`)
                }
            } else {
                // Keep the old email in the input
                if (emailRef.current) {
                    emailRef.current.value = email;
                }
            }
        } else {
            setEmail(newEmail);
        }
    };

    const handleRemoveCouponUsage = async () => {
        if (
            couponApplied &&
            couponDetails &&
            couponDetails.coupon_type === "flat_discount" &&
            couponDetails.max_users > 0 &&
            email &&
            couponDetails.id &&
            couponDetails.course_id
        ) {
                httpService.get(
                    `course/removeCouponUsage/${couponDetails.id}/${email}/${couponDetails.course_id}`
                );
        }
    };

    // Remove coupon usage on page unload if flat_discount with max_users
    useEffect(() => {
        function handleUnload(event) {
            // Only skip if PhonePe checkout was clicked
            if (!processingPayment.current) {
                handleRemoveCouponUsage();
            }
        }

        window.addEventListener("beforeunload", handleUnload);
        window.addEventListener("pagehide", handleUnload);

        /*return () => {
            window.removeEventListener("beforeunload", handleUnload);
            window.removeEventListener("pagehide", handleUnload);
        };*/
    }, [couponApplied, couponDetails, email]);


    return (
        <section className="Payment-Gateway-section">

            <div className="pb-50 pb-20 table-align">
                <div className="gateway-sections">
                    <div className="order-2 order-lg-1">
                        <div className="checkout-box mb-4">
                            <h5 className="checkout-box-h">Contact Information</h5>
                            <form>
                                <div className="Payment-input-container">
                                    <input
                                        type="text"
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                        id="name"
                                        value={name}
                                        className={`Payment-input-field ${proceedToCheckoutClicked && (!name || !validateName(name)) ? "error-label" : ""}`}
                                        placeholder=" "
                                        ref={nameRef}
                                    />

                                    <label htmlFor="name" className="Payment-input-label top-animation">Full Name<span
                                        className="required">*</span></label>
                                </div>
                                <div className="Payment-input-container">
                                    <input type="email" onChange={handleEmailChange} id="email" value={email} ref={emailRef} className={`Payment-input-field ${proceedToCheckoutClicked && (!email || !validateEmail(email)) ? "error-label" : ""}`} placeholder=" " />
                                    <label htmlFor="email" className="Payment-input-label top-animation">Email<span
                                        className="required">*</span></label>
                                </div>
                                <div className="Payment-input-container">
                                    <PhoneInput
                                        international
                                        defaultCountry={taxDetails?.userCountry || "IN"} // Fallback to 'IN' (India) if undefined
                                        value={phone}
                                        onChange={setPhone}
                                        placeholder="Phone Number*"
                                        className={`Payment-input-field register_phone ${proceedToCheckoutClicked && (!phone || !isValidPhoneNumber(phone)) ? "error-label" : ""}`} // Keeps existing styles
                                        ref={phoneRef}
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="checkout-box mb-4">
                            <h5 className="checkout-box-h">Billing Address</h5>
                            <form>
                                <div className="Payment-input-container">
                                    <input type="text" required onChange={(e) => setAddress(e.target.value)} id="address" className={`Payment-input-field ${proceedToCheckoutClicked && !address ? "error-label" : ""}`} ref={addressRef} placeholder=" " />
                                    <label htmlFor="address" className="Payment-input-label">Address<span
                                        className="required">*</span></label>
                                </div>
                                <div className="grid-1">
                                    <div className="Payment-input-container">
                                        <select
                                            id="country"
                                            required
                                            value={country}
                                            onChange={(e) => {
                                                setCountry(e.target.value);
                                                setState(""); // Reset state when country changes
                                            }}
                                            className={`Payment-input-field Payment-select-field Payment-Gateway-Input-Field-H ${proceedToCheckoutClicked && !country ? "error-label" : ""}`}
                                            ref={stateRef}
                                        >
                                            <option value="" disabled>Select Country *</option>
                                            {countries.map((country) => (
                                                <option key={country.id} value={country.id}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="Payment-input-container">
                                        <select
                                            id="state"
                                            required
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            className={`Payment-input-field Payment-select-field Payment-Gateway-Input-Field-H ${proceedToCheckoutClicked && !state ? "error-label" : ""}`}
                                            disabled={!country} // Disable if no country selected
                                            ref={countryRef}
                                        >
                                            <option value="" disabled>Select State *</option>
                                            {states.map((state) => (
                                                <option key={state.id} value={state.id}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                            </form>
                        </div>

                        <div className="checkout-box mb-4">
                            <h5 className="checkout-box-h">Do you have a GSTIN number?</h5>
                            <div className="Payment-input-container">
                                <input type="text" onChange={(e) => setGstinNumber(e.target.value)} id="gstin-number" ref={gstinRef} className={`Payment-input-field ${proceedToCheckoutClicked && !validateGstinNumber(gstinNumber) ? "error-label" : ""}`} placeholder=" " />
                                <label htmlFor="number" className="Payment-input-label">Enter your GSTIN number</label>
                            </div>
                        </div>

                        <div>
                            <h5 className="checkout-box-h1">Select Payment Method</h5>

                            {/* PhonePe Payment Option */}
                            <label className="radio-container bg-white">
                                <div className="d-flex align-items-center">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={selectedMethod === "phonepe"}
                                        onChange={() => toggleContent("phonepe")}
                                    />
                                    <div className="payment-option">
                                        <img src="/images/payment_gateway/Phonepe-img.png" height="33" alt="PhonePe" />
                                    </div>
                                </div>
                                {selectedMethod === "phonepe" && (
                                    <div className="content show">
                                        <p className="payment-main">Continue with PhonePe.</p>
                                        <div className="grid-3 mb-2">
                                            <div className="d-flex align-items-center align-adj">
                                                <p className="payment-sub">This payment method also supports</p>
                                                <img src="/images/payment_gateway/Icons-set.svg" height="25" className="align-mt" alt="Icons" />
                                            </div>
                                            <button className="payment-btn mt-2" onClick={(e) => proceedToCheckout('phonepe')}>
                                                <img src="/images/payment_gateway/Phonepay-btn-icon.svg" height="15" className="me-2" alt="Checkout" />
                                                Checkout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </label>

                            {/* Razorpay Payment Option */}
                            {/* <label className="radio-container bg-white">
                                <div className="d-flex align-items-center">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={selectedMethod === "razorpay"}
                                        onChange={() => toggleContent("razorpay")}
                                    />
                                    <div className="payment-option">
                                        <img src={RazorpayImage} height="25" alt="Razorpay" />
                                    </div>
                                </div>
                                {selectedMethod === "razorpay" && (
                                    <div className="content show">
                                        <p className="payment-main">Continue With Razorpay</p>
                                        <div className="grid-3 mb-2">
                                            <div>
                                                <p className="payment-sub">
                                                    This payment method supports Net banking, Wallets, Pay Later & EMI.
                                                </p>
                                                <p className="notable-txt">EMI starts at ₹1,500/month</p>
                                            </div>
                                            <button className="payment-btn" onClick={(e) => proceedToCheckout('razorpay')}>
                                                <img src={RazorpayBtnIcon} height="15" className="me-2" alt="Checkout" />
                                                Checkout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </label> */}

                            {/* Razorpay EMI Option */}
                            <label className="radio-container bg-white">
                                <div className="d-flex align-items-center">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={selectedMethod === "razorpay-emi"}
                                        onChange={() => toggleContent("razorpay-emi")}
                                    />
                                    <div className="payment-option">
                                        <img src="/images/payment_gateway/Razorpay-img.png" height="25" alt="Razorpay" />
                                        <button className="blinker-emi">Pay With EMI</button>
                                    </div>
                                </div>
                                {selectedMethod === "razorpay-emi" && (
                                    <div className="content show">
                                        <p className="payment-main">Continue With Razorpay</p>
                                        <div className="grid-3 mb-2">
                                            <div>
                                                <p className="payment-sub">
                                                    This payment method supports Net banking, Wallets, Pay Later & EMI.
                                                </p>
                                                <p className="notable-txt">EMI starts at ₹1,500/month</p>
                                            </div>
                                            <button className="payment-btn" onClick={(e) => proceedToCheckout('razorpay')}>
                                                <img src="/images/payment_gateway/Razorpay-btn-icon.svg" height="15" className="me-2" alt="Checkout" />
                                                Checkout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </label>
                        </div>
                        <p className="text-muted warning-txt mt-3"><img src="/images/payment_gateway/Sheild-icon.svg" height="18"
                            className="me-2" /> 100% Secured payment gateway end-to-end encrypted</p>
                    </div>


                    <div className="order-1 order-lg-2">
                        <div className="checkout-box d-flex align-items-center">
                            <img src={process.env.NEXT_PUBLIC_FILES_URL + thumbnail} className="oracle-img" />
                            <div className="ms-3">
                                <h1 className="checkout-box-h1">{courseDetails?.title}</h1>
                                {courseDetails?.discount_flag && <p className="checkout-box-p">Early Bird Offer</p>}
                                <div className="d-flex align-items-baseline">
                                    {
                                        priceDetails?.discountFlag == true ? <>
                                            <h5 className="striked-price">&#8377;{courseDetails?.price}</h5>
                                            <h4 className="main-price">&#8377;{priceDetails?.discountedPrice}</h4> {taxDetails.userCountry == 'IN' && <span className="mini-text">+Taxes</span>}
                                        </> : <>
                                            <h4 className="main-price">&#8377;{courseDetails?.price}</h4>{taxDetails.userCountry == 'IN' && <span className="mini-text">+Taxes</span>}
                                        </>
                                    }

                                </div>
                            </div>
                        </div>
                        <h6 className="checkout-box-h1 mt-4">Coupons & Offers</h6>
                        <div className="coupon-container">
                            <div className="coupon-input-container">

                                {
                                    couponApplied ? (
                                        <>
                                            <input
                                                type="text"
                                                id="coupon-code"
                                                className="coupon-input-field bg-white"
                                                value={couponDetails?.coupon_name}
                                                disabled
                                            />
                                            <label htmlFor="coupon-code" className="coupon-input-label highlight-coupon">
                                                Coupon {couponDetails?.coupon_name} Applied
                                            </label>
                                            <button className="coupon-remove-btn" onClick={() => {
                                                setCoupon("");
                                                setCouponDetails({}); // Ensure state update
                                                setCouponApplied(false);
                                                handleRemoveCouponUsage();
                                            }}>
                                                Remove
                                            </button>

                                        </>
                                    ) : (
                                        <>
                                            <input
                                                type="text"
                                                id="coupon-code"
                                                onChange={(e) => setCoupon(e.target.value)}
                                                required
                                                className="coupon-input-field bg-white"
                                                placeholder=" "
                                                value={coupon}
                                            />
                                            <label htmlFor="coupon-code" className="coupon-input-label">
                                                Enter Coupon Code<span className="required">*</span>
                                            </label>
                                            <button className="coupon-apply-btn" onClick={validateCoupon}>
                                                Apply
                                            </button>
                                        </>
                                    )
                                }




                            </div>
                            {
                                couponApplied && <div className="d-flex align-items-baseline mb-3">
                                    <img src="/images/payment_gateway/tick-icon.png" height="17" className="tick-icon-y" />
                                    <span className="coupon-offer">Congratulations! Enjoy your exclusive {couponDiscountText} discount.</span>
                                </div>
                            }

                            {
                                invalidCoupon && <div className="d-flex align-items-center mb-3">
                                    <img src="/images/payment_gateway/invalid-icon.png" height="17" />
                                    <span className="invalid-message">{invalidCouponMessage ? invalidCouponMessage : "Invalid coupon code! Please check and try again."}</span>
                                </div>
                            }
                        </div>

                        <div className="checkout-box">
                            <h6 className="checkout-box-h1">Checkout Summary</h6>
                            <p className="checkout-summary"><span>Sub Total </span><span>&#8377;{priceDetails?.discountFlag ? priceDetails?.discountedPrice : priceDetails?.originalPrice}</span></p>
                            <p className="checkout-summary"><span>IGST</span><span>&#8377;{priceDetails?.igstAmount}</span></p>
                            <p className="checkout-summary"><span>CGST </span><span>&#8377;{priceDetails?.cgstAmount}</span></p>
                            <p className="checkout-summary"><span>SGST </span><span>&#8377;{priceDetails?.sgstAmount}</span></p>
                            {couponApplied && <div className="checkout-summary discount-row show">
                                <p className="">
                                    <span>Discount </span>
                                </p><span>-&#8377;{priceDetails?.originalPrice - priceDetails?.discountedPrice}</span>
                            </div>}
                            <p className="checkout-box-h2"><span>Total Amount </span><span>&#8377;{priceDetails?.totalPriceWithTax}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section >

    );
}

export default DirectPayments;