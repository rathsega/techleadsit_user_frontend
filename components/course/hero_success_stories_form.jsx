import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), { ssr: false });
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import httpService from "../../services/httpService";
import { useRouter } from "next/router";
import { useLoader } from "../../contexts/LoaderContext";

const HeroSuccessStoriesForm = ({ courseTitle }) => {
    const router = useRouter();
    const queryParams = new URLSearchParams(router.asPath?.split('?')[1]);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: "",
        hero_success_qualification: "",
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
            newErrors.phone = "Mobile number is required";
        } else if (!isValidPhoneNumber(formData.phone)) {
            newErrors.phone = "Invalid mobile number";
        }
        if (!formData.hero_success_qualification) {
            newErrors.hero_success_qualification = "Please select your qualification";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { id, value, type, name } = e.target;
        console.log("HeroSuccessStoriesForm: handleChange", { id, value, type, name });
        if (type === "radio") {
            setFormData((prev) => ({
                ...prev,
                hero_success_qualification: value,
            }));
            setErrors((prev) => ({ ...prev, hero_success_qualification: undefined }));
            return;
        } else {
            // For text inputs, use id or name to update formData
            if (!id && !name) {
                console.error("HeroSuccessStoriesForm: handleChange - No id or name provided");
                return;
            }
            if (type === "textarea") {
                setFormData((prev) => ({
                    ...prev,
                    [id || name]: value,
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    [id || name]: value,
                }));
            }
        }

        setFormData((prev) => ({
            ...prev,
            [id || name]: value,
        }));
        setErrors((prev) => ({ ...prev, [id || name]: undefined }));
    };

    const handlePhoneChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            phone: value,
        }));
        setErrors((prev) => ({ ...prev, phone: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setSuccess(false);
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Simulate API call
            setLoading(true);
            try {
                const response = await httpService.post("/contactus/submitHeroForm", {...formData, qualification: formData.hero_success_qualification});
                setSuccess(true);
                setError(false);
                //setFormData({ fullName: "", email: "", phone: "" });
                localStorage.setItem("userDetails", JSON.stringify(formData));
                setErrorMsg("Thank you for your submission!");
                router.push(`/thankyou?courseTitle=${courseTitle}&slug=${router.query.slug.join('_')}`);
            } catch (err) {
                setSuccess(false);
                setError(true);
                setErrorMsg(err?.response?.data?.message || "An error occurred while submitting the form.");
            } finally {
                //setLoading(false);
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
                    message: parsed?.message || "",
                    hero_success_qualification: parsed?.qualification || "",
                }));
            } catch (e) {
                // ignore parse errors
            }
        }
    }, []);

    return (
        <div className="Hero-Form-D-fl-J-Cen">
            <div class="glow-border-wrapper">
            <div className="Alternative-HeroBanner-Form-container">
                <h2>
                    Register for <span className="Alternative-HeroBanner-Form-highlight">Free Demo</span> Session
                </h2>
                <form className="Alternative-HeroBanner-Form-form" onSubmit={handleSubmit} noValidate>
                    <label htmlFor="name">
                        Name<span className="Alternative-HeroBanner-Form-required">*</span>
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    {submitted && errors.fullName && (
                        <div className="text-danger" style={{ fontSize: "13px" }}>{errors.fullName}</div>
                    )}

                    <label htmlFor="email">
                        Email<span className="Alternative-HeroBanner-Form-required">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Email ID"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {submitted && errors.email && (
                        <div className="text-danger" style={{ fontSize: "13px" }}>{errors.email}</div>
                    )}

                    <label htmlFor="phone">
                        Mobile Number<span className="Alternative-HeroBanner-Form-required">*</span>
                    </label>
                    <div className="Alternative-HeroBanner-Form-phone">
                        <PhoneInput
                            international
                            defaultCountry="IN"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            className="Alternative-HeroBanner-Form-phone-input"
                            style={{ width: "100%" }}
                            id="phone"
                            name="phone"
                            placeholder="Enter Mobile Number"
                        />
                    </div>
                    {submitted && errors.phone && (
                        <div className="text-danger" style={{ fontSize: "13px" }}>{errors.phone}</div>
                    )}

                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        placeholder="Write your Query (optional)"
                        value={formData.message}
                        onChange={handleChange}
                    />

                    <div className="Alternative-HeroBanner-Form-radio">
                        <div className="Hero-AL-TI-Form-RB-container" style={{ flexDirection: "column" }}>
                            {["Student", "IT Professional", "Domain Experience"].map((q) => (
                                <div className="Hero-AL-TI-Form-RB" key={q}>
                                    <input
                                        className="Hero-AL-TI-Form-RB__input"
                                        id={`hero_success_${q}`}
                                        type="radio"
                                        value={q}
                                        name="hero_success_qualification"
                                        checked={formData.hero_success_qualification === q}
                                        onChange={handleChange}
                                    />
                                    <label className="Hero-AL-TI-Form-RB__label" htmlFor={`hero_success_${q}`}>
                                        <span className="Hero-AL-TI-Form-RB__custom"></span>
                                        <span>{q}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {submitted && errors.hero_success_qualification && (
                        <div className="text-danger" style={{ fontSize: "13px" }}>{errors.hero_success_qualification}</div>
                    )}

                    <button type="submit">Register Now</button>
                    {success && (
                        <div className="text-success" style={{ fontSize: "14px", marginTop: "10px" }}>
                            Registration successful!, <br /> Our team will get back to you.
                        </div>
                    )}
                </form>
            </div>
        </div>
        </div>

    );
};

export default HeroSuccessStoriesForm;