import React, { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), { ssr: false });
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import httpService from "../../services/httpService";
import { useLoader } from "../../contexts/LoaderContext";
import { useRouter } from 'next/router';

const Forgotpassword = () => {
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const [defaultCountry, setDefaultCountry] = useState("IN");
    const [inputValue, setInputValue] = useState('');
    const [isPhone, setIsPhone] = useState(false);
    const [errors, setErrors] = useState({
        accountNotFound: false,
        invalidEmail: false,
        invalidPhone: false,
    });

    const [isLoading, setIsLoading] = useState(false); // To track the loading state
    const [errorMessage, setErrorMessage] = useState(''); // To store error message for user feedback
    const [successMessage, setSuccessMessage] = useState(''); // To store success message
    const [requestCompleted, setRequestCompleted] = useState(false);
    const { setLoading } = useLoader();
    const router = useRouter();

    /*useEffect(() => {
        if (isPhone) {
            phoneRef?.current?.focus();
        } else {
            emailRef?.current?.focus();
        }
    }, [isPhone])*/

    const handleChange = (value) => {
        // Detect if input should be phone or text
        /*if (value) {
            if (/^\+?[0-9\s]*$/.test(value)) {
                setIsPhone(true);
            } else {
                setIsPhone(false);
            }
        } else {
            setIsPhone(false);
        }*/

        setInputValue(value);

        // Clear errors when typing
        setErrors({
            accountNotFound: false,
            invalidEmail: false,
            invalidPhone: false,
        });
    };

    const validate = () => {
        let valid = true;
        const newErrors = {
            accountNotFound: false,
            invalidEmail: false,
            invalidPhone: false,
        };

        if (!inputValue?.trim()) {
            valid = false;
            newErrors.invalidEmail = true;
        } else if (isPhone) {
            // basic phone validation (length > 6)
            if (!inputValue || !isValidPhoneNumber(inputValue)) {
                valid = false;
                newErrors.invalidPhone = true;
            }
        } else {
            // basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(inputValue)) {
                valid = false;
                newErrors.invalidEmail = true;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return; // If validation fails, don't proceed
        }

        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        let response;
        try {
            setLoading(true)
            if (isPhone) {
                response = await httpService.post('auth/getOtp', { phone: inputValue });
            } else {
                response = await httpService.post('auth/getResetLink', { email: inputValue });
            }


            if (response && response.status === 200) {
                if (!isPhone) {
                    setRequestCompleted(true);
                } else {
                    router.replace('/enter-otp/' + inputValue);
                }
                setLoading(false)
                setSuccessMessage('Request successful. Please check your email or phone for further instructions.');
            } else {
                setLoading(false)
                setErrorMessage('Something went wrong. Please try again later.');
            }
        } catch (error) {
            setLoading(false)
            if (error.response && error.response.data) {
                // Specific error message from server
                setErrorMessage(error.response.data.message || 'Something went wrong. Please try again later.');
            } else {
                // Generic network error
                setErrorMessage('Network error. Please check your connection and try again.');
            }
        } finally {
            setIsLoading(false); // Stop loading after request completes
        }
    };

    return (
        <>
            {!requestCompleted && <section className="Main-Course-User-Authentication-Screens-Section">
                <div className="Main-Course-User-Authentication-Screens-Forgot-Password-Section-Container position-relative">
                    <button className="border-0 Main-Course-Close-Btn" style={{ position: "absolute", right: "27px", top: "27px" }} onClick={() => router.back()}>
                        <i className="fa fa-times Main-Course-Fa-Times Universal-Cross-Mark" aria-hidden="true"></i>
                    </button>
                    <div className="Main-Course-User-Authentication-Forgot-Password-left-side">
                        <div className="Main-Course-User-Authentication-Forgot-Password-slider">
                            <img src="/images/auth/Main-Course-Reset-Password-img.svg" className="Main-Course-Reset-Password-img" />
                        </div>
                        <img src="/images/auth/Main-Course-TechLeads-Logo.svg" className="Main-Course-TechLeads-Logo" alt="TechLeads Logo" />
                    </div>
                    <div className="Main-Course-User-Authentication-Forgot-Password-right-side">
                        <h1 className="Main-Course-UA-FP-Main-heading">Forgot Password</h1>
                        <p className="Main-Course-UA-FP-Main-Para">No stress! Enter your email to reset your password.</p>
                        <form id="Forgot-Password-form" className="Main-Course-User-Authentication-Forgot-Password-form" onSubmit={handleSubmit}>
                            <div className="Main-Course-User-Authentication-Forgot-Password-form-group">
                                <label htmlFor="email">E-mail</label>

                                {!isPhone ? (
                                    <input
                                        id="email"
                                        type="text"
                                        placeholder="Enter your email"
                                        ref={emailRef}
                                        value={inputValue}
                                        onChange={(e) => handleChange(e.target.value)}
                                        className={Object.values(errors).some(err => err) ? 'Main-Course-User-Authentication-Form-FB' : ''}
                                    />
                                ) : (
                                    <PhoneInput
                                        defaultCountry="IN"
                                        ref={phoneRef}
                                        international
                                        countryCallingCodeEditable={false}
                                        onChange={handleChange}
                                        inputclassName={Object.values(errors).some(err => err) ? 'Main-Course-User-Authentication-Form-FB' : ''}
                                        inputProps={{
                                            name: 'phone',
                                            required: true,
                                        }}
                                    />
                                )}
                            </div>

                            {/* Error Messages */}
                            {errors.accountNotFound && (
                                <div className="Main-Course-User-Authentication-Message-Container">
                                    <img src="/images/auth/Error_Icon.svg" className="Main-Course-User-Authentication-Forgot-Password-error-icon" alt="Error-Icon" />
                                    <p className="Main-Course-User-Authentication-Forgot-Password-error-Message">
                                        Could not find your account. Check your email and try again
                                    </p>
                                </div>
                            )}
                            {errors.invalidEmail && (
                                <div className="Main-Course-User-Authentication-Message-Container">
                                    <img src="/images/auth/Error_Icon.svg" className="Main-Course-User-Authentication-Forgot-Password-error-icon" alt="Error-Icon" />
                                    <p className="Main-Course-User-Authentication-Forgot-Password-error-Message">
                                        Please enter a valid email
                                    </p>
                                </div>
                            )}
                            {errors.invalidPhone && (
                                <div className="Main-Course-User-Authentication-Message-Container">
                                    <img src="/images/auth/Error_Icon.svg" className="Main-Course-User-Authentication-Forgot-Password-error-icon" alt="Error-Icon" />
                                    <p className="Main-Course-User-Authentication-Forgot-Password-error-Message">
                                        Please enter a valid Phone number
                                    </p>
                                </div>
                            )}

                            {errorMessage && (
                                <div className="Main-Course-User-Authentication-Message-Container">
                                    <img src="/images/auth/Error_Icon.svg" className="Main-Course-User-Authentication-Forgot-Password-error-icon" alt="Error-Icon" />
                                    <p className="Main-Course-User-Authentication-Forgot-Password-error-Message">
                                        {errorMessage}
                                    </p>
                                </div>
                            )}

                            {!isPhone ? <button type="submit" className="Main-Course-User-Authentication-Forgot-Password-Button">
                                Request link
                            </button> :
                                <button type="submit" className="Main-Course-User-Authentication-Forgot-Password-Button">
                                    Get OTP
                                </button>}
                        </form>
                    </div>
                </div>
            </section>}

            {
                requestCompleted && successMessage && !isPhone && <section className="Main-Course-User-Authentication-Screens-Section">
                    <div className="Main-Course-User-Authentication-Screens-Check-Your-Email-Section-Container">
                        <div className="Main-Course-User-Authentication-Check-Your-Email-left-side">
                            <div className="Main-Course-User-Authentication-Check-Your-Email-slider">
                                <img src="/images/auth/Main-Course-Reset-Password-img.svg" className="Main-Course-Reset-Password-img" />
                            </div>
                            <img src="/images/auth/Main-Course-TechLeads-Logo.svg" className="Main-Course-TechLeads-Logo" alt="TechLeads Logo" />
                        </div>
                        <div className="Main-Course-User-Authentication-Check-Your-Email-right-side">
                            <img src="/images/auth/Main-Course-Check-Your-Email-Img.svg" alt="Check Your Email" height="54" width="54" />
                            <h2 className="Main-Course-UA-CYE-Main-heading">Check Your Email</h2>
                            <p className="Main-Course-UA-CYE-Main-Para">Secure your account with a fresh password</p>
                            <p className="Main-Course-UA-CYE-Sub-Para">Please check the email address {inputValue} for instructions to reset your password</p>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default Forgotpassword;