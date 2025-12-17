import { useRouter } from "next/router";
import Hero from "./Hero";
import BottomHero from "./BottomHero"
import MainSection from "./MainSection"
import { useExpiringLocalStorage } from "../../services/useExpiringLocalStorage";
import useLmsStore from "../../store/lmsStore";

const Courses = () => {

    const setPopupFormProps = useLmsStore((state) => state.setPopupFormProps);

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
                    pageName: "Courses Page",
                    onSuccess: onSuccessCallback,
                });
            }
        }

    };

    const router = useRouter();

    return (
        <section className="Course-All-Category-Section">
            <Hero openForm={openForm}></Hero>
            <MainSection openForm={openForm}></MainSection>
            <BottomHero openForm={openForm}></BottomHero>
        </section>
    )
}

export default Courses;