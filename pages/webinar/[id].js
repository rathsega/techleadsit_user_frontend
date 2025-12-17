import { useState, useEffect } from 'react'
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
import { useExpiringLocalStorage } from '../../services/useExpiringLocalStorage'
import { useRouter } from "next/router";
import { useLoader } from '../../contexts/LoaderContext'
import httpService from '../../services/httpService'
import useLmsStore from '../../store/lmsStore'

function Webinar() {

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

    const setPopupFormProps = useLmsStore((state) => state.setPopupFormProps);

    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
        "userDetails",
        null,
        endOfDay
    );

    const openQuickPayment = () => {
        // Logic to open quick payment modal
    }

    const handleCTA = (action) => {
        if(action == 'payment'){
            openQuickPayment();
            return true;
        }
        const config = formConfigs[action];
        // let userDetails = localStorage.getItem("userDetails");
        if (userDetails) {
            setPopupFormProps({ visible: false, alreadySubmitted: true });
        } else {
            if (config) {
                setPopupFormProps({
                    visible: true,
                    alreadySubmitted: false,
                    fields: config.fields,
                    heading: config.heading,
                    buttonLabel: config.buttonLabel,
                    pageName: "Webinar - " + title,
                    courseSlug: slug,
                });
            }
        }

    };

    const router = useRouter();
    const { id } = router.query;
    const { setLoading } = useLoader();
    const [webinarDetails, setWebinarDetails] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            const response = httpService.get(`/webinar/getWebinarById/${id}/endUser`);
            response.then((data) => {
                setLoading(false);
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
           
        </div>
    )
}

export default Webinar
