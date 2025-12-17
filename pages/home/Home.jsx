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
const HeaderStrip = dynamic(() => import("./HeaderStrip"));
import Seo from "../../components/Seo";
import { useExpiringLocalStorage } from "../../services/useExpiringLocalStorage";
import useLmsStore from "../../store/lmsStore";

const Home = () => {

    const setPopupFormProps = useLmsStore((state) => state.setPopupFormProps);

    const formConfigs = {
        "Start Your Journey": {
            fields: ["fullName", "email", "phone", "qualification", "message"],
            heading: "Start Your Journey",
            buttonLabel: "Register Now",
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
        // Double-check localStorage directly as well
        const currentUserDetails = userDetails || localStorage.getItem("userDetails");
        if (currentUserDetails) {
            setPopupFormProps({ visible: false, alreadySubmitted: true });
        } else {
            if (config) {
                setPopupFormProps({
                    visible: true,
                    alreadySubmitted: false,
                    fields: config.fields,
                    heading: config.heading,
                    buttonLabel: config.buttonLabel,
                    pageName: "Home Page",
                    onSuccess: onSuccessCallback,
                });
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
            </section>
        </>
    )
}

export default Home;
