import { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import httpService from "../../../services/httpService";
import { isValidPhoneNumber } from "libphonenumber-js";
import SmartReCaptcha from "../../captcha/SmartReCaptcha";

const RequestForMoreInfo = ({ currentBlogId }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        message: "",
    });
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});
    const [buttonText, setButtonText] = useState("Submit");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const captchaRef = useRef();

    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = true;
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = true;
        if (!phone || !isValidPhoneNumber(phone)) newErrors.phone = true;
        if (!formData.message.trim()) newErrors.message = true;

        setErrors(newErrors);
        //console.log(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // Remove error className dynamically when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: undefined });
        }
    };

    const handlePhoneChange = (value) => {
        setPhone(value);
        if (errors.phone) setErrors({ ...errors, phone: undefined });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (!captchaToken) {
            alert('Please complete the CAPTCHA');
            return;
        }

        setIsSubmitting(true);
        setButtonText("Submitting...");

        try {
            const response = await httpService.post("/blogs/requestMoreInfo/" + currentBlogId, { ...formData, phone, token: captchaToken });
            localStorage.setItem("userDetails", JSON.stringify(formData));
            if (!response?.data) throw new Error("Failed to submit");
            setSuccessMsg(true)
            // Reset after submission
            captchaRef.current?.resetCaptcha();
            setCaptchaToken('');
        } catch (error) {
            if (error.response) {
                setErrorMsg(error.response.data.message);
            } else if (error.request) {
                // Request was made but no response received
                console.error("No response received:", error.request);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
            try {
                const parsed = JSON.parse(userDetails);
                setFormData(prev => ({
                    ...prev,
                    fullName: parsed?.name || parsed?.fullName || "",
                    email: parsed?.email || "",
                    message: parsed?.message || "",
                }));
                setPhone(parsed?.phone || "");
            } catch (e) {
                // ignore parse errors
            }
        }
    }, []);

    return (
        <form className="Request-form" onSubmit={handleSubmit}>
            <h1 className="promotional-h">Request More Info</h1>
            <p className="promotional-p">We're here to help! Get expert guidance for your Oracle Fusion journey.</p>

            <div className="Request-input-container">
                <input
                    type="text"
                    name="fullName"
                    className={` ${errors.fullName ? "input-field-error" : "Request-input-field"}`}
                    placeholder=" "
                    value={formData.fullName}
                    onChange={handleInputChange}
                />
                <label className="Request-input-label">Full Name<span className="required">*</span></label>
            </div>

            <div className="Request-input-container">
                <input
                    type="email"
                    name="email"
                    className={` ${errors.email ? "input-field-error" : "Request-input-field"}`}
                    placeholder=" "
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <label className="Request-input-label">Email<span className="required">*</span></label>
            </div>

            <div className="Request-input-container">
                <PhoneInput
                    international
                    defaultCountry="IN"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={errors.phone ? "request_for_more_info_phone input-field-error" : "Request-input-field request_for_more_info_phone"}
                    placeholder="Phone Number*"
                />
            </div>

            <div className="Request-input-container">
                <textarea
                    name="message"
                    className={` ${errors.message ? "input-field-error" : "Request-input-field"}`}
                    value={formData.message}
                    onChange={handleInputChange}
                />
                <label className="Request-input-label Request-input-label-query">
                    Enter your query here<span className="required">*</span>
                </label>
            </div>
            <div className="Request-input-container">
                <SmartReCaptcha
                    ref={captchaRef}
                    siteKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
                    onTokenChange={(token) => setCaptchaToken(token)}
                    theme="dark"
                    size="normal"
                />
            </div>

            {(!successMsg && !errorMsg) && <div className="text-end">
                <button className="req-reg-btn" disabled={isSubmitting}>
                    Submit
                </button>
            </div>}
            {successMsg && <div className="blog-ov-request-message">
                <img src="/images/blog-ov-Req-m-info-tick-img.svg" height="40" width="40" />
                <div className="ms-2">
                    <p className="blog-ov-request-p">We’ve got your Query!!</p>
                    <p className="blog-ov-request-sub-p">Our team will get back to you</p>
                </div>
            </div>}
        </form>
    );
};

export default RequestForMoreInfo;
