import React, { useState, useRef } from "react";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import httpService from "../../services/httpService";
import classNames from "classnames";
import { isValidPhoneNumber } from "libphonenumber-js";
import SmartReCaptcha from "../captcha/SmartReCaptcha";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import GoogleSignIn from '../common/GoogleSignIn';
import { useLoader } from "../../contexts/LoaderContext";

const Signup = () => {

    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [captchaToken, setCaptchaToken] = useState(null);
    const captchaRef = useRef();
    const [captchaKey, setCaptchaKey] = useState(0);
    const { setLoading } = useLoader();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
            newErrors.name = "Name can only contain letters and spaces";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email) && !formData.email.match(/^\+?\d{10,}$/)) {
            newErrors.email = "Please enter a valid email or phone number";
        }

        if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (!formData.password.match(passwordRegex)) {
            newErrors.password = "Password must have uppercase, lowercase, number, special character and min 8 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: "" }));
    };

    const handlePhoneChange = (value) => {
        setFormData(prev => ({ ...prev, phone: value }));
        setErrors(prev => ({ ...prev, phone: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            if (!captchaToken) {
                alert('Please complete the CAPTCHA');
                return;
            }

            try {
                setLoading(true)
                const response = await httpService.post('/auth/signup', {
                    ...formData,
                    token: captchaToken
                });

                if (!response?.data) throw new Error("Failed to submit");

                setSuccessMessage(true);
                setSuccessMessage(response?.data?.message);
                setLoading(false)
                captchaRef.current?.resetCaptcha(); // Reset after success
                setCaptchaToken('');
                setCaptchaKey(prev => prev + 1);
                setTimeout(() => { navigateToSignin() }, 2000)

            } catch (error) {
                setLoading(false)
                const customMsg = error.customMessage || error.response?.data?.message || "Something went wrong";
                //console.log(customMsg);
                setCaptchaKey(prev => prev + 1);

                if (error.response) {
                    const { status, data } = error.response;

                    // If specifically CAPTCHA failed
                    if (status === 400 && data?.message === 'CAPTCHA failed') {
                        captchaRef.current?.resetCaptcha(); // Reset CAPTCHA
                        setCaptchaToken('');
                    }

                    setErrors(prev => ({ ...prev, token: customMsg }));

                } else if (error.request) {
                    console.error("No response received:", error.request);
                    setErrors(prev => ({ ...prev, token: "No response from server." }));
                } else {
                    setErrors(prev => ({ ...prev, token: customMsg }));
                }
                //console.log(errors);
            }
        } else {
            setSuccessMessage("");
        }
    };


    const navigateToSignin = () => {
        router.replace('/signin');
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <section className="Main-Course-User-Authentication-Screens-Section">
                <div className="Main-Course-User-Authentication-Screens-Section-Container position-relative">
                    <button className="border-0 Main-Course-Close-Btn" style={{ position: "absolute", right: "27px", top: "27px" }} onClick={() => router.back()}>
                        <i className="fa fa-times Main-Course-Fa-Times Universal-Cross-Mark" aria-hidden="true"></i>
                    </button>
                    <div className="Main-Course-User-Authentication-Signup-left-side">
                        <div className="Main-Course-User-Authentication-Signup-slider">
                            <img src="/images/auth/Main-Course-SignUI-Rotating-Img-1.svg" className="Main-Course-User-Authentication-Signup-slide-img" />
                            <img src="/images/auth/Main-Course-SignUI-Rotating-Img-2.svg" className="Main-Course-User-Authentication-Signup-slide-img" />
                            <img src="/images/auth/Main-Course-SignUI-Rotating-Img-3.svg" className="Main-Course-User-Authentication-Signup-slide-img" />
                            <img src="/images/auth/Main-Course-SignUI-Rotating-Img-4.svg" className="Main-Course-User-Authentication-Signup-slide-img" />
                        </div>
                        <img src="/images/auth/Main-Course-TechLeads-Logo.svg" className="Main-Course-TechLeads-Logo" alt="TechLeads Logo" />
                    </div>
                    <div className="Main-Course-User-Authentication-Signup-right-side">
                        <h1 className="Main-Course-UA-Main-heading">Sign Up</h1>
                        <p className="Main-Course-UA-Main-Para">Enter your details to empower yourself with knowledge</p>
                        <form id="signup-form" className="Main-Course-User-Authentication-Signup-form" onSubmit={handleSubmit}>
                            <div className="Main-Course-User-Authentication-Signup-form-group">
                                <label htmlFor="name">Your name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={classNames({ "Main-Course-User-Authentication-Form-FB": errors.name })}
                                />
                            </div>

                            <div className="Main-Course-User-Authentication-Signup-form-group">
                                <label htmlFor="email">E‑mail</label>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="Enter your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={classNames({
                                        "Main-Course-User-Authentication-Form-FB": errors.email
                                    })}
                                />
                            </div>

                            <div className="Main-Course-User-Authentication-Signup-form-group">
                                <label>Phone Number</label>
                                <PhoneInput
                                    defaultCountry="IN"
                                    international
                                    countryCallingCodeEditable={false}
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    className={classNames("PhoneInput", {
                                        "Main-Course-User-Authentication-Form-FB": errors.phone
                                    })}
                                />
                            </div>


                            <div className="Main-Course-User-Authentication-Signup-form-row">
                                <div className="Main-Course-User-Authentication-Signup-form-group" style={{ flex: 1 }}>
                                    <label htmlFor="password">Password</label>
                                    <div className="Main-Course-User-Authentication-Signup-password-wrapper">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={classNames({
                                                "Main-Course-User-Authentication-Form-FB": errors.password
                                            })}
                                        />
                                        <span
                                            className="Main-Course-User-Authentication-Signup-toggle-eye"
                                            onClick={() => setShowPassword(prev => !prev)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <img src={showPassword ? "/images/auth/Hide-Password.svg" : "/images/auth/Show-Password.svg"} alt="toggle" />
                                        </span>
                                    </div>
                                </div>

                                <div className="Main-Course-User-Authentication-Signup-form-group" style={{ flex: 1 }}>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="Main-Course-User-Authentication-Signup-password-wrapper">
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Enter your password again"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={classNames({
                                                "Main-Course-User-Authentication-Form-FB": errors.confirmPassword
                                            })}
                                        />
                                        <span
                                            className="Main-Course-User-Authentication-Signup-toggle-eye"
                                            onClick={() => setShowConfirmPassword(prev => !prev)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <img src={showConfirmPassword ? "/images/auth/Hide-Password.svg" : "/images/auth/Show-Password.svg"} alt="toggle" />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center">
                                <SmartReCaptcha
                                    ref={captchaRef}
                                    siteKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
                                    onTokenChange={(token) => setCaptchaToken(token)}
                                    theme="light"
                                    size="normal"
                                    key={captchaKey}
                                />
                            </div>


                            {/* Display Errors */}

                            {Object.values(errors).map((msg, idx) => (
                                msg ? (
                                    <div key={idx} className="Main-Course-User-Authentication-Message-Container mt-3">
                                        <img src="/images/auth/Error_Icon.svg" className="Main-Course-User-Authentication-Signup-error-icon" alt="Error-Icon" />
                                        <p className="Main-Course-User-Authentication-Signup-error-Message">{msg}</p>
                                    </div>
                                ) : null
                            ))}

                            {/* Success Message */}
                            {successMessage && (
                                <div className="Main-Course-User-Authentication-Message-Container mt-3">
                                    <img src="/images/auth/Success_Icon.svg" className="Main-Course-User-Authentication-Signup-success-icon" alt="Success-Icon" />
                                    <p className="Main-Course-User-Authentication-Signup-Success-Message">{successMessage}</p>
                                </div>
                            )}

                            <button type="submit" className="Main-Course-User-Authentication-Signup-Button">Sign up</button>
                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            {/* <button className="Main-Course-User-Authentication-Signup-Google-Button">
                                <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google logo" />
                                Sign up with Google
                            </button> */}
                            {/* <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => handlGoogleSigninSuccess(credentialResponse)}
                                    onError={() => {
                                        //console.log("Login Failed");
                                    }}
                                />
                            </GoogleOAuthProvider> */}
                            <GoogleSignIn />
                        </div>
                        <div className="Main-Course-User-Authentication-Signup-signin-link">
                            Already have an account? <a href="#" onClick={navigateToSignin}>Sign in</a>
                        </div>
                    </div>
                </div>
            </section>
        </>)
}

export default Signup;