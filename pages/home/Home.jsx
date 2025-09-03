import { useState, useRef, useEffect } from "react";
import React from "react";
import dynamic from "next/dynamic";

// Lazy load heavy or below-the-fold components
const BecomeAnInstructor = dynamic(() => import("./BecomeAnInstructor"), { ssr: false });
const DifferentFromOthers = dynamic(() => import("./DifferentFromOthers"), { ssr: false });
const Faq = dynamic(() => import("./Faq"), { ssr: false });
const FirstStep = dynamic(() => import("./FirstStep"), { ssr: false });
const GetInTouch = dynamic(() => import("./GetInTouch"), { ssr: false });
const Hero = dynamic(() => import("./Hero"));
const HiringPartners = dynamic(() => import("./HiringPartners"), { ssr: false });
const PathToSuccess = dynamic(() => import("./PathToSuccess"), { ssr: false });
const RelatedBlogs = dynamic(() => import("./RelatedBlogs"), { ssr: false });
const Subscribe = dynamic(() => import("./Subscribe"), { ssr: false });
const SuccessStories = dynamic(() => import("./SuccessStories"), { ssr: false });
const Testimonials = dynamic(() => import("./Testimonials"), { ssr: false });
const CourseRegistrationForm = dynamic(() => import("./../../components/course/RegistrationForm"), { ssr: false });
const AlreadySubmitted = dynamic(() => import("../blog/details/already_submitted"), { ssr: false });
const HeaderStrip = dynamic(() => import("./HeaderStrip"));
import Seo from "../Seo";
import { useExpiringLocalStorage } from "../../services/useExpiringLocalStorage";

const Home = () => {

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

    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
        "userDetails",
        null,
        endOfDay
    );

    const openForm = (formType, onSuccessCallback) => {
        const config = formConfigs[formType];

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

    const seoDetails = {
        metaTitle: "Top Oracle Fusion Training Institute | Tech Leads IT",
        metaDescription: "Join India’s Leading Oracle Fusion Training Institute. Get Real-Time Projects, Certified Trainers & 100% Placement Support. Enroll Now!",
        metaKeywords: "oracle fusion scm training, Oracle Fusion HCM Online Training, Oracle Fusion Financials Training, Oracle Cloud Training, oracle fusion technical training, Oracle Fusion Online Training",
        canonical: "https://www.maincourse.com/home",
        ogImage: {
            path: "/images/TLITLogoIcon.png"
        },
        home:true
    }

    return (
        <>
            <Seo details={seoDetails}></Seo>
            <section className="Home-Page-MC-Prop">
                <HeaderStrip></HeaderStrip>
                <Hero></Hero>
                <PathToSuccess openForm={openForm}></PathToSuccess>
                <section className="Main-Course-Home-Page-Section">
                    <FirstStep openForm={openForm}></FirstStep>
                    <Testimonials></Testimonials>
                    <DifferentFromOthers></DifferentFromOthers>
                    <BecomeAnInstructor></BecomeAnInstructor>
                </section>

                <HiringPartners></HiringPartners>
                <section className="Main-Course-Home-Page-Section">
                    <SuccessStories></SuccessStories>
                    <RelatedBlogs></RelatedBlogs>
                    <Subscribe></Subscribe>
                    <GetInTouch></GetInTouch>
                    <Faq></Faq>
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
                {/* <FooterStrip></FooterStrip> */}

            </section>
        </>
    )
}

export default Home;