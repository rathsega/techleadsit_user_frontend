import React, { useState, useEffect, useRef } from "react";
// import { useParams, useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import httpService from "./../../services/httpService";
import Image from "next/image";
import { useLoader } from "../../contexts/LoaderContext";
import SmartReCaptcha from "../captcha/SmartReCaptcha";
import { isValidPhoneNumber } from "libphonenumber-js";
import LiveChatButton from "../../components/LiveChatButton";

const RegisterForFreeDemoSession = ({ openForm }) => {

    const [userType, setUserType] = useState("Student");
    const [defaultCountry, setDefaultCountry] = useState("IN");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    const { id } = router.query;
    const queryParams = new URLSearchParams(router.asPath.search);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        qualification: "",
        reason: "",
        userType: userType,  // Initialize with state value
        source: queryParams.get("source") ?? "Own",
        page: "demo",
        pageId: id,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        //console.log(id, value);
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = true;
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = true;
        if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) newErrors.phone = true;
        if (!formData.qualification) newErrors.qualification = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (!captchaToken) {
            alert('Please complete the CAPTCHA');
            return;
        }

        setIsSubmitting(true);
        // Use the updated state inside the request
        const updatedFormData = {
            ...formData,
            phone: phoneNumber, // Ensure phone is set before sending
            token: captchaToken
        };

        try {
            const response = await httpService.post("/contactus/submitForm", updatedFormData);
            if (response.data) {
                localStorage.setItem("userDetails", JSON.stringify(formData));
                setSuccessMsg(true)
                // Reset after submission
                captchaRef.current?.resetCaptcha();
                setCaptchaToken('');
            } else {
                if (!response?.data) throw new Error("Failed to submit");
            }
        } catch (error) {
            console.error("Form submission failed:", error);
            if (error.response) {
                setErrorMsg(error.response.data.message);
            } else if (error.request) {
                // Request was made but no response received
                console.error("No response received:", error.request);
            }
        }
    };


    // Function to get the user's country code using IP address
    const getCountryCodeByIP = async () => {
        try {
            // const response = await fetch('http://ipinfo.io/json?token=70c60e517172b4');
            // const data = await response.json();
            const country = 'IN'; //data.country; // Country code, e.g., 'US'
            setDefaultCountry(country);
        } catch (error) {
            console.error("Error fetching country code:", error);
        }
    };

    // Fetch the country code when the component mounts

    useEffect(() => {
        getCountryCodeByIP();
    }, []);

    const handleBlur = () => {
        validateForm();
    };


    const [captchaToken, setCaptchaToken] = useState(null);
    const captchaRef = useRef();
    const [captchaKey, setCaptchaKey] = useState(0);
    const { setLoading } = useLoader();
    const [errorMsg, setErrorMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);

    return (
        <section className="Register-free-demo-section">
            <h1 className="Register-form-h">
                Register for Your Free Demo Session Now!
            </h1>
            <p className="Register-form-p">Secure your spot today and get an exclusive preview of the course. Don’t miss out on
                the opportunity to kickstart your learning journey!</p>
            <div className="Register-free-demo">
                <div className="Register-form">
                    <h3 className="Register-form-sub-h">Registration Form</h3>
                    <p className="Register-form-sub-p">"Don’t Miss This Opportunity to Learn from Industry Experts!"</p>
                    <form onSubmit={handleSubmit} >
                        <div className="input-container">
                            <input
                                type="text"
                                id="fullName"
                                className={` ${errors.fullName ? "input-field-error" : "input-field"}`}
                                placeholder=" "
                                value={formData.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <label htmlFor="fullName" className="input-label">Full Name<span className="required">*</span></label>
                        </div>

                        <div className="input-container">
                            <input
                                type="email"
                                id="email"
                                className={` ${errors.email ? "input-field-error" : "input-field"}`}
                                placeholder=" "
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <label htmlFor="email" className="input-label">Email<span className="required">*</span></label>
                        </div>

                        <div className="input-container">
                            <PhoneInput
                                international
                                id="phone"
                                className={` ${errors.phone ? "demo_register_phone input-field-error" : "demo_register_phone input-field"}`}
                                defaultCountry={defaultCountry}
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                                onBlur={handleBlur}
                            />
                            <label htmlFor="phoneNumber" className="input-label">Phone Number<span className="required">*</span></label>
                        </div>

                        <div className="input-container">
                            <select
                                id="qualification"
                                className={` ${errors.qualification ? "cd-rffds-select input-field-error" : "input-field"}`}
                                value={formData.qualification}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value=""></option>
                                <option value="Bachelors">Bachelors</option>
                                <option value="Masters">Masters</option>
                                <option value="PhD">PhD</option>
                            </select>
                            <label htmlFor="qualification" className="input-label">Select Qualification<span className="required">*</span></label>
                        </div>

                        <div className="input-container">
                            <textarea
                                id="reason"
                                className={` ${errors.message ? "input-field-error" : "input-field"}`}
                                rows="4"
                                value={formData.reason}
                                onChange={handleChange}
                            ></textarea>
                            <label htmlFor="reason" className="input-label">Reason for attending (optional)</label>
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

                        {(!successMsg && !errorMsg) && <div className="text-end">
                            <button type="submit" className="reg-btn">Register Now</button>
                        </div>}
                        {successMsg && <div className="blog-ov-request-message">
                            <img src="/images/blog-ov-Req-m-info-tick-img.svg" height="40" width="40" />
                            <div className="ms-2">
                                <p className="blog-ov-request-p">We’ve got your Query!!</p>
                                <p className="blog-ov-request-sub-p">Our team will get back to you</p>
                            </div>
                        </div>}
                    </form>

                </div>
                <div className="Want-to-know-more">
                    <h3 className="Want-to-know-h">Want to Know More? We are Here to Help You</h3>
                    <p className="Register-form-sub-p">"Need more details about the free demo session? Chat with us live or
                        request a callback at your convenience."</p>
                    <Image src='/images/demo/contact us pic.jpg' alt="Contact us image" className="img-fluid" />
                    <div className="mt-3">
                        <LiveChatButton className="reg-ws-btn"
                            iconSrc="/images/courses/Whatsapp-Icon.svg"
                            iconAlt="Live chat image"
                            iconWidth={19}
                            iconHeight={19}></LiveChatButton>
                        <button className="reg-cb-btn demo_register-btn" onClick={() => {
                            openForm("Request a call back");
                        }}><Image src='/images/demo/Right-plan-call.png' className="me-2 h-17" alt="Phone call image"
                            height="19" />Request a
                            Call Back</button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default RegisterForFreeDemoSession;