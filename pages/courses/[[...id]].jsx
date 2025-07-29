import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Hero from "./Hero";
import BottomHero from "./BottomHero"
import MainSection from "./MainSection"
import PopupForm from "../blogs/PopupForm";
import CourseRegistrationForm from "../../components/course/RegistrationForm";
import AlreadySubmitted from "../blog/details/already_submitted";

const Courses = () => {
    const formRef = useRef(null);
    const overlayRef = useRef(null);

    const [formVisibility, setFormVisibility] = useState(false);
    const [formFields, setFormFields] = useState([]);
    const [heading, setHeading] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [detailsSubmitted, setDetailsSubmitted] = useState(false);
    const [formSuccessCallback, setFormSuccessCallback] = useState(null);
    const [userDetailsSubmitted, setUserDetailsSubmitted] = useState(false);

    const formConfigs = {
        "Request A Call Back": {
            fields: ["fullName", "email", "phone", "qualification", "message"],
            heading: "Request A Call Back",
            buttonLabel: "Request Now",
        },
        "Start Learning Now": {
            fields: ["fullName", "email", "phone", "qualification", "message"],
            heading: "Start Learning Now",
            buttonLabel: "Register Now",
        },
        "Join The Course": {
            fields: ["fullName", "email", "phone", "qualification", "message"],
            heading: "Join The Course",
            buttonLabel: "Join Now",
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

        let userDetails = localStorage.getItem("userDetails");
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

    const router = useRouter();
    const { id } = router.query;

    return (
        <section className="Course-All-Category-Section">
            <Hero openForm={openForm}></Hero>
            <MainSection openForm={openForm}></MainSection>
            <BottomHero openForm={openForm}></BottomHero>
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
        </section>
    )
}

export default Courses;