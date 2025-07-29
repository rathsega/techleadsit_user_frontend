import React, { useEffect, useState, useRef, useMemo, useCallback, lazy, Suspense } from "react";
import httpService from './../../services/httpService'
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useRouter } from 'next/router';
import { useLoader } from "../../contexts/LoaderContext";
import LiveChatButton from "../LiveChatButton";
const ReactDatePicker = React.lazy(() => import("react-datepicker"));
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image"; // Importing Image component from next.js for optimized image handling

const UpcomingDemoSession = React.memo(({ data, courseTitle, courseId, demos, openForm, subHeading }) => {

    const router = useRouter();
    const queryParams = new URLSearchParams(router.asPath.search);

    const [defaultCountry, setDefaultCountry] = useState('IN');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [success, setSuccess] = useState(false);
    const { setLoading } = useLoader();

    // Function to get the suffix (st, nd, rd, th)
    const getDaySuffix = (date) => {
        if (date > 3 && date < 21) return "th"; // Special case for 11th to 20th
        switch (date % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    // Function to format the date in the desired format
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const suffix = getDaySuffix(day);

        // Get the month name
        const monthName = dateObj.toLocaleString("default", { month: "long" });

        // Get the year
        const year = dateObj.getFullYear();

        // Get the time in 12-hour format with AM/PM
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;

        // Construct the formatted date as '6th May 2025 04:00 PM'
        return `${day}${suffix} ${monthName} ${year} ${hours}:${minutes} ${ampm}`;
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
                    preferredDemoDate: parsed?.demoDate || parsed?.preferredDemoDate || ""
                }));
                setPhoneNumber(parsed?.phone || "");
            } catch (e) {
                // ignore parse errors
            }
        }
    }, []);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        courseName: courseTitle,
        preferredDemoDate: '',
        source: queryParams.get("source") ?? "Own",
        page: 'course',
        userType: 'Student'
    });


    const [errors, setErrors] = useState({
        fullName: false,
        email: false,
        phone: false,
        preferredDemoDate: false
    });

    const availableDemoDates = demos?.map(session => new Date(session.date)) || [];
    // Helper to check if a date is in the available demo dates (ignoring time)
    const isAvailableDate = (date) => {
        return availableDemoDates.some(
            d =>
                d.getFullYear() === date.getFullYear() &&
                d.getMonth() === date.getMonth() &&
                d.getDate() === date.getDate()
        );
    };

    // Find the selected session object based on formData.preferredDemoDate
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (value.trim() !== "") {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    }, []);

    const validateForm = () => {
        const nameRegex = /^[A-Za-z ]+$/;
        const newErrors = {
            fullName:
                formData.fullName.trim() === "" ||
                !nameRegex.test(formData.fullName.trim()),
            email: formData.email.trim() === "",
            phone:
                phoneNumber === "" ||
                typeof phoneNumber !== "string" ||
                !isValidPhoneNumber(phoneNumber),
            preferredDemoDate: formData.preferredDemoDate === "",
        };
        setErrors(newErrors);
        console.log(newErrors)
        return !Object.values(newErrors).includes(true);
    };

    const convertToKolkataTime = (dateString) => {
        const date = new Date(dateString); // Convert string to Date object
        const options = {
            timeZone: 'Asia/Kolkata', // Specify Asia/Kolkata timezone
            hour12: true, // Use 12-hour format with AM/PM
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };

        // Format the date to the required format: "1st July 2025 12:44 PM"
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit logic
            const dataToSend = {
                name: formData.fullName,
                email: formData.email,
                phone: phoneNumber,
                courseName: formData.courseName,
                demoDate: convertToKolkataTime(formData.preferredDemoDate),
                source: formData.source,
                page: courseId,
                userType: formData.userType
            };
            setLoading(true)
            const response = await httpService.post("/demo/register", dataToSend)
            setLoading(false)
            if (response.data) {
                console.log("Form submitted successfully:", dataToSend);
                localStorage.setItem('userDetails', JSON.stringify(dataToSend));
                setSuccess(true);
            } else {
                setSuccess(false);
            }
        }
    };

    // Handle phone number input change
    const handlePhoneNumberChange = useCallback((value) => {
        setPhoneNumber(value);

        // Validate the phone number here, if necessary
        if (!value) {
            setErrors({ phone: 'Phone number is required.' });
        } else {
            setErrors({ phone: '' });
        }
    }, []);

    function getNearestDemoDateTimeIST(demos) {
        if (!Array.isArray(demos) || demos.length === 0) return null;

        // Helper to convert UTC date string to IST Date object
        const toIST = (utcDateStr) => {
            const date = new Date(utcDateStr);
            return new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
        };

        const now = new Date();
        let nearest = null;
        let minDiff = Infinity;

        demos.forEach((demo) => {
            const demoDate = toIST(demo.date);
            const diff = demoDate - now;
            if (diff > 0 && diff < minDiff) {
                minDiff = diff;
                nearest = demoDate;
            }
        });

        if (!nearest) return null;

        // Format date: 02 July 2025
        const dateStr = nearest.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Kolkata",
        });

        // Format time: 8:00 AM
        const timeStr = nearest.toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
        });

        return { date: dateStr, time: timeStr };
    }

    const demoDetails = useMemo(()=>getNearestDemoDateTimeIST(demos), [demos]);

    const datePickerRef = useRef();

    const handleScroll = () => {
        if (datePickerRef.current) {
            const rect = datePickerRef.current.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            if (!isVisible) {
                document.activeElement.blur(); // triggers close
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true);
        return () => window.removeEventListener("scroll", handleScroll, true);
    }, []);


    return (<section className="Main-Course-Upcoming-Demo-Section">
        <div className="d-flex flex-column align-items-center">
            <p className="Main-Course-Upcoming-Demo-Section-Detail">Schedule</p>
            <h2 className="Main-Course-Upcoming-Demo-Section-Heading text-center">
                Upcoming demo sessions
            </h2>
            <p className="Main-Course-Upcoming-Demo-Section-Para text-center">
                {subHeading}
            </p>
        </div>
        <div className="Main-Course-Upcoming-Demo-Call-Sub-Section">
            <div className="Main-Course-Upcoming-Demo-Details-card">
                <div className="Main-Course-Upcoming-Demo-Details-card-content">
                    <div className="Main-Course-Upcoming-Demo-Details-card-Background">
                        <div className="Main-Course-Upcoming-Demo-Details-card-img-Content">
                            <div className="Main-Course-Upcoming-Demo-Mode">
                                <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Upcoming-Demo-Video-Icon.svg"
                                    height={11} width={11} alt="-Mode-Of-Demo-Video-Icon" />
                                <span className="Upcoming-Demo-Mode-text">{data?.demoMode}</span>
                            </div>
                            <h2 className="Main-Course-Upcoming-Demo-Mode-heading">
                                {courseTitle}
                            </h2>
                            <p className="Main-Course-Upcoming-Demo-Mode-para1">
                                Live demo session
                            </p>
                            <p className="Main-Course-Upcoming-Demo-Mode-para2">
                                FREE
                            </p>
                        </div>
                    </div>

                    <div className="Main-Course-Upcoming-Demo-Details-card-content-section-M">
                        <div className="d-flex justify-content-between">
                            <p className="Main-Course-Upcoming-Demo-Details-Date">
                                {demoDetails?.date}
                            </p>
                            <p className="Main-Course-Upcoming-Demo-Details-Time" style={{ textTransform: "uppercase" }}>
                                {demoDetails?.time}
                            </p>
                        </div>
                        <p className="Main-Course-Upcoming-Demo-Details-Tutor">
                            {data?.demoTrainerName}
                        </p>
                        <button className="Main-Course-Upcoming-Demo-Details-reg-btn" onClick={(e) => openForm("Register now")}>
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
            <form
                className="Main-Course-Upcoming-Demo-Details-form-container"
                onSubmit={handleSubmit}
                noValidate
            >
                <h3 className="Main-Course-Upcoming-Demo-Details-Request-Demo-form-heading">
                    Request Demo Form
                </h3>

                <div className="Main-Course-Upcoming-Demo-Details-input-container">
                    <input
                        type="text"
                        id="full-name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`Main-Course-Upcoming-Demo-Details-input-field ${errors.fullName ? "Main-Course-User-Authentication-Form-FB" : ""}`}
                        placeholder=" "
                    />
                    <label htmlFor="full-name" className="Main-Course-Upcoming-Demo-Details-input-label">
                        Full Name<span className="Main-Course-Upcoming-Demo-Details-required">*</span>
                    </label>
                </div>

                <div className="Main-Course-Upcoming-Demo-Details-input-container">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`Main-Course-Upcoming-Demo-Details-input-field ${errors.email ? "Main-Course-User-Authentication-Form-FB" : ""}`}
                        placeholder=" "
                    />
                    <label htmlFor="email" className="Main-Course-Upcoming-Demo-Details-input-label">
                        Email<span className="Main-Course-Upcoming-Demo-Details-required">*</span>
                    </label>
                </div>

                <div className="Main-Course-Upcoming-Demo-Details-input-container">
                    <PhoneInput
                        international
                        defaultCountry={defaultCountry} // Set the default country here
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        countrySelectProps={{ className: 'my-custom-select' }}
                        name="phone"
                        placeholder="Phone Number*"
                        className={`Main-Course-Upcoming-Demo-Details-input-field demo_register_phone ${errors.phone ? "Main-Course-User-Authentication-Form-FB" : ""}`}
                    />
                    <label htmlFor="ph-number" className="Main-Course-Upcoming-Demo-Details-input-label">
                        Phone Number<span className="Main-Course-Upcoming-Demo-Details-required">*</span>
                    </label>
                </div>

                <div className="Main-Course-Upcoming-Demo-Details-input-container" ref={datePickerRef}>
                    <Suspense fallback={<div>Loading...</div>}><ReactDatePicker
                        selected={formData.preferredDemoDate ? new Date(formData.preferredDemoDate) : null}
                        onChange={date => {
                            const formatted = formatDate(date);
                            setFormData(prev => ({
                                ...prev,
                                preferredDemoDate: date.toISOString()
                            }));
                            setErrors(prev => ({ ...prev, preferredDemoDate: false }));
                        }}
                        placeholderText="Select Preferred Demo Date"
                        className={`Main-Course-Upcoming-Demo-Details-input-field ${errors.preferredDemoDate ? "Main-Course-User-Authentication-Form-FB" : ""}`}
                        dateFormat="d MMMM yyyy hh:mm aa"
                        showTimeSelect
                        timeFormat="hh:mm aa"
                        timeIntervals={30}
                        minDate={new Date()}
                        required
                        id="preferredDemoDate"
                        name="preferredDemoDate"
                        autoComplete="off"
                    /></Suspense>
                    <label
                        htmlFor="preferredDemoDate"
                        className={`Main-Course-Upcoming-Demo-Details-input-label active-date-picker-label`}
                    // Add a custom class to always keep the label floated
                    >
                        Select Preferred Demo Date<span className="Main-Course-Upcoming-Demo-Details-required">*</span>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="Main-Course-Upcoming-Demo-Details-form-check-label d-flex justify-content-around">
                        {["Student", "IT Professional", "Domain Experience"].map(type => (
                            <div className="Main-Course-Upcoming-Demo-Details-form-check-in" key={type}>
                                <input
                                    type="radio"
                                    name="userType"
                                    value={type}
                                    checked={formData.userType === type}
                                    onChange={handleChange}
                                    className="Main-Course-Upcoming-Demo-Details-input-checkbox"
                                />
                                <span className="Main-Course-Upcoming-Demo-Details-form-check-input">{type}</span>
                            </div>
                        ))}
                    </label>
                </div>

                <div className="Main-Course-Upcoming-Demo-Details-request-demo-button">
                    <button type="submit" className="Main-Course-Upcoming-Demo-Details-req-btn">
                        Register Now
                    </button>
                </div>
                {success && <div className="Main-Course-Registered-Message mt-2">
                    <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Form-S-Tick-Mark.svg" height="40" width="40"
                        alt="Tick-Mark-Icon" />
                    <div className="ms-3">
                        <p className="Main-Course-Registered-P">You're registered!!</p>
                        <p className="Main-Course-Registered-P">Our team will get back to you</p>
                    </div>
                </div>}
            </form>
            <div className="Main-Course-Upcoming-Demo-have-que-section">
                <div>
                    <h2 className="Main-Course-Upcoming-Demo-have-que-heading">
                        Have any questions
                    </h2>
                    <h2 className="Main-Course-Upcoming-Demo-have-que-subheading">
                        We are Here to Help You
                    </h2>
                </div>
                <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Upcoming-Demo-Call-Us.svg" alt="have-questions-img" className="img-fluid" width="315" height="190" style={{ "color": "transparent", "maxWidth": "100%", "width": "auto", "height": "auto", "borderRadius": "20px" }} />
                <div>
                    <LiveChatButton
                        className="Main-Course-Upcoming-Demo-live-chat"
                        iconSrc="/images/courses/Whatsapp-Icon.svg"
                        iconAlt="WhatsApp icon"
                        iconWidth={21}
                        iconHeight={21}></LiveChatButton>
                    <button className="Main-Course-Upcoming-Demo-request-a-call" onClick={(e) => openForm("Request a call back")}>
                        <i className="fa-solid fa-phone-volume Main-Course-CTA-Banner-Btn-icon"></i>Request
                        a Call Back
                    </button>
                </div>
            </div>
        </div>
    </section>)
})

export default UpcomingDemoSession;