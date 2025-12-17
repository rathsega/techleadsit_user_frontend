import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), { ssr: false });
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import httpService from "./../../services/httpService";
import SmartReCaptcha from "../captcha/SmartReCaptcha";
import { useExpiringLocalStorage } from "../../services/useExpiringLocalStorage";

const PopupForm = ({ handlePopupformVisibility, popupProps, handleUserDetailsSubmissionStatus }) => {

    const [defaultCountry, setDefaultCountry] = useState('IN');

    // const location = useLocation();
    const router = useRouter();
    const { id } = router.query;
    // Get query parameters from the location object
    const queryParams = new URLSearchParams(router.asPath.search);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [qualification, setQualification] = useState("");
    const [userType, setUserType] = useState("Student");
    const [captchaToken, setCaptchaToken] = useState(null);
    const captchaRef = useRef();

    const [formErrors, setFormErrors] = useState({
        fullName: "",
        email: "",
        phone: "",
        userType: ""
    });

    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
        "userDetails",
        null,
        endOfDay
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation
        let errors = {};
        if (!fullName) errors.fullName = "Full name is required";
        if (!email) errors.email = "Email is required";
        if (!phone) errors.phone = "Phone number is required";
        if (phone && !errors.hasOwnProperty(phone) && (typeof phone !== "string" || !isValidPhoneNumber(phone))) errors.phone = "Phone number is invalid";
        if (!userType) errors.userType = "User type is required";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {


            if (!captchaToken) {
                alert('Please complete the CAPTCHA');
                return;
            }
            // Make the API request to store the data
            const formData = {
                fullName,
                email,
                phone,
                userType,
                // qualification,
                source: queryParams.get('source') ?? 'Own',
                page: 'blogs',
                pageId: id?.[0] ? id?.[0] : "",
                token: captchaToken
            };

            const response = await httpService.post("/contactus/submitForm", formData)
            if (response.data) {
                //console.log("Form submitted successfully:", formData);
                handlePopupformVisibility();
                //localStorage.setItem('userDetails', JSON.stringify(formData));
                setUserDetails(formData);
                handleUserDetailsSubmissionStatus(true);
                // Reset after submission
                captchaRef.current?.resetCaptcha();
                setCaptchaToken('');
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
            const popup = document.querySelector('.demo_form-container');
            if (popup && !popup.contains(event.target)) {
                handlePopupformVisibility();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                handlePopupformVisibility();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [handlePopupformVisibility]);

    return (
        <>
            <div className="overlay"></div>
            <div className="demo_form-container Register-form">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="Register-form-heading">{popupProps?.title}</h3>
                    <button className="border-0 demo-popup-close-btn" onClick={handlePopupformVisibility}><i className="fa fa-times" aria-hidden="true"></i></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="text"
                            id="fullName"
                            className={`input-field ${formErrors.fullName ? "input-field-error" : ""}`}
                            placeholder=" "
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <label htmlFor="fullName" className="input-label">Full Name<span className="required">*</span></label>
                    </div>

                    <div className="input-container">
                        <input
                            type="email"
                            id="email"
                            className={`input-field ${formErrors.email ? "input-field-error" : ""}`}
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email" className="input-label">Email<span className="required">*</span></label>
                    </div>

                    <div className="input-container">
                        <PhoneInput
                            international
                            id="phone"
                            className={`input-field demo_register_phone ${formErrors.phone ? "input-field-error" : ""}`}
                            defaultCountry={defaultCountry}
                            value={phone}
                            onChange={setPhone}
                            placeholder="Phone Number*"
                        />
                        <label htmlFor="phoneNumber" className="input-label">Phone Number<span className="required">*</span></label>
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

                    <div className="input-container">
                        <SmartReCaptcha
                            ref={captchaRef}
                            siteKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
                            onTokenChange={(token) => setCaptchaToken(token)}
                            theme="light"
                            size="normal"
                        />
                    </div>
                    <div className="text-end">
                        <button type="submit" className="reg-btn">{popupProps?.buttonName}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default PopupForm;