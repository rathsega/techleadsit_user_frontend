import React, { useState, useRef, useEffect } from 'react'
import Hero from './../../components/webinar/Hero/Hero'
import TrustedCompanies from './../../components/webinar/TrustedCompanies/TrustedCompanies'
import AboutWebinar from './../../components/webinar/AboutWebinar/AboutWebinar'
import WhyAttend from './../../components/webinar/WhyAttend/WhyAttend'
import WhoCanAttend from './../../components/webinar/WhoCanAttend/WhoCanAttend'
import Testimonials from './../../components/webinar/Testimonials/Testimonials'
import LearningTopics from './../../components/webinar/LearningTopics/LearningTopics'
import FAQ from './../../components/webinar/FAQ/FAQ'
import CTA from './../../components/webinar/CTA/CTA'
import WebinarCTA from './../../components/webinar/WebinarCTA/WebinarCTA'
import WebinarReveal from './../../components/webinar/Webinar-Reveal'
import CourseRegistrationForm from '../../components/course/RegistrationForm'
import AlreadySubmitted from '../blog/details/already_submitted'
import { useExpiringLocalStorage } from '../../services/useExpiringLocalStorage'
import { useRouter } from "next/router";
import { useLoader } from '../../contexts/LoaderContext'
import httpService from '../../services/httpService'

function Webinar() {

    const overlayRef = useRef(null);
    const formConfigs = {
        "Join the Webinar": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Join the Free Webinar",
            buttonLabel: "Register Now",
        },
        "Contact Us": {
            fields: ["fullName", "email", "phone"],
            heading: "Contact Us",
            buttonLabel: "Submit",
        },
        "Register Now": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Registration Form",
            buttonLabel: "Register Now",
        }
    };

    const [formFields, setFormFields] = useState([]);
    const [heading, setHeading] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [formVisibility, setFormVisibility] = useState(false);
    const [formSuccessCallback, setFormSuccessCallback] = useState(null);
    const [detailsSubmitted, setDetailsSubmitted] = useState(false);

    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
        "userDetails",
        null,
        endOfDay
    );

    const handleDetailsSubmitted = () => {
        setDetailsSubmitted(false);
    }
    const hidePopupForm = () => {
        setFormVisibility(false)
    }

    const openQuickPayment = () => {
        // Logic to open quick payment modal
    }

    const handleCTA = (action) => {
        if(action == 'payment'){
            openQuickPayment();
            return true;
        }
        const config = formConfigs[action];
        console.log(action, config);
        // let userDetails = localStorage.getItem("userDetails");
        if (userDetails) {
            setDetailsSubmitted(true);
        } else {
            if (config) {
                setFormFields(config.fields);
                setHeading(config.heading);
                setButtonLabel(config.buttonLabel);
                setFormVisibility(true);
            }
        }

    };

    const handleUserDetailsSubmissionStatus = (status) => {
        if (status) {
            setTimeout(() => { hidePopupForm() }, 3000)
        }
    };

    const router = useRouter();
    const { id } = router.query;
    const { setLoading } = useLoader();
    const [webinarDetails, setWebinarDetails] = useState(null);

    useEffect(() => {
        if (id) {
            // Fetch webinar details using the id
            setLoading(true);
            const response = httpService.get(`/webinar/getWebinarById/${id}`);
            response.then((data) => {
                // Handle the webinar details
                setLoading(false);
                console.log(data);
                setWebinarDetails(data?.data?.webinar);
            }).catch((error) => {
                console.error("Error fetching webinar details:", error);
                setLoading(false);
            });
        }
    }, [id]);

    const webinarTitle = "Join the Free Webinar";

    return (
        <div className="WebinarApp">
            {/* <Header /> */}
            <main>
                <Hero onCTA={handleCTA} details={webinarDetails?.hero} mentorDetails={webinarDetails?.aboutMentor} />
                <TrustedCompanies />
                <AboutWebinar webinarTitle={webinarTitle} webinarId={id} details={webinarDetails?.aboutWebinar} />
                <WhyAttend />
                <WhoCanAttend />
                <LearningTopics onCTA={handleCTA} details={webinarDetails?.whatYouWillLearn} paid={webinarDetails?.hero?.paid} />
                <Testimonials details={webinarDetails?.testimonials} />
                <WebinarCTA onCTA={handleCTA} />
                <WebinarReveal />
                <FAQ details={webinarDetails?.faqs} />
                <CTA onCTA={handleCTA} />
            </main>
            {formVisibility && <><div className="Main-Course-Overlay"></div><CourseRegistrationForm
                overlayRef={overlayRef}
                visible={formVisibility}
                fields={formFields}
                heading={heading}
                buttonLabel={buttonLabel}
                hidePopupForm={hidePopupForm}
                pageName="webinar"
                courseTitle="Oracle Fusion SCM"
                onSuccess={(data) => {
                    //console.log("Success!", data);
                    handleUserDetailsSubmissionStatus(true);
                    if (formSuccessCallback) {
                        formSuccessCallback(data); // ← This must be triggered here
                        setFormSuccessCallback(null); // reset after call
                    }
                }}
            /></>}
            {detailsSubmitted && <><div className="Main-Course-Overlay"></div><AlreadySubmitted handleDetailsSubmitted={handleDetailsSubmitted} /></>}

        </div>
    )
}

export default Webinar
