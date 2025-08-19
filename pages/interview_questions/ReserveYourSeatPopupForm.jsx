import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), { ssr: false });
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import httpService from "./../../services/httpService";
import SmartReCaptcha from "../../pages/captcha/SmartReCaptcha";
import { useLoader } from "../../contexts/LoaderContext";

const ReserveYourSeatPopupForm = ({ handleReserveSeatVisibility, popupProps, handleUserDetailsSubmissionStatus, courseName, demoDate }) => {

    const [defaultCountry, setDefaultCountry] = useState('IN');

    // const location = useLocation();
    const router = useRouter();
    const { id } = router.query;
    // Get query parameters from the location object
    const queryParams = new URLSearchParams(router.asPath.search);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userType, setUserType] = useState("Student");

    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        phone: "",
        userType: ""
    });

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
            try {
                const parsed = JSON.parse(userDetails);
                setFormData(prev => ({
                    ...prev,
                    fullName: parsed?.name || parsed?.fullName || "",
                    phone: parsed?.phone || "",
                    email: parsed?.email || "",
                    message: parsed?.message || "",
                    userType: parsed?.qualification || parsed?.hero_success_qualification || "",
                }));
            } catch (e) {
                // ignore parse errors
            }
        }
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        reason: "",
        userType: "Student",
        source: queryParams.get('source') ?? 'Own',
        page: 'blogs - Reserve Your Seat',
        pageId: id?.[0] ? id?.[0] : "",
        courseName: courseName,
        demoDate: demoDate
    });

    const [captchaToken, setCaptchaToken] = useState(null);
    const captchaRef = useRef();
    const [captchaKey, setCaptchaKey] = useState(0);
    const { setLoading } = useLoader();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(e);
        // Validation
        let errors = {};
        if (!name) errors.fullName = "Full name is required";
        if (!email) errors.email = "Email is required";
        if (!phone) errors.phone = "Phone number is required";
        if (phone && !errors.hasOwnProperty(phone) && (typeof phone !== "string" || !isValidPhoneNumber(phone))) errors.phone = "Phone number is invalid";
        if (!userType) errors.userType = "User type is required";
        if (!captchaToken) errors.captcha = "Captcha is required";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // Make the API request to store the data
            const formData = {
                name,
                email,
                phone,
                userType,
                // qualification,
                source: queryParams.get('source') ?? 'Own',
                page: 'blogs - Reserve Your Seat',
                pageId: id?.[0] ? id?.[0] : "",
                courseName: courseName,
                demoDate: demoDate
            };

            setLoading(true)
            const response = await httpService.post("/demo/register", { ...formData, token: captchaToken })
            setLoading(false)
            if (response.data) {
                setSuccess(true);
                captchaRef.current?.resetCaptcha(); // Reset after success
                setCaptchaToken('');
                setCaptchaKey(prev => prev + 1);
                setTimeout(() => { handleReserveSeatVisibility(); }, 3000)
                localStorage.setItem('userDetails', JSON.stringify(formData));
                handleUserDetailsSubmissionStatus(true);
            } else {
                setSuccess(false);
            }
        }
    };

    // Function to get the user's country code using IP address
    const getCountryCodeByIP = async () => {
        try {
            /*const response = await fetch('http://ipinfo.io/json?token=70c60e517172b4');
            const data = await response.json();*/
            const country = "IN";// data.country; // Country code, e.g., 'US'
            setDefaultCountry(country);
        } catch (error) {
            console.error("Error fetching country code:", error);
        }
    };

    // Fetch the country code when the component mounts

    useEffect(() => {
        getCountryCodeByIP();
    }, []);

    // Close the popup when clicking outside of it or pressing the Escape key
    useEffect(() => {
        const handleClickOutside = (event) => {
            const popup = document.querySelector('.demo_form-container.Register-form');
            if (popup && !popup.contains(event.target)) {
                setFormErrors({});
                handleReserveSeatVisibility();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setFormErrors({});
                // Close the popup when Escape key is pressed
                handleReserveSeatVisibility();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [handleReserveSeatVisibility]);

    return (
        <>
            <div className="overlay"></div>
            <div className="demo_form-container Register-form">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="Register-form-heading">{popupProps?.title}</h3>
                    <button className="border-0 demo-popup-close-btn" onClick={() => { setFormErrors(); handleReserveSeatVisibility() }}><i className="fa fa-times" aria-hidden="true"></i></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="text"
                            id="name"
                            className="input-field"
                            placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="name" className="input-label">Full Name<span className="required">*</span></label>
                        {formErrors.fullName && <small className="text-danger">{formErrors.fullName}</small>}
                    </div>

                    <div className="input-container">
                        <input
                            type="email"
                            id="email"
                            className="input-field"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email" className="input-label">Email<span className="required">*</span></label>
                        {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                    </div>

                    <div className="input-container">
                        <PhoneInput
                            international
                            id="phone"
                            className="input-field demo_register_phone"
                            defaultCountry={defaultCountry}
                            value={phone}
                            onChange={setPhone}
                            placeholder="Phone Number*"
                        />
                        <label htmlFor="phoneNumber" className="input-label">Phone Number<span className="required">*</span></label>
                        {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-check-label d-flex justify-content-around">
                            <div className="form-check-in">
                                <input
                                    type="radio"
                                    name="userType"
                                    className="input-checkbox"
                                    value="Student"
                                    checked={userType === "Student"}
                                    onChange={() => setUserType("Student")}
                                />
                                <span className="form-check-input">Student</span>
                            </div>
                            <div className="form-check-in">
                                <input
                                    type="radio"
                                    name="userType"
                                    className="input-checkbox"
                                    value="IT Professional"
                                    checked={userType === "IT Professional"}
                                    onChange={() => setUserType("IT Professional")}
                                />
                                <span className="form-check-input">IT Professional</span>
                            </div>
                            <div className="form-check-in">
                                <input
                                    type="radio"
                                    name="userType"
                                    className="input-checkbox"
                                    value="Domain Experience"
                                    checked={userType === "Domain Experience"}
                                    onChange={() => setUserType("Domain Experience")}
                                />
                                <span className="form-check-input">Domain Experience</span>
                            </div>
                        </label>
                    </div>
                    <div className="mb-3">
                        <SmartReCaptcha
                            ref={captchaRef}
                            siteKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
                            onTokenChange={(token) => setCaptchaToken(token)}
                            theme="light"
                            size="normal"
                        />
                        {formErrors.captcha && <small className="text-danger">{formErrors.captcha}</small>}
                    </div>


                    {!success && <div className="text-end">
                        <button type="submit" className="reg-btn">{popupProps?.buttonName}</button>
                    </div>}
                    {success && <div className="Main-Course-Registered-Message">
                        <img src="/images/courses/Main-Course-Form-S-Tick-Mark.svg" height="40" width="40"
                            alt="Tick-Mark-Icon" />
                        <div className="ms-3">
                            <p className="Main-Course-Registered-P">You're registered!!</p>
                            <p className="Main-Course-Registered-P">Our team will get back to you</p>
                        </div>
                    </div>}
                </form>
            </div>
        </>
    )
}

export default ReserveYourSeatPopupForm;