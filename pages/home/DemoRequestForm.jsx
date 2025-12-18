import React, { useState, useEffect, useCallback } from "react";
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), { ssr: false });
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import httpService from "../../services/httpService";
import { useExpiringLocalStorage } from "../../services/useExpiringLocalStorage";
import useLmsStore from "../../store/lmsStore";
import { useRouter } from 'next/router';
import { useLoader } from "../../contexts/LoaderContext";

const DemoRequestForm = () => {
  const router = useRouter();
  const queryParams = new URLSearchParams(router.asPath?.split('?')[1]);
  const setPopupFormProps = useLmsStore((state) => state.setPopupFormProps);

  const now = new Date();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

  const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
    "userDetails",
    null,
    endOfDay
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    page: "Home - ",
    course: "",
    source: queryParams.get("source") ?? "Own"
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Please Enter Valid Details");
  const { setLoading } = useLoader();
  const courseList = useLmsStore((state) => state.courseList);

  // Fix: use value instead of defaultValue, and always update formData on change
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
    if (!formData.course || formData.course === "Select Course*") {
      newErrors.course = "Please select a course";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setSuccess(false);
    setError(false);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      const pageTitle = "Home - " + formData.course;
      try {
        const response = await httpService.post("/contactus/submitHeroForm", {
          ...formData,
          page: pageTitle,
        });
        setSuccess(true);
        setError(false);
        let userDetailsData = { ...userDetails, ...formData, page: pageTitle, course: formData.course };
        setUserDetails(userDetailsData);
        setErrorMsg("Thank you for your submission!");
        // Fix: courseTitle and slug fallback
        const courseTitle = encodeURIComponent(formData.course || "");
        const slug = Array.isArray(router.query.slug)
          ? router.query.slug.join('_')
          : (router.query.slug || "");
        router.push(`/thankyou?courseTitle=${courseTitle}&slug=${slug}&from=home`);
      } catch (err) {
        console.log(err);
        setSuccess(false);
        setError(true);
        setErrorMsg(err?.response?.data?.message || "An error occurred while submitting the form.");
      } finally {
        setLoading(false);
      }
      setSubmitted(false);
    }
  };

  useEffect(() => {
    if (userDetails) {
      try {
        const parsed = typeof userDetails === "string" ? JSON.parse(userDetails) : userDetails;
        setFormData(prev => ({
          ...prev,
          fullName: parsed?.name || parsed?.fullName || "",
          phone: parsed?.phone || "",
          email: parsed?.email || "",
          course: parsed?.course || "",
        }));
      } catch (e) {
        // ignore parse errors
      }
    }
  }, [userDetails]);

  const courses_required_in_dropdown = [
    "oracle-fusion-scm-online-training-course",
    "oracle-fusion-hcm-online-training-course",
    "oracle/oracle-fusion/oracle-fusion-financials-training/oracle-fusion-financials-course",
    "oracle-fusion-technical-training-course",
    "oracle-apex-online-training-course",
    "ERP/SAP/sap-cpi-training/sap-cpi-course",
    "oracle-fusion-manufacturing-planning-online-training-course",
    "oracle/oracle-fusion/oracle-warehouse-management-training/oracle-wms-training",
    "oracle/oracle-fusion/orc-training/oracle-recruiting-cloud-training",
    "oracle-fusion-ppm-online-training",
    "oracle/oracle-fusion/otm-training/oracle-transportation-management-training",
    "oracle/oracle-fusion/oracle-gtm-online-training/oracle-global-trade-management-training"
  ]

  return (
    <section className="Home-Page-Lead-Form-container">
      <h2 className="Home-Page-Lead-Form-title">Request For Free Demo</h2>
      <form className="Home-Page-Lead-Form-grid" onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="Home-Page-Lead-Form-field">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name*"
            className="Home-Page-Lead-Form-input"
            value={formData.fullName}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          {submitted && errors.fullName && (
            <div className="text-danger" style={{ fontSize: "13px" }}>{errors.fullName}</div>
          )}
        </div>
        {/* Email */}
        <div className="Home-Page-Lead-Form-field">
          <input
            type="email"
            name="email"
            placeholder="Email*"
            className="Home-Page-Lead-Form-input"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          {submitted && errors.email && (
            <div className="text-danger" style={{ fontSize: "13px" }}>{errors.email}</div>
          )}
        </div>
        {/* Phone Number */}
        <div className="Home-Page-Lead-Form-field">
          <PhoneInput
            international
            defaultCountry="IN"
            value={formData.phone}
            onChange={handlePhoneChange}
            className="Home-Page-Lead-Form-phone-input home_demo_request_phone"
            name="phone"
            placeholder="Phone Number*"
          />
          {submitted && errors.phone && (
            <div className="text-danger" style={{ fontSize: "13px" }}>{errors.phone}</div>
          )}
        </div>
        {/* Course Dropdown */}
        <div className="Home-Page-Lead-Form-field">
          <select
            className="Home-Page-Lead-Form-input"
            name="course"
            onChange={handleChange}
            value={formData.course}
            required
          >
            <option value="">Select Course*</option>
            {courseList.filter(course => courses_required_in_dropdown.includes(course.slug)).map((course) => (
              <option key={course.title} value={course.title}>{course.title}</option>
            ))}
          </select>
          {submitted && errors.course && (
            <div className="text-danger" style={{ fontSize: "13px" }}>{errors.course}</div>
          )}
        </div>
        {/* Submit */}
        <button type="submit" className="Home-Page-Lead-Form-btn">
          Submit
        </button>
        {/* Success/Error Message */}
        {success && <div className="text-success" style={{ fontSize: "14px", marginTop: "10px" }}>{errorMsg}</div>}
        {error && <div className="text-danger" style={{ fontSize: "14px", marginTop: "10px" }}>{errorMsg}</div>}
      </form>
    </section>
  );
};

export default DemoRequestForm;