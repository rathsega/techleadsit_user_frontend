import React, { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), { ssr: false });
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useRouter } from "next/router";
import httpService from "../../services/httpService";
import SmartReCaptcha from "../../pages/captcha/SmartReCaptcha";
import { useLoader } from "../../contexts/LoaderContext";
import "react-datepicker/dist/react-datepicker.css";
// Dynamically import ReactDatePicker with SSR disabled
const ReactDatePicker = dynamic(() => import("react-datepicker"), { ssr: false });
import Image from "next/image"; // Importing Image component from next.js for optimized image handling
import useLmsStore from "../../store/lmsStore";
import { useExpiringLocalStorage } from "../../services/useExpiringLocalStorage";
const CourseRegistrationForm = React.memo(() => {
  const router = useRouter();
  const { id } = router.query;
  const queryParams = new URLSearchParams(router.asPath?.split('?')[1]);
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef();
  const [captchaKey, setCaptchaKey] = useState(0);
  const { setLoading } = useLoader();
  const [defaultCountry, setDefaultCountry] = useState("IN");
  const [demos, setDemos] = useState([])
  const setFormHeading = useLmsStore((state) => state.setFormHeading);

  const popupFormProps = useLmsStore((state) => state.popupFormProps);
  const setPopupFormProps = useLmsStore((state) => state.setPopupFormProps);
  let fields = popupFormProps?.fields;
  let heading = popupFormProps?.heading;
  let buttonLabel = popupFormProps?.buttonLabel;
  let pageName = popupFormProps?.pageName;
  let courseTitle = popupFormProps?.courseTitle;
  let courseId = popupFormProps?.courseId;
  let courseSlug = popupFormProps?.courseSlug;
  let onSuccess = popupFormProps?.onSuccess;
  if (typeof onSuccess !== 'function') {
    onSuccess = (formData) => {};
  }
  const overlayRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    userType: "Student",
    source: queryParams.get("source") ?? "Own",
    page: popupFormProps?.pageName == "Course Page" ? "course - " + popupFormProps?.courseTitle : popupFormProps?.pageName || "unknown",
    pageId: popupFormProps?.courseId ?? id,
    demoDate: ""
  });

  const now = new Date();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

  const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
    "userDetails",
    null,
    endOfDay
  );

  useEffect(() => {
    if (userDetails) {
      try {
        const parsed = JSON.parse(userDetails);
        setFormData(prev => ({
          ...prev,
          name: parsed?.name || parsed?.fullName || "",
          phone: parsed?.phone || "",
          email: parsed?.email || "",
        }));
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (submitted) {
      validateField(id, value);
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    if (submitted) {
      validateField("phone", value);
    }
  };

  const validateField = (field, value) => {
    let error = "";
    if (field === "fullName" && fields?.includes("fullName")) {
      if (!value) {
        error = "Full name is required";
      } else if (!/^[A-Za-z ]+$/.test(value)) {
        error = "Full name can only contain letters and spaces";
      }
    } else if (field === "email" && fields?.includes("email") && !value) {
      error = "Email is required";
    } else if (field === "phone" && fields?.includes("phone") && !value) {
      error = "Phone number is required";
    } else if (field === "qualification" && fields?.includes("qualification") && !value) {
      error = "Qualification is required";
    } else if (field === "demoDate" && fields?.includes("demoDate") && !value) {
      error = "Preferred demo date is required";
    }

    setFormErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };


  const handleUserTypeChange = (e) => {
    setFormData((prev) => ({ ...prev, qualification: e.target.value }));
    if (submitted) {
      validateField('qualification', e.target.value);
    }
  };

  const validate = () => {
    const errors = {};
    if (fields?.includes("fullName")) {
      const fullName = formData.fullName?.trim();

      if (!fullName) {
        errors.fullName = "Full name is required";
      } else if (!/^[A-Za-z ]+$/.test(fullName)) {
        errors.fullName = "Full name can only contain letters and spaces";
      }
    }

    if (fields?.includes("email") && !formData.email.trim()) errors.email = "Email is required";
    if (fields?.includes("email") && formData.email.trim() && !errors.hasOwnProperty(email) && !/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Email is invalid";

    if (fields?.includes("phone") && !formData.phone) errors.phone = "Phone number is required";
    if (fields?.includes("phone") && !errors.hasOwnProperty(phone) && (typeof formData.phone !== "string" || !isValidPhoneNumber(formData.phone))) errors.phone = "Phone number is invalid";
    if (fields?.includes("qualification") && !formData.qualification) errors.qualification = "Qualification is required";
    if (fields?.includes("demoDate") && !formData.demoDate) errors.demoDate = "Preferred demo date is required";
    if (fields?.includes("message") && !formData.message) errors.message = "Message is required";
    if (!captchaToken) errors.captcha = "Captcha is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true)
        let response;
        if (fields?.includes("demoDate") || popupFormProps?.hiddenFields?.demoDate) {
          response = await httpService.post("/demo/register", { ...formData, courseName: courseTitle, name: formData.fullName, token: captchaToken, ...popupFormProps?.hiddenFields });
        } else {
          delete formData.demoDate;
          response = await httpService.post("/contactus/submitForm", { ...formData, token: captchaToken });
        }

        if (response.data) {
        await setUserDetails(formData);
        onSuccess(formData);
        captchaRef.current?.resetCaptcha();
        setCaptchaToken('');
        setCaptchaKey(prev => prev + 1);
        setLoading(false)
        setSuccess(true);
        
        // Close the popup first
        setPopupFormProps({ visible: false, hiddenFields: {} });
        
        // Add a small delay and then navigate
        setTimeout(() => {
          if (pageName === 'Course Page') {
            setFormHeading(" " + heading + " ");
            
            // Safely handle slug
            let slugParam = 'unknown';
            try {
              if (router.query.slug) {
                if (Array.isArray(router.query.slug)) {
                  slugParam = router.query.slug.join('_');
                } else {
                  slugParam = router.query.slug;
                }
              } else if (courseSlug) {
                slugParam = courseSlug;
              }
            } catch (err) {
              console.warn('Slug error:', err);
              slugParam = courseSlug || 'unknown';
            }
            
            // Use window.location for reliable navigation
            window.location.href = `/thankyou?fromPage=${pageName}&courseTitle=${encodeURIComponent(courseTitle)}&courseId=${courseId}&slug=${slugParam}`;
            
          } else if (pageName?.includes('upcoming_demo')) {
            window.location.href = `/thankyou?fromPage=upcoming_demo&slug=${courseSlug || 'unknown'}`;
          } else {
            // Simple navigation that should always work
            // Get current page relative URL (without domain)
            const currentPageSlug = router.asPath.split('?')[0]; // Remove query params
            const thankYouUrl = `/thankyou?fromPage=${encodeURIComponent('unknown')}&slug=${encodeURIComponent(currentPageSlug)}`;
            window.location.href = thankYouUrl;
          }
        }, 200);
      }
      } catch (err) {
        captchaRef.current?.resetCaptcha(); // Reset CAPTCHA
        setCaptchaToken('');
        setCaptchaKey(prev => prev + 1);
        setLoading(false)
        console.error("Form submission failed:", err);
      }
    }
  };


  useEffect(() => {
    const getCountryCode = async () => {
      try {
        const country = "IN"; // fallback or fetched
        setDefaultCountry(country);
      } catch (error) {
        console.error("Could not get country:", error);
      }
    };
    getCountryCode();
  }, []);

  useEffect(() => {
    const getUpcomingDemos = () => {
      const fetchDemos = async () => {
        try {
          if (!courseTitle || !courseId) {
            console.error("Course title or ID is missing");
            return;
          }
          const response = await httpService.post("courses/getUpcomingDemosByCourseTitle", {
            courseTitle: courseTitle,
            courseId: courseId
          });
          setDemos(response?.data?.upcomingDemos || []);
        } catch (error) {
          console.error("Error fetching demo sessions:", error);
        }
      };

      fetchDemos();
    }
    courseTitle && getUpcomingDemos();
  }, [courseTitle])

  //Close the form when the overlay is clicked or escape key is pressed
  useEffect(() => {
    const handleOverlayClick = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        setFormErrors({});
        setSubmitted(false);
        setPopupFormProps({ visible: false});
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setFormErrors({});
        setSubmitted(false);
        setPopupFormProps({ visible: false });
      }
    };

    document.addEventListener("mousedown", handleOverlayClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div
      className="Main-Course-Form-Container Main-Course-Register-Form"
      ref={overlayRef}
      style={{ display: popupFormProps?.visible ? "block" : "none" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="Main-Course-Register-Form-Heading">{heading}</h3>
        <button className="border-0 Main-Course-Close-Btn" onClick={() => {
          setFormErrors({});
          setSubmitted(false);
          setPopupFormProps({ visible: false});
        }}>
          <i className="fa fa-times Main-Course-Fa-Times Universal-Cross-Mark" aria-hidden="true"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          {fields?.includes("fullName") && (
            <div className="Main-Course-Input-Container">
              <input
                type="text"
                id="fullName"
                className="Main-Course-Input-Field"
                placeholder=" "
                value={formData.fullName}
                onChange={handleChange}
              />
              <label htmlFor="fullName" className="Main-Course-Input-Label">
                Full Name<span className="Main-Course-Required">*</span>
              </label>
              {formErrors.fullName && <small className="text-danger">{formErrors.fullName}</small>}
            </div>
          )}

          {fields?.includes("email") && (
            <div className="Main-Course-Input-Container">
              <input
                type="email"
                id="email"
                className="Main-Course-Input-Field"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email" className="Main-Course-Input-Label">
                Email<span className="Main-Course-Required">*</span>
              </label>
              {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
            </div>
          )}

          {fields?.includes("phone") && (
            <div className="Main-Course-Input-Container">
              <PhoneInput
                international
                id="phone"
                className="input-field demo_register_phone"
                defaultCountry={defaultCountry}
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="Phone Number*"
              />
              {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
            </div>
          )}

          {/* Preferred Demo Date */}
          {fields?.includes("demoDate") && (
            <div className="Main-Course-Upcoming-Demo-Details-input-container">
              <ReactDatePicker
                selected={formData.demoDate ? new Date(formData.demoDate) : null}
                onChange={date => {
                  setFormData(prev => ({
                    ...prev,
                    demoDate: date ? date.toISOString() : ""
                  }));
                  if (submitted) {
                    validateField("demoDate", date ? date.toISOString() : "");
                  }
                }}
                placeholderText="Select Preferred Demo Date *"
                className={`Main-Course-Upcoming-Demo-Details-input-field ${formErrors.demoDate ? "Main-Course-User-Authentication-Form-FB" : ""}`}
                dateFormat="d'st' MMMM yyyy hh:mm aa"
                showTimeSelect
                timeFormat="hh:mm aa"
                timeIntervals={30}
                minDate={new Date()}
                required
                id="demoDate"
                name="demoDate"
                autoComplete="off"
              />
              <label
                htmlFor="demoDate"
                className="Main-Course-Upcoming-Demo-Details-input-label active-label"
              >
                Select Preferred Demo Date<span className="Main-Course-Upcoming-Demo-Details-required">*</span>
              </label>
              {formErrors.demoDate && <small className="text-danger">{formErrors.demoDate}</small>}
            </div>
          )}

          {/* User type radio buttons */}
          {fields?.includes("qualification") &&
            <div className="TI-Form-RB-container">
              {["Student", "IT Professional", "Domain Experience"].map((qualification) => (
                <div className="TI-Form-RB" key={qualification}>
                  <input type="radio" value={qualification} checked={formData.qualification === qualification} onChange={handleUserTypeChange} className="TI-Form-RB__input" id={qualification} name="qualification" />
                  <label className="TI-Form-RB__label" for={qualification}>
                    <span className="TI-Form-RB__custom"></span>
                    {qualification}
                  </label>
                </div>
              ))}
            </div>}
          {formErrors.qualification && <small className="text-danger">{formErrors.qualification}</small>}


          {fields?.includes("message") && (
            <div className="Main-Course-Input-Container mt-3">
              <textarea
                id="message"
                className="Main-Course-Input-Field Text-Area-Course-Naming-H"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              />
              <label htmlFor="message" className="Main-Course-Input-Label">
                Mention the course you want to learn<span className="Main-Course-Required">*</span>
              </label>
              {formErrors.message && <small className="text-danger">{formErrors.message}</small>}
            </div>
          )}

          <div className="d-flex justify-content-center mb-2">
            <SmartReCaptcha
              ref={captchaRef}
              siteKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
              onTokenChange={(token) => setCaptchaToken(token)}
              theme="light"
              size="normal"
            />

          </div>
          <div className="d-flex justify-content-center mb-2">
            {formErrors.captcha && <small className="text-danger">{formErrors.captcha}</small>}
          </div>


          {!success && <div className="Main-Course-Register-Button">
            <button type="submit" className="Main-Course-Reg-Btn">
              {buttonLabel}
            </button>
          </div>}
          {success && <div className="Main-Course-Registered-Message">
            <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Form-S-Tick-Mark.svg" height="40" width="40"
              alt="Tick-Mark-Icon" />
            <div className="ms-3">
              <p className="Main-Course-Registered-P">You're registered!!</p>
              <p className="Main-Course-Registered-P">Our team will get back to you</p>
            </div>
          </div>}
        </div>
      </form>
    </div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if heading is actually different and not empty
  return prevProps.heading === nextProps.heading;
});

export default CourseRegistrationForm;

