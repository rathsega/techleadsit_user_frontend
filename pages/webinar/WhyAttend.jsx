import WhyAttendCard from './WhyAttendCard'
import { useEffect, useState, useRef } from 'react'
import httpService from '../../services/httpService'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import classNames from 'classnames';
import { isValidPhoneNumber } from "libphonenumber-js";
import SmartReCaptcha from "../captcha/SmartReCaptcha";
import { useRouter } from 'next/router';
import { useLoader } from "../../contexts/LoaderContext";

const WhyAttend = ({ details, id }) => {
    const router = useRouter();
    const queryParams = new URLSearchParams(router.asPath.search);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [iconSrc, setIconSrc] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        qualification: "",
        reason: "",
        userType: "",  // Initialize with state value
        source: queryParams.get("source") ?? "Own",
        page: "webinar",
        pageId: id,
    });

    const [errors, setErrors] = useState({});
      const [captchaKey, setCaptchaKey] = useState(0);
    const captchaRef = useRef();
    const [formStatus, setFormStatus] = useState("pending")
    const { setLoading } = useLoader();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handlePhoneChange = (value) => {
        setFormData((prev) => ({ ...prev, phone: value }));
        setErrors((prev) => ({ ...prev, phone: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid Email';
        if (!formData.userType) newErrors.userType = 'Profession is required';
        if (!formData.phone) newErrors.phone = 'Phone Number is required';
        if (formData.phone && (!formData.phone || !isValidPhoneNumber(formData.phone))) newErrors.phone = 'Phone Number is invalid';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        //console.log('Form Data:', formData);
        if (!captchaToken) {
            alert('Please complete the CAPTCHA');
            return;
        }

        try {
            setLoading(true)
            const response = await httpService.post("/contactus/submitForm", { ...formData, token: captchaToken });
            captchaRef.current?.resetCaptcha(); // Reset after success
            setCaptchaToken('');
            setCaptchaKey(prev => prev + 1);
            // Check for 2xx status
            if (response.status >= 200 && response.status < 300) {
                setLoading(false)
                setFormStatus("success");
                //console.log("Form submitted successfully:", formData);
            } else {
                setLoading(false)
                setFormStatus("fail");
                console.warn("Unexpected response status:", response.status);
            }
            enableSubmitButton();
        } catch (error) {
            setLoading(false)
            setFormStatus("fail");
            enableSubmitButton();

            // Safely check for response data
            if (error.response) {
                console.error("API returned an error:", error.response.data);
                console.error("Status:", error.response.status);
            } else if (error.request) {
                console.error("No response received from the server:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
        }

    };

    const enableSubmitButton = () => {
        setTimeout(() => { setFormStatus("pending") }, 3000)
    }

    useEffect(() => {
        const fetchWhyAttendIcons = async () => {
            try {
                // Extract the file paths from details
                const icons = details?.map(detail => detail.icon.path);
                //console.log(icons);

                // Make the API call
                const response = await httpService.post('fileupload/fetchFiles', { filePaths: icons });

                if (response.data) {
                    // Map the response to base64 image sources
                    const newIconSrcs = response.data.map(
                        fileSrc => `data:${fileSrc.type};base64,${fileSrc.data}`
                    );

                    // Update the state with all new icons at once
                    setIconSrc(prevIconSrc => [...prevIconSrc, ...newIconSrcs]);
                } else {
                    console.error('No data received from the API');
                }
            } catch (error) {
                console.error('Error fetching icons:', error);
            }
        };

        //fetchWhyAttendIcons();
    }, [details])
    return (<section className="C-Webinar-Page-services" id="WhyJoin">
        <div className="C-Webinar-Page-sub-services">
            <div>
                <h1 className='C-Webinar-Page-why-attend-h'>Why Attend This
                    Webinar?</h1>
                {<div className="C-Webinar-Page-sub-service-1">
                    {details?.map((card, index) => (
                        <WhyAttendCard
                            key={index}
                            imgSrc={process.env.NEXT_PUBLIC_FILES_URL + card?.icon?.path}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                </div>}
            </div>
            {/* <div className="col-xl-1 ext"></div> */}
            <div id='register-form'>
                <div className="C-Webinar-Page-form-register">
                    <h1 className="C-Webinar-Page-registration-form-h">Registration Form</h1>
                    <h3 style={{ "color": "grey", "fontWeight": "400", "fontSize": "1.1rem" }}>Don’t Miss This Opportunity to Learn from
                        Industry Experts!</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="C-Webinar-Page-form-group">
                            <label htmlFor="fullName"></label>
                            <input
                                type="text"
                                className={classNames('form-control', { 'C-Webinar-input-field-error': errors.fullName })}
                                id="fullName"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="C-Webinar-Page-form-group">
                            <label htmlFor="email"></label>
                            <input
                                type="email"
                                className={classNames('form-control', { 'C-Webinar-input-field-error': errors.email })}
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="C-Webinar-Page-form-group">
                            <label htmlFor="phone"></label>
                            <PhoneInput
                                defaultCountry="IN"
                                className={` ${errors.phone ? "input-field C-Webinar-phone-input form-control C-Webinar-input-field-error" : "input-field form-control C-Webinar-phone-input"}`}
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                placeholder="Phone Number"
                            />
                        </div>

                        <div className="C-Webinar-Page-form-group mb-3 mt-4">
                            <select
                                className={classNames('form-select C-Webinar-Page-Webinar-Profession-DropDown', { 'form-select C-Webinar-Page-Webinar-Profession-DropDown C-Webinar-input-field-error': errors.userType })}
                                name="userType"
                                // onChange={(e) => {setFormData({ ...formData, userType: e.target.value }); validate(); /*e.target.value && delete errors?.userType;*/ }}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select your profession
                                </option>
                                <option value="student">Student</option>
                                <option value="it">IT Professional</option>
                                <option value="domain">Domain Experience</option>
                            </select>
                        </div>
                        <div className="C-Webinar-Page-form-group">
                            <label htmlFor="captcha"></label>
                            <SmartReCaptcha
                                ref={captchaRef}
                                siteKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
                                onTokenChange={(token) => setCaptchaToken(token)}
                                theme="light"
                                size="normal"
                            />
                        </div>

                        {formStatus == 'success' && <div className="C-Webinar-Page-registered-message">
                            <img src="/images/Register-Now-Sub-Success-Img.svg" height="50" width="50" className='Register-Now-Submit-message-Icon' alt="Register-Now-Sub-Success-Img" />
                            <div className="ms-2">
                                <p className="C-Webinar-Page-registered-p">You're registered!!</p>
                                <p className="C-Webinar-Page-registered-p">Check your email for details</p>
                            </div>
                        </div>}
                        {formStatus == 'fail' && <div className="C-Webinar-Page-registered-message">
                            <img src="/images/Register-Now-Sub-Failed-Img.svg" height="50" width="50" className='Register-Now-Submit-message-Icon' alt="Register-Now-Sub-Failed-Img" />
                            <div className="ms-2">
                                <p className="C-Webinar-Page-registered-p">Submission failed. </p>
                                <p className="C-Webinar-Page-registered-p">Check your details and try again.</p>
                            </div>
                        </div>}

                        {formStatus == 'pending' && <div className="text-end">
                            <button type="submit" className="C-Webinar-Page-register-button">
                                Register Now
                            </button>
                        </div>}
                    </form>
                </div>
            </div>
        </div>
    </section>)
}

export default WhyAttend;