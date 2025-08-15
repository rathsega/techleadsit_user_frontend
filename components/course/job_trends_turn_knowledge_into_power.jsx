import React, { useState, useEffect, useCallback } from "react";
const PhoneInput = React.lazy(() => import("react-phone-number-input"));
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import httpService from "../../services/httpService";
import { useRouter } from "next/router";
import { useLoader } from "../../contexts/LoaderContext";
import Image from "next/image"; // Importing Image component from next.js for optimized image handling

const TurnKnowledgeIntoPower = React.memo(({ data, courseTitle }) => {
    const router = useRouter();
    const queryParams = new URLSearchParams(router.asPath?.split('?')[1]);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        page: "course - " + courseTitle,
        source: queryParams.get("source") ?? "Own"
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("Please Enter Valid Details");
    const { setLoading } = useLoader();

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full Name is required";
        } else if (!/^[A-Za-z ]+$/.test(formData.fullName.trim())) {
            newErrors.fullName = "Full Name should contain only letters and spaces";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email.trim())
        ) {
            newErrors.email = "Invalid email address";
        }
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!isValidPhoneNumber(formData.phone)) {
            newErrors.phone = "Invalid phone number";
        }
        return newErrors;
    };

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }, []);

    const handlePhoneChange = useCallback((value) => {
        setFormData((prev) => ({
            ...prev,
            phone: value,
        }));
        setErrors((prev) => ({ ...prev, phone: undefined }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setSuccess(false);
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            try {
                const response = await httpService.post("/contactus/submitHeroForm", formData);
                setSuccess(true);
                setError(false);
                setFormData({ fullName: "", email: "", phone: "" });
                setErrorMsg("Thank you for your submission!");
            } catch (err) {
                setSuccess(false);
                setError(true);
                setErrorMsg(err?.response?.data?.message || "An error occurred while submitting the form.");
            } finally {
                setLoading(false);
            }
            // Reset form data after submission
            setSubmitted(false);
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
                    phone: parsed?.phone || "",
                    email: parsed?.email || "",
                }));
            } catch (e) {
                // ignore parse errors
            }
        }
    }, []);

    return (
        <section className="Main-Course-CTA-banner6">
            <div className="Main-Course-CTA-banner-content6">
                <h2 className="Main-Course-CTA-banner-h6">
                    {data?.title}
                </h2>
                <p className="Main-Course-CTA-banner-p6">
                    {data?.shortDescription}
                </p>
                <form className="contact-form Contact-Form-Banner-6" onSubmit={handleSubmit} noValidate>
                    <div className="Form-input-info-Container">
                        <input
                            className="Form-input-info-fullname Form-input-info-fullname-banner-6 Form-Input-Common-Info"
                            type="text"
                            name="fullName"
                            placeholder=" "
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="fullName" className="Form-input-label">Full Name<span className="required">*</span></label>
                        {submitted && errors.fullName && (
                            <div className="text-danger" style={{ fontSize: "13px" }}>{errors.fullName}</div>
                        )}
                    </div>
                    <div className="Form-input-info-Container">
                        <input
                            className="Form-input-info-email Form-input-info-email-banner-6 Form-Input-Common-Info"
                            type="email"
                            name="email"
                            placeholder=" "
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email" className="Form-input-label">Email<span className="required">*</span></label>
                        {submitted && errors.email && (
                            <div className="text-danger" style={{ fontSize: "13px" }}>{errors.email}</div>
                        )}
                    </div>
                    <div className="Form-input-info-Container">
                        <PhoneInput
                            international
                            defaultCountry="IN"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            className="Form-input-info-country Form-input-info-country-banner-6 demo_register_phone"
                            name="phone"
                            placeholder="Phone Number*"
                        />
                        {submitted && errors.phone && (
                            <div className="text-danger" style={{ fontSize: "13px" }}>{errors.phone}</div>
                        )}
                    </div>
                    <button className="Main-Course-CTA-button6" type="submit">
                        <div className="Main-Course-CTA-button-dots_border6"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            className="Main-Course-CTA-button-sparkle6">
                            <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                fill="black"
                                d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z">
                            </path>
                            <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                fill="black"
                                d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z">
                            </path>
                            <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                fill="black"
                                d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z">
                            </path>
                        </svg>
                        <span className="Main-Course-CTA-button-text_button6">Enroll Now!!</span>
                    </button>
                </form>
                {success && <div className="mt-1 text-center">
                    <img loading="lazy" src="/images/home/Main-Course-Home-Page-Get-Notified-About-Blogs-Tick-Icon.svg"
                        alt="Tick-Icon"
                        className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-tick-img" />
                    <span className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-message">Thank
                        Registration successful!, Our team will get back to you. </span>
                </div>}
                {error && <div className="mt-1 text-center">
                    <img loading="lazy" src="/images/home/Main-Course-Home-Page-Get-Notified-About-Blogs-invalid-Icon.svg"
                        alt="Invalid-Icon"
                        className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-invalid-img" />
                    <span className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-message"> {errorMsg} </span>
                </div>}
            </div>
            <div className="Main-Course-CTA-img-section6">
                <img loading="lazy" src="/images/courses/Main-Course-CTA-Banner-6.webp"
                    alt="Main-Course-CTA-banner-img" className="img-fluid" width="345" height="480"
                    style={{ "color": "transparent", "maxWidth": "100%", "width": "auto", "height": "auto" }} />
            </div>
        </section>
    );
});

export default TurnKnowledgeIntoPower;