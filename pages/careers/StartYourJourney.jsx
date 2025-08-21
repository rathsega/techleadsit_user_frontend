import CourseRegistrationForm from "../../components/course/RegistrationForm";
import AlreadySubmitted from "../blog/details/already_submitted";
import { useState, useRef } from "react";
import { useExpiringLocalStorage } from "../../services/useExpiringLocalStorage";
const StartYourJourney = () => {
    const formRef = useRef(null);
    const overlayRef = useRef(null);

    const [formVisibility, setFormVisibility] = useState(false);
    const [formFields, setFormFields] = useState([]);
    const [heading, setHeading] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [detailsSubmitted, setDetailsSubmitted] = useState(false);
    const [formSuccessCallback, setFormSuccessCallback] = useState(null);

    const formConfigs = {
        "Start Your Journey": {
            fields: ["fullName", "email", "phone", "qualification", "message"],
            heading: "Start Your Journey",
            buttonLabel: "Register Now",
        }
    };

    const handleButtonClick = () => {
        if (formRef.current && overlayRef.current) {
            formRef.current.style.display = "block";
            overlayRef.current.style.display = "block";
        }
    };

    const hidePopupForm = () => {
        if (formRef.current && overlayRef.current) {
            formRef.current.style.display = "none";
            overlayRef.current.style.display = "none";
        }
    }

    const handleDetailsSubmitted = () => {
        setDetailsSubmitted(false);
    }

    const handleUserDetailsSubmissionStatus = (status) => {
        if (status) {
            setTimeout(() => { hidePopupForm() }, 3000)
        }
    };

    const openForm = (formType, onSuccessCallback) => {
        const config = formConfigs[formType];

        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

        const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
            "userDetails",
            null,
            endOfDay
        );

        // let userDetails = localStorage.getItem("userDetails");
        if (userDetails) {
            setDetailsSubmitted(true);
        } else {
            if (config) {
                setFormFields(config.fields);
                setHeading(config.heading);
                setButtonLabel(config.buttonLabel);
                setFormVisibility(true);
                handleButtonClick();
            }
            if (onSuccessCallback) {
                setFormSuccessCallback(() => onSuccessCallback);
            } else {
                setFormSuccessCallback(null); // or undefined
            }
        }

    };

    return (
        <>
            <section className="Main-Course-CP-FYNJ-CTA-banner">
                <div className="Main-Course-CP-FYNJ-CTA-banner-content">
                    <h1 className="Main-Course-CP-FYNJ-CTA-banner-h">Join India’s Most Trusted Oracle Trainings by Tech Leads IT</h1>
                    <p className="Main-Course-CP-FYNJ-CTA-banner-p">Master real-world Oracle skills with expert-led sessions, hands-on projects, and guaranteed placement support—designed to accelerate your ERP career. </p>
                    <button className="Main-Course-CP-FYNJ-CL-CTA-button" onClick={() => {
                        openForm("Start Your Journey");
                    }}>
                        <div className="Main-Course-CP-FYNJ-CL-CTA-button-dots_border"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="Main-Course-CP-FYNJ-CL-CTA-button-sparkle">
                            <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black" fill="black"
                                d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z">
                            </path>
                            <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black" fill="black"
                                d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z">
                            </path>
                            <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black" fill="black"
                                d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z">
                            </path>
                        </svg>
                        <span className="Main-Course-CP-FYNJ-CL-CTA-button-text_button" >Start Your Journey</span>
                    </button>
                </div>
                <div className="Main-Course-CP-FYNJ-CTA-img-section">
                    <img src="/images/careers/CP-FYNJ-Banner-CTA-Icon.svg" className="CP-FYNJ-Banner-CTA-Icon img-fluid" alt="Main-Course-CP-FYNJ-CTA-banner-img" width="210" height="180"
                        style={{ "color": "transparent", "maxWidth": "100%", "width": "auto", "height": "auto" }} />
                </div>
            </section>
            <div className="Main-Course-Overlay" ref={formRef} style={{ display: "none" }}></div>
            <CourseRegistrationForm
                overlayRef={overlayRef}
                visible={formVisibility}
                fields={formFields}
                heading={heading}
                buttonLabel={buttonLabel}
                hidePopupForm={hidePopupForm}
                pageName="home"
                onSuccess={(data) => {
                    //console.log("Success!", data);
                    handleUserDetailsSubmissionStatus(true);
                    if (formSuccessCallback) {
                        formSuccessCallback(data); // ← This must be triggered here
                        setFormSuccessCallback(null); // reset after call
                    }
                }}
            ></CourseRegistrationForm>
            {detailsSubmitted && <><div className="Main-Course-Overlay"></div><AlreadySubmitted handleDetailsSubmitted={handleDetailsSubmitted}></AlreadySubmitted></>}
        </>
    )
}

export default StartYourJourney;