import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import httpService from "./../../services/httpService";
import { useLoader } from "../../contexts/LoaderContext";
import SmartReCaptcha from "../captcha/SmartReCaptcha";
import { isValidPhoneNumber } from "libphonenumber-js";

const Popupform = ({ handlePopupformVisibility }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userType, setUserType] = useState("Student");
    const [captchaToken, setCaptchaToken] = useState(null);
    const [captchaKey, setCaptchaKey] = useState(0);
    const captchaRef = useRef();
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const { setLoading } = useLoader();
    const router = useRouter();
    const { id } = router.query;
    const queryParams = new URLSearchParams(router.asPath.split("?")[1]);

    const validate = () => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);

        const errors = {};
        if (!fullName) errors.fullName = "Full name is required";
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = "Invalid email format";
        }
        if (!phone || !isValidPhoneNumber(phone)) errors.phone = "Valid phone number is required";
        if (!captchaToken) errors.captcha = "Captcha is required";

        setErrors(errors);
        //console.log(errors);
        if (Object.keys(errors).length > 0) {
            // alert(Object.values(errors).join("\n"));
            return;
        }

        if (!captchaToken) {
            alert('Please complete the CAPTCHA');
            return;
        }




        const formData = {
            fullName,
            email,
            phone,
            userType,
            source: queryParams.get("source") ?? "Own",
            page: "webinar",
            pageId: id
        };

        setLoading(true);
        const response = await httpService.post("/contactus/submitForm", {
            ...formData,
            token: captchaToken
        });

        setLoading(false);
        setSuccess(true);
        captchaRef.current?.resetCaptcha();
        setCaptchaToken("");
        setCaptchaKey(prev => prev + 1);

        if (response.data) {
            //console.log("Form submitted successfully:", formData);
            // handlePopupformVisibility();
        }
    };

    return (
        <>
            <div className="C-Webinar-Page-overlay"></div>
            <div className="C-Webinar-Page-form-container">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3>Registration Form</h3>
                    <button className="border-0 C-Webinar-Page-close-btn" onClick={handlePopupformVisibility}>
                        <i className="fa fa-times C-fa-times" aria-hidden="true"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="C-Webinar-Page-input-container">
                        <input
                            type="text"
                            id="full-name"
                            className={`C-Webinar-Page-input-field ${errors?.fullName && !fullName ? 'invalid' : ""}`}
                            placeholder=" "
                            value={fullName}
                            onChange={(e) => { setFullName(e.target.value) }}
                        />
                        <label htmlFor="full-name" className="C-Webinar-Page-input-label">
                            Full Name<span className="required">*</span>
                        </label>
                    </div>

                    <div className="C-Webinar-Page-input-container">
                        <input
                            type="email"
                            id="email"
                            className={`C-Webinar-Page-input-field ${errors?.email && !/^\S+@\S+\.\S+$/.test(email)  ? 'invalid' : ""}`}
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email" className="C-Webinar-Page-input-label">
                            Email<span className="required">*</span>
                        </label>
                    </div>

                    <div className="C-Webinar-Page-input-container">
                        <PhoneInput
                            id="ph-number"
                            international
                            defaultCountry="IN"
                            className={`C-Webinar-Page-input-field ${errors?.phone && !phone && !isValidPhoneNumber(phone) ? 'invalid' : ""}`}
                            placeholder=" "
                            value={phone}
                            onChange={setPhone}
                        />
                        <label htmlFor="ph-number" className="C-Webinar-Page-input-label">
                            Phone Number<span className="required">*</span>
                        </label>
                    </div>

                    <div className="mb-3">
                        <label className="d-flex justify-content-around">
                            <div className="C-Webinar-Page-form-check-in">
                                <input
                                    type="radio"
                                    name="userType"
                                    className="C-Webinar-Page-input-checkbox"
                                    checked={userType === "Student"}
                                    onChange={() => setUserType("Student")}
                                />
                                <span className="C-Webinar-Page-form-check-input">Student</span>
                            </div>
                            <div className="C-Webinar-Page-form-check-in">
                                <input
                                    type="radio"
                                    name="userType"
                                    className="C-Webinar-Page-input-checkbox"
                                    checked={userType === "IT Professional"}
                                    onChange={() => setUserType("IT Professional")}
                                />
                                <span className="C-Webinar-Page-form-check-input">IT Professional</span>
                            </div>
                            <div className="C-Webinar-Page-form-check-in">
                                <input
                                    type="radio"
                                    name="userType"
                                    className="C-Webinar-Page-input-checkbox"
                                    checked={userType === "Domain Experience"}
                                    onChange={() => setUserType("Domain Experience")}
                                />
                                <span className="C-Webinar-Page-form-check-input">Domain Experience</span>
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
                    </div>

                    {!success && <div className="text-end">
                        <button type="submit" className="btn btn-primary">
                            Register Now
                        </button>
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
    );
};

export default Popupform;
