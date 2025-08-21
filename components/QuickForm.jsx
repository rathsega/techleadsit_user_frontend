import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), { ssr: false });
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useLoader } from '../contexts/LoaderContext';
import { useRouter } from "next/router";
import httpService from '../services/httpService';
import { useExpiringLocalStorage } from '../services/useExpiringLocalStorage';

const QuickForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [animate, setAnimate] = useState("");
  const router = useRouter();
  const queryParams = new URLSearchParams(router.asPath?.split('?')[1]);
  const { setLoading } = useLoader();
  const [defaultCountry] = useState("IN");
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    source: queryParams.get("source") ?? "Own",
    page: 'quick chat',
    pageId: '',
  });

  const toggleForm = () => {
    setSuccess(false);
    setFormErrors({});
    setSubmitted(false);

    if (showForm) {
      formRef.current.classList.remove('animate');
      formRef.current.classList.add('zoomOut');
      setTimeout(() => {
        setShowForm(false);
        formRef.current.classList.remove('zoomOut');
      }, 400);
    } else {
      setShowForm(true);
    }
  };

  const validateForm = (fields = ["fullName", "email", "phone", "message"]) => {
    const errors = {};

    if (fields.includes("fullName")) {
      const fullName = formData.fullName?.trim();
      if (!fullName) {
        errors.fullName = "Full name is required";
      } else if (!/^[A-Za-z ]+$/.test(fullName)) {
        errors.fullName = "Full name can only contain letters and spaces";
      }
    }

    if (fields.includes("email")) {
      const email = formData.email?.trim();
      if (!email) {
        errors.email = "Email is required";
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errors.email = "Invalid email format";
      }
    }

    if (fields.includes("phone")) {
      if (!formData.phone) {
        errors.phone = "Mobile number is required";
      } else if (typeof formData.phone !== "string" || !isValidPhoneNumber(formData.phone)) {
        errors.phone = "Invalid mobile number";
      }
    }

    if (fields.includes("message")) {
      const message = formData.message?.trim();
      const htmlTagRegex = /<[^>]*>/g;
      if (!message) {
        errors.message = "Message is required";
      } else if (htmlTagRegex.test(message)) {
        errors.message = "Message should not contain HTML or script tags";
      }
    }

    setFormErrors(errors);
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitted) {
      validateForm([name]);
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    if (submitted) {
      validateForm(["phone"]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        let response = await httpService.post("/contactus/submitForm", { ...formData });
        if (response.data) {
          // localStorage.setItem("userDetails", JSON.stringify(formData));
          setUserDetails(formData);
          setLoading(false);
          setSuccess(true);
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            message: "",
            source: queryParams.get("source") ?? "Own",
            page: 'quick chat',
            pageId: '',
          });
          setTimeout(() => setShowForm(prev => !prev), 3000);
        }
      } catch (err) {
        setLoading(false);
        setSuccess(false);
        setFormErrors({ submit: "Form submission failed. Please try again." });
        console.error("Form submission failed:", err);
      }
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
          message: parsed?.message || "",
        }));
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

  return (
    <>
      {!showForm && (
        <ul className="QuickForm-Message-Icon" id="quickFormIcon">
          <li
            style={{
              '--i': '#56CCF2',
              '--j': '#2F80ED',
              boxShadow: '0px 0px 12px 0px rgba(0, 158, 255, 1)',
            }}
            onClick={toggleForm}
          >
            <img src="/images/Vector.svg" className="QuickForm-icon" alt="Quick-Form-Icon" />
            <span className="QuickForm-title">Leave a Message</span>
          </li>
        </ul>
      )}

      {showForm && (
        <div className="QuickForm-Popup animate" id="quickForm" ref={formRef}>
          <div className="QuickForm-close" onClick={toggleForm}>×</div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="QuickForm-group">
              <label htmlFor="quickform-fullName">Name <span className="QuickForm-required">*</span></label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter Name"
                className='QuickForm-InputField'
                id='quickform-fullName'
                value={formData.fullName}
                onChange={handleChange}
                maxLength={100}
                autoComplete="off"
              />
              {formErrors.fullName && <small className="text-danger">{formErrors.fullName}</small>}
            </div>
            <div className="QuickForm-group">
              <label htmlFor="quickform-email">Email ID <span className="QuickForm-required">*</span></label>
              <input
                type="email"
                name="email"
                id='quickform-email'
                placeholder="Enter Email ID"
                className='QuickForm-InputField'
                value={formData.email}
                onChange={handleChange}
                maxLength={100}
                autoComplete="off"
              />
              {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
            </div>
            <div className="QuickForm-group">
              <label>Mobile Number <span className="QuickForm-required">*</span></label>
              <div className="QuickForm-phone-wrapper">
                <PhoneInput
                  international
                  id="quickform-phone"
                  className="input-field QuickForm-phone-wrapper cu_register_phone QuickForm-InputField"
                  defaultCountry={defaultCountry}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Phone Number*"
                />
              </div>
              {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
            </div>
            <div className="QuickForm-group">
              <label htmlFor="quickform-message">Leave a Message <span className="QuickForm-required">*</span></label>
              <textarea
                name="message"
                placeholder="Your message here..."
                required
                rows="3"
                id='quickform-message'
                className='QuickForm-InputField Text-Area-Course-Naming-H'
                value={formData.message}
                onChange={handleChange}
                maxLength={500}
                autoComplete="off"
              ></textarea>
              {formErrors.message && <small className="text-danger">{formErrors.message}</small>}
            </div>
            {formErrors.submit && <div className="text-danger">{formErrors.submit}</div>}
            {success && <div className="text-success">Thank you! Your message has been sent.</div>}
            <button type="submit" className="QuickForm-submit-btn">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default QuickForm;