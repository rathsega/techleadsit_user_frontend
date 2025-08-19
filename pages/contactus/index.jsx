import SubscribeSection from "../blog/details/SubscribeSection";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), { ssr: false });
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import httpService from "./../../services/httpService";
import { useLoader } from "../../contexts/LoaderContext";
import SmartReCaptcha from "../captcha/SmartReCaptcha";

const Contactus = () => {

    // Get query parameters from the location object
    const router = useRouter();
    const queryParams = new URLSearchParams(router.asPath.search);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
        privacy: false
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const captchaRef = useRef();
    const [captchaKey, setCaptchaKey] = useState(0);
    const { setLoading } = useLoader();

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
            try {
                const parsed = JSON.parse(userDetails);
                setFormData(prev => ({
                    ...prev,
                    name: parsed?.name || parsed?.fullName || "",
                    phone: parsed?.phone || "",
                    email: parsed?.email || "",
                    message: parsed?.message || "",
                    privacy: parsed?.privacy || false
                }));
            } catch (e) {
                // ignore parse errors
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => {
            const updatedForm = {
                ...prevState,
                [name]: type === "checkbox" ? checked : value
            };

            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                if ((name === "privacy" && updatedForm[name]) || (name !== "privacy" && updatedForm[name].trim())) {
                    delete newErrors[name];
                }
                return newErrors;
            });

            return updatedForm;
        });
    };

    const handlePhoneChange = (value) => {
        setFormData(prevState => ({ ...prevState, phone: value }));
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            if (value) {
                delete newErrors.phone;
            }
            return newErrors;
        });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (!/^[A-Za-z ]+$/.test(formData.name.trim())) {
            newErrors.name = "Name should contain only letters and spaces";
        }
        if (!formData.phone) newErrors.phone = true;
        if ((typeof formData.phone !== "string" || !isValidPhoneNumber(formData.phone))) newErrors.phone = true;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
        if (!formData.message.trim()) newErrors.message = true;
        if (!formData.privacy) newErrors.privacy = true;
        if (!captchaToken) newErrors.captcha = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const newFormData = {
                ...formData, fullName: formData.name, userType: "",
                // qualification,
                source: queryParams.get('source') ?? 'Own',
                page: 'contactus',
                pageId: "",
                token: captchaToken
            };

            delete newFormData.privacy;
            delete newFormData.name;
            setSubmitted(true);
            try {
                setLoading(true)
                const response = await httpService.post("/contactus/submitForm", newFormData)
                setLoading(false)
                if (response.data) {
                    //console.log("Form submitted successfully:", formData);
                    localStorage.setItem('userDetails', JSON.stringify(formData));
                    setHasError(false)
                    captchaRef.current?.resetCaptcha(); // Reset after success
                    setCaptchaToken('');
                    setCaptchaKey(prev => prev + 1);
                    setLoading(false)
                    setTimeout(() => {
                        setFormData({ name: "", phone: "", email: "", message: "", privacy: false });
                        setErrors({});
                        setSubmitted(false);
                    }, 2000);
                } else {
                    setHasError(true)
                }
            } catch (error) {
                setHasError(true)
                captchaRef.current?.resetCaptcha(); // Reset after success
                setCaptchaToken('');
                setCaptchaKey(prev => prev + 1);
                setLoading(false)
                if (error.response) {
                    setErrorMsg(error.response.data.message);
                } else if (error.request) {
                    // Request was made but no response received
                    console.error("No response received:", error.request);
                }
            }

        }
    };

    const [defaultCountry, setDefaultCountry] = useState('IN');

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

    const socialLinks = {
        linkedin: "https://www.linkedin.com/company/techleadsit1/posts/?feedView=all",
        youtube: "https://www.youtube.com/@TechLeadsIT?sub_confirmation=1",
        instagram: "https://www.instagram.com/techleadsit/",
        facebook: "https://www.facebook.com/techleadsitinstitute"
    };

    return (
        <section className="Course-Contact-Us-Section">
            <section className="Course-Contact-US-Main-Section Course-Contact-Us-margin">
                <h1 className="Course-Contact-Us-Main-Heading">
                    Helping You is Our Priority Contact Us!
                </h1>
                <p className="Course-Contact-Us-Para">Your needs come first! Whether you have questions, need support, or want
                    to collaborate, we’re here to help. Reach out to us today!</p>
            </section>

            <section className="Contact-Us-Full-Form-Details">
                <div className="Contact-Us-Full-Form-Sections">
                    <div className="d-flex justify-content-center CU-Form-priority">
                        <form className="CU-Contact-Us-F-form" onSubmit={handleSubmit}>
                            <h2 className="Cu-Contact-Us-F-h">Leave a message</h2>
                            <div className="CU-Contact-Us-F-group">
                                <div className="CU-Contact-Us-F-box">
                                    <input type="text" name="name" className={`CU-Contact-Us-F-input ${errors.name ? 'input-field-error' : ''}`}
                                        placeholder="" value={formData.name} onChange={handleChange} />
                                    <label htmlFor="CU-Contact-Us-F-name" className="CU-Contact-Us-F-label">Name</label>
                                </div>
                                <div className="CU-Contact-Us-F-box">
                                    <PhoneInput
                                        international
                                        className={`CU-Contact-Us-F-input cu_register_phone ${errors.phone ? 'input-field-error' : ''}`}
                                        defaultCountry={defaultCountry}
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        placeholder="Phone Number*"
                                    />
                                    <label htmlFor="CU-Contact-Us-F-phone" className="CU-Contact-Us-F-label">Phone</label>
                                </div>
                            </div>

                            <div className="CU-Contact-Us-F-box">
                                <input type="email" name="email" className={`CU-Contact-Us-F-input ${errors.email ? 'input-field-error' : ''}`}
                                    placeholder="" value={formData.email} onChange={handleChange} />
                                <label htmlFor="CU-Contact-Us-F-email" className="CU-Contact-Us-F-label">Email</label>
                            </div>

                            <div className="CU-Contact-Us-F-box mb-2">
                                <textarea name="message" className={`CU-Contact-Us-F-textarea ${errors.message ? 'input-field-error' : ''}`}
                                    placeholder="" value={formData.message} onChange={handleChange}></textarea>
                                <label htmlFor="CU-Contact-Us-F-message" className="CU-Contact-Us-F-label CU-Contact-Us-F-messagelabel">Message</label>
                            </div>
                            <div className={`CU-Contact-Us-F-box mb-2 ${errors.captcha ? 'input-field-error' : ''}`}>
                                <SmartReCaptcha
                                    ref={captchaRef}
                                    siteKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
                                    onTokenChange={(token) => setCaptchaToken(token)}
                                    theme="light"
                                    size="normal"
                                />
                            </div>

                            <label className={`privacy-policy ${errors.privacy ? 'input-field-error' : ''}`}>
                                <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} />
                                I agree to the privacy policy
                            </label>

                            <div className="text-end">
                                <button type="submit" className="send-button" disabled={submitted}>Send Message</button>
                            </div>
                            {
                                submitted && !hasError && <div className="Cu-Contact-us-request-message">
                                    <img src="/images/contactus/Course-Contact-Us-tick-img.svg" alt="Contact-Us-Message-S" height="40" width="40" />
                                    <div className="ms-2">
                                        <p className="Cu-Contact-us-request-p">We’ve got your Query!!</p>
                                        <p className="Cu-Contact-us-request-sub-p">Our team will get back to you</p>
                                    </div>
                                </div>
                            }
                            {
                                submitted && hasError && <div className="Cu-Contact-us-request-message">
                                    <img src="/images/contactus/Course-Contact-Us-invalid-img.svg" alt="Contact-Us-Message-US" height="40" width="40" />
                                    <div className="ms-2">
                                        <p className="Cu-Contact-us-request-p">Submission failed.</p>
                                        <p className="Cu-Contact-us-request-sub-p">Check your details and try again.</p>
                                    </div>
                                </div>
                            }
                        </form>
                    </div>

                    <div className="CU-bright-form">
                        <h2 className="CU-bright-h">Get in Touch</h2>
                        <p className="CU-bright-p">Have questions about our online training or enrollment? Tech Leads IT is here
                            to help! Reach out for assistance anytime.</p>
                        <div className="CU-Contact-Us-cards">
                            <button className="CU-Contact-Us-card">
                                <img src="/images/contactus/Contact-Us-Call-icon.svg" height="60" width="60"
                                    alt="Contact-us-call-icon" />
                                <div>
                                    <p className="CU-card-para1">Phone</p>
                                    <p className="CU-card-para2"><a href="tel:+918125323232"  style={{textDecoration:"none"}}>+91 8125323232</a></p>
                                </div>
                            </button>
                            <button className="CU-Contact-Us-card">
                                <img src="/images/contactus/Email-Us-Ping-icon.svg" height="60" width="60"
                                    alt="Contact-us-email-icon" />
                                <div>
                                    <p className="CU-card-para1">Email</p>
                                    <p className="CU-card-para2"><a href="mailto:info@techleadsit.com">info@techleadsit.com</a></p>
                                </div>
                            </button>
                        </div>
                        <h2 className="CU-bright-Sub-h">Enrollment Assistance:</h2>
                        <p className="CU-bright-Sub-p">Our enrollment team is ready to assist you with questions related to
                            course offerings, enrollment procedures, or payment options.</p>
                        <div className="d-flex align-items-center justify-content-between">
                            <span className="CU-bright-span">Social media</span>
                            <div>
                                <img src="/images/contactus/Contact-Us-Insta-icon.svg" className="cursor-pointer me-1" height="40" width="40"
                                    alt="Contact-us-instagram-icon" onClick={() => window.open(socialLinks.instagram, "_blank", "noopener,noreferrer")} />
                                <img src="/images/contactus/Contact-Us-Li-icon.svg" className="cursor-pointer me-1" height="40" width="40"
                                    alt="Contact-us-linkedin-icon" onClick={() => window.open(socialLinks.linkedin, "_blank", "noopener,noreferrer")} />
                                <img src="/images/contactus/Contact-Us-Fb-icon.svg" className="cursor-pointer me-1" height="40" width="40"
                                    alt="Contact-us-facebook-icon" onClick={() => window.open(socialLinks.facebook, "_blank", "noopener,noreferrer")} />
                                <img src="/images/contactus/Contact-Us-Yt-icon.svg" className="cursor-pointer me-1" height="40" width="40"
                                    alt="Contact-us-youtube-icon" onClick={() => window.open(socialLinks.youtube, "_blank", "noopener,noreferrer")} />
                            </div>
                        </div>
                    </div>

                </div>
            </section>





            <section className="Course-Contact-Us-margin mt-5">
                <div className="Course-Contact-Map-Section">
                    <div className="map-container">
                        <iframe title="instituteAddress1"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1457.3289242683845!2d78.38912971234372!3d17.498183645336336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91b0d118c443%3A0xb98977e757a468ac!2sTech%20Leads%20IT%20Oracle%20Fusion%20Cloud%20SCM%2C%20HCM%2C%20Financials%2C%20Technical%2BOIC%20Trainings!5e0!3m2!1sen!2sin!4v1742638516643!5m2!1sen!2sin"
                            className="instituteAddressHW" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div>
                        <div>
                            <h2 className="Course-contact-us-O-h">Visit Our Office:</h2>
                            <p className="Course-contact-us-O-p">Get the best support visit our office for a face-to-face
                                assistance with our experienced
                                representatives!</p>
                        </div>
                        <div>
                            <h2 className="Course-contact-us-OA-h">Our Address</h2>
                            <h2 className="Course-contact-us-OA-h">Branch 1:</h2>
                            <p className="Course-contact-us-OA-p">4th Floor, Sridevi Nilayam, plot no 38, near Jntu Metro
                                Station, back side lane of Pista
                                house, Sardar Patel Nagar, IDPL Staff Cooperative Housing Society, Kukatpally Housing Board
                                Colony, Kukatpally, Hyderabad, Telangana 500085</p>
                        </div>
                    </div>
                </div>
                <div className="Course-Contact-Map-Section">
                    <div className="map-container">
                        <iframe title="instituteAddress2"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.375512099043!2d78.44506847377144!3d17.44173210124006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c697ed5291%3A0x59f4467641023735!2sTech%20Leads%20IT!5e0!3m2!1sen!2sin!4v1742636948538!5m2!1sen!2sin"
                            width="505" height="320" className="instituteAddressHW" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div>
                        <h2 className="Course-contact-us-OA-h">Our Address</h2>
                        <h2 className="Course-contact-us-OA-h">Branch 2:</h2>
                        <p className="Course-contact-us-OA-p">44/A, 302, Geetanjali Apartments, Near SR Nagar, SR Nagar Main Rd,
                            opp. Bahar Cafe, Hyderabad, Telangana 500038</p>
                    </div>
                </div>
            </section>

            <SubscribeSection currentBlogId="0" classes="Course-Contact-Us-margin"></SubscribeSection>


        </section>
    )
}

export default Contactus;