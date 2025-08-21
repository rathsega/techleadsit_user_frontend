import React, { useState, useEffect, useCallback } from "react";
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), { ssr: false });
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import httpService from "../../services/httpService";
import { useRouter } from "next/router";
import { useLoader } from "../../contexts/LoaderContext";
import { useExpiringLocalStorage } from "../../services/useExpiringLocalStorage";

const HeroForm = ({ courseTitle }) => {

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
        setError(false);
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Submit form logic here
            setLoading(true);
            try {
                const response = await httpService.post("/contactus/submitHeroForm", formData);
                setSuccess(true);
                setError(false);
                setFormData({ fullName: "", email: "", phone: "" });
                setErrorMsg("Thank you for your submission!");
                router.push(`/thankyou?courseTitle=${courseTitle}&slug=${router.query.slug.join('_')}`);
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

    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
        "userDetails",
        null,
        endOfDay
    );

    useEffect(() => {
        //const userDetails = localStorage.getItem('userDetails');
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
        <><form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="Form-input-info-Container">
                <input
                    className="Form-input-info-fullname Form-Input-Common-Info"
                    type="text"
                    name="fullName"
                    placeholder=" "
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="fullName" className="Form-input-label">
                    Full Name<span className="required">*</span>
                </label>
                {submitted && errors.fullName && (
                    <div className="text-danger" style={{ fontSize: "13px" }}>{errors.fullName}</div>
                )}
            </div>
            <div className="Form-input-info-Container">
                <input
                    className="Form-input-info-email Form-Input-Common-Info"
                    type="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email" className="Form-input-label">
                    Email<span className="required">*</span>
                </label>
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
                    className="Form-input-info-country request_for_more_info_phone"
                    name="phone"
                    placeholder="Phone Number*"
                />
                {submitted && errors.phone && (
                    <div className="text-danger" style={{ fontSize: "13px" }}>{errors.phone}</div>
                )}
            </div>
            <button className="Form-input-info-submit" type="submit">
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </form>
            {success && <div className="mt-1 text-end">
                <img loading="lazy" src="/images/home/Main-Course-Home-Page-Get-Notified-About-Blogs-Tick-Icon.svg"
                    alt="Tick-Icon"
                    className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-tick-img" />
                <span className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-message">Registration successful!, Our team will get back to you.</span>
            </div>}
            {error && <div className="mt-1 text-end">
                <img loading="lazy" src="/images/home/Main-Course-Home-Page-Get-Notified-About-Blogs-invalid-Icon.svg"
                    alt="Invalid-Icon"
                    className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-invalid-img" />
                <span className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-message"> {errorMsg} </span>
            </div>}
        </>
    );
};

export default HeroForm;