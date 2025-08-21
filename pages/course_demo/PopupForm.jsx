import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
// import { useParams, useLocation } from 'react-router-dom';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import httpService from "./../../services/httpService";
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

    const [formErrors, setFormErrors] = useState({
        fullName: "",
        email: "",
        phone: "",
        qualification: "",
        userType: ""
    });

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        qualification: "",
        reason: "",
        userType: "Student",
        source: queryParams.get('source') ?? 'Own',
        page: 'demo',
        pageId: id
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
        //console.log(e);
        // Validation
        let errors = {};
        if (!fullName) errors.fullName = "Full name is required";
        if (!email) errors.email = "Email is required";
        if (!phone) errors.phone = "Phone number is required";
        if (!qualification) errors.qualification = "Qualification is required";
        if (!userType) errors.userType = "User type is required";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // Make the API request to store the data
            const formData = {
                fullName,
                email,
                phone,
                userType,
                qualification,
                source: queryParams.get('source') ?? 'Own',
                page: 'demo',
                pageId: id
            };

            const response = await httpService.post("/contactus/submitForm", formData)
            if (response.data) {
                //console.log("Form submitted successfully:", formData);
                handlePopupformVisibility();
                // localStorage.setItem('userDetails', JSON.stringify(formData));
                setUserDetails(formData);
                handleUserDetailsSubmissionStatus(true);
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
                            className="input-field"
                            placeholder=" "
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <label htmlFor="fullName" className="input-label">Full Name<span className="required">*</span></label>
                    </div>

                    <div className="input-container">
                        <input
                            type="email"
                            id="email"
                            className="input-field"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email" className="input-label">Email<span className="required">*</span></label>
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
                            required
                        />
                        <label htmlFor="phoneNumber" className="input-label">Phone Number<span className="required">*</span></label>
                    </div>

                    <div className="input-container">
                        <select
                            id="qualification"
                            className="input-field"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            required
                        >
                            <option value="" disabled></option>
                            <option value="Bachelors">Bachelors</option>
                            <option value="Masters">Masters</option>
                            <option value="PhD">PhD</option>
                        </select>
                        <label htmlFor="qualification" className="input-label">Select Preferred Demo Date<span className="required">*</span></label>
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

                    <div className="text-end">
                        <button type="submit" className="reg-btn">{popupProps?.buttonName}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default PopupForm;