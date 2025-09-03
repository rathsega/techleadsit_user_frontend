import React, { useState, useEffect } from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import httpService from '../../../services/httpService'
import Image from 'next/image'
import { useExpiringLocalStorage } from "../../../services/useExpiringLocalStorage";

const RegistrationForm = ({ webinarTitle, webinarId }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    source: typeof window !== "undefined" ? (new URLSearchParams(window.location.search).get("source") ?? "Own") : "Own",
    page: webinarTitle,
    pageId: webinarId,
    message: ""
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const now = new Date();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

  const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
    "userDetails",
    null,
    endOfDay
  );

  // capture user details
  const captureUserDetails = () => {
    if (userDetails) {
      try {
        const parsed = JSON.parse(userDetails);
        setFormData(prev => ({
          ...prev,
          fullName: parsed?.name || parsed?.fullName || "",
          email: parsed?.email || "",
          phone: parsed?.phone || "",
          message: parsed?.message || ""
        }));
      } catch (e) {
        console.error("Error parsing user details:", e);
        // ignore parse errors
      }
    }
  };

  useEffect(() => {
    captureUserDetails();
  }, [userDetails]);

  // Validation helpers
  const validate = () => {
    const errs = {}

    // Name: only letters and spaces
    if (!formData.fullName.trim()) {
      errs.fullName = "Name is required"
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
      errs.fullName = "Name can only contain letters and spaces"
    }

    // Email: basic email regex
    if (!formData.email.trim()) {
      errs.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Enter a valid email address"
    }

    // Phone: must be valid with country code
    if (!formData.phone) {
      errs.phone = "Phone number is required"
    } else if (!isValidPhoneNumber(formData.phone)) {
      errs.phone = "Enter a valid phone number with country code"
    }

    // Message: optional, but should not allow scripts
    if (formData.message && /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(formData.message)) {
      errs.message = "Scripts are not allowed in message"
    }

    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }))
    setErrors(prev => ({ ...prev, phone: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess("")
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      await httpService.post("/contactus/submitForm", { ...formData });
      setSuccess("Thank you for registering! We have received your details.");
      setMessageType("success");
      setUserDetails({...formData, fullName: formData.fullName});
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        source: formData.source,
        page: webinarTitle,
        pageId: webinarId,
        message: ""
      });
    } catch (err) {
      setSuccess("Something went wrong. Please try again.");
      setMessageType("error");
    }
    setLoading(false);
  }

  return (
    <div className="registration-form">
      <h3 className="form-title">Join Our Free Webinar - Register Now</h3>
      <form onSubmit={handleSubmit} className="form" noValidate>
        <div className="form-group">
          <label htmlFor="fullName">Name*</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter Name"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.fullName && <div style={{ color: "red" }}>{errors.fullName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email ID"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Mobile Number*</label>
          <div className="mobile-input">
            <PhoneInput
              id="phone"
              name="phone"
              placeholder="Enter Mobile Number"
              value={formData.phone}
              onChange={handlePhoneChange}
              defaultCountry="IN"
              international
            />
          </div>
          {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your Query (optional)"
            value={formData.message}
            onChange={handleChange}
            rows="2"
            autoComplete="off"
          />
          {errors.message && <div style={{ color: "red" }}>{errors.message}</div>}
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {messageType === "success" && success && (
          <div className="Main-Course-Registered-Message">
            <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Form-S-Tick-Mark.svg" height="40" width="40"
              alt="Tick-Mark-Icon" />
            <div className="ms-3">
              <p className="Main-Course-Registered-P">You're registered!!</p>
              <p className="Main-Course-Registered-P">Our team will get back to you</p>
            </div>
          </div>
        )}
        {messageType === "error" && success && (
          <div className="mt-2">
            <img
              src="/images/home/Main-Course-Home-Page-Get-Notified-About-Blogs-invalid-Icon.svg"
              alt="Invalid-Icon"
              className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-invalid-img"
            />
            <span className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-message">
              {success}
            </span>
          </div>
        )}
      </form>
    </div>
  )
}

export default RegistrationForm