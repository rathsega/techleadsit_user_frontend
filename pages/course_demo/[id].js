import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Hero from "./Hero";
import UpCominDemoSession from "./UpComingDemoSession";
import KeyBenefits from "./KeyBenefits";
import SocialRatings from "./SocialRatings";
import CourseOverView from "./CourseOverview";
import WhoCanAttend from "./WhoCanAttend";
import PricingPlans from "./PricingPlans";
import UpcomingFreeDemoClass from "./UpcomingFreeDemoClass";
import Alumni from "./Alumni";
import RegisterForFreeDemoSession from "./RegisterForFreeDemoSession";
import DemoAgenda from "./DemoAgenda";
import Faqs from "./Faqs";
import GetInTouch from "./GetInTouch";
import LimitedSeats from "./LimitedSeats";
import httpService from "../../services/httpService";
import Seo from "../Seo";
import InstructorTestimonials from "../../components/course/instructor_testimonials";
import CourseRegistrationForm from "../../components/course/RegistrationForm";
import AlreadySubmitted from "../blog/details/already_submitted";
import { useExpiringLocalStorage } from "../../services/useExpiringLocalStorage";
function convertWebinarDateFormat(date) {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 10) + "T" + newDate.toTimeString().slice(0, 5);
}

const CourseDemo = ({ initialDemoDetails }) => {
    const [demoDetails, setDemoDetails] = useState(initialDemoDetails);
    const router = useRouter();
    const { id } = router.query;

    const [showPopupform, setShowPopupform] = useState(false);
    const [popupProps, setPopupProps] = useState({ title: "", buttonName: "" });
    const [userDetailsSubmitted, setUserDetailsSubmitted] = useState(false);

    const handlePopupFormProps = (newProps) => {
        setPopupProps(newProps);
    };

    useEffect(() => {
        if (!id) return; // Prevent API call with undefined id

        const fetchCourseDemoDetails = async () => {
            try {
                const response = await httpService.get(`demo/getDemoById/${id}`);
                if (response?.data?.demo) {
                    response.data.demo.upcomingDemoSession.dateTime = convertWebinarDateFormat(
                        response.data.demo.upcomingDemoSession.dateTime
                    );
                    setDemoDetails(response.data.demo);
                }
            } catch (error) {
                console.error("Error fetching webinars:", error);
            }
        };

        fetchCourseDemoDetails();
    }, [id]);

    useEffect(() => {
        if (typeof window === "undefined") return; // Avoid server-side execution

        // const userDetails = localStorage.getItem("userDetails");
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

        const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
            "userDetails",
            null,
            endOfDay
        );
        if (userDetails) {
            try {
                const parsedDetails = JSON.parse(userDetails);
                setUserDetailsSubmitted(Object.keys(parsedDetails).length > 0);
            } catch (error) {
                console.error("Invalid JSON in localStorage userDetails:", error);
                setUserDetailsSubmitted(false);
            }
        } else {
            setUserDetailsSubmitted(false);
        }
    }, []);

    const handleUserDetailsSubmissionStatus = (status) => {
        setUserDetailsSubmitted(status);
    };

    const handlePopupformVisibility = () => {
        setShowPopupform((prev) => !prev);
    };

    const downloadBase64File = (fileSrc, fileName) => {
        if (!fileSrc?.data || !fileSrc?.type || !fileName) {
            console.error("Invalid file source");
            return;
        }

        const byteCharacters = atob(fileSrc.data);
        const byteNumbers = Array.from(byteCharacters, (c) => c.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: fileSrc.type });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(link.href), 1000); // Cleanup
    };

    const downloadCurriculum = async () => {
        try {
            const response = await httpService.post("fileupload/fetchFile", {
                filePath: demoDetails?.demoAgenda?.curriculum?.path,
            });
            const blobData = response.data;
            if (blobData.data) {
                downloadBase64File(blobData, demoDetails?.demoAgenda?.curriculum?.name);
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };


    const formRef = useRef(null);
    const overlayRef = useRef(null);

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

    const [formVisibility, setFormVisibility] = useState(false);
    const [formFields, setFormFields] = useState([]);
    const [heading, setHeading] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [formSuccessCallback, setFormSuccessCallback] = useState(null);

    const formConfigs = {
        "Register For Free Demo": {
            fields: ["fullName", "email", "phone", "demoDate", "qualification"],
            heading: "Register For Free Demo",
            buttonLabel: "Register Now",
        },
        "Download Course Curriculum": {
            fields: ["fullName", "email", "phone"],
            heading: "Download A Course Curriculum",
            buttonLabel: "Submit",
        },
        "Buy Now": {
            fields: ["fullName", "email", "phone"],
            heading: "Buy Now",
            buttonLabel: "Submit",
        },
        "Book A Call": {
            fields: ["fullName", "email", "phone"],
            heading: "Book A Call",
            buttonLabel: "Submit",
        },
        "Kick Start Your Journey": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Kick Start Your Journey",
            buttonLabel: "Register Now",
        },
        "Request a call back": {
            fields: ["fullName", "email", "phone"],
            heading: "Request A Call Back",
            buttonLabel: "Submit",
        },
        "Start Your Free Demo Now": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Start Your Free Demo Now",
            buttonLabel: "Register Now",
        },
        "Try Before You Enrol": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Try Before You Enrol",
            buttonLabel: "Submit",
        }
    };


    const [detailsSubmitted, setDetailsSubmitted] = useState(false);
    const handleDetailsSubmitted = () => {
        setDetailsSubmitted(false);
    }
    const openForm = (formType, onSuccessCallback) => {
        const config = formConfigs[formType];

        // let userDetails = localStorage.getItem("userDetails");
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

        const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
            "userDetails",
            null,
            endOfDay
        );
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
            <Seo details={demoDetails?.seo} />
            <div className="demo_body">
                <Hero
                    details={demoDetails.hero}
                    courseTitle={demoDetails.upcomingDemoSession.courseTitle}
                    curriculum={demoDetails.demoAgenda.curriculum}
                    openForm={openForm}
                    downloadCurriculum={downloadCurriculum}
                    userDetailsSubmitted={userDetailsSubmitted}
                />
                {demoDetails.upcomingDemoSession && <UpCominDemoSession details={demoDetails.upcomingDemoSession} />}
                <KeyBenefits details={demoDetails.keyBenefits} />
                <SocialRatings />
                <CourseOverView
                    details={demoDetails.courseOverview}
                    openForm={openForm}
                    downloadCurriculum={downloadCurriculum}
                    userDetailsSubmitted={userDetailsSubmitted}
                />
                <WhoCanAttend details={demoDetails.whoCanAttend} />
                <PricingPlans
                    details={demoDetails.pricing}
                    openForm={openForm}
                />
                <UpcomingFreeDemoClass
                    details={demoDetails.upcomingDemoSession}
                    openForm={openForm}
                />
                {/* <CourseDemoTestimonials details={demoDetails.testimonials} /> */}
                <InstructorTestimonials data={demoDetails.testimonials}></InstructorTestimonials>
                <Alumni details={demoDetails.alumni} />
                <RegisterForFreeDemoSession
                    openForm={openForm}
                />
                <DemoAgenda details={demoDetails.demoAgenda} openForm={openForm} />
                <LimitedSeats details={demoDetails.upcomingDemoSession} openForm={openForm} />
                <Faqs details={demoDetails.faq} />
                <GetInTouch />
                {/* <Footer /> */}
                {/* {showPopupform && <PopupForm handlePopupformVisibility={handlePopupformVisibility} popupProps={popupProps} handleUserDetailsSubmissionStatus={handleUserDetailsSubmissionStatus} />} */}
                <div className="Main-Course-Overlay" ref={formRef} style={{ display: "none" }}></div>
                <CourseRegistrationForm
                    overlayRef={overlayRef}
                    visible={formVisibility}
                    fields={formFields}
                    heading={heading}
                    buttonLabel={buttonLabel}
                    hidePopupForm={hidePopupForm}
                    pageName="course_demo"
                    courseTitle={demoDetails.upcomingDemoSession.courseTitle}
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
            </div>
        </>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    let demoDetails = {};

    try {
        const response = await httpService.get(`demo/getDemoById/${id}`);
        if (response?.data?.demo) {
            response.data.demo.upcomingDemoSession.dateTime = convertWebinarDateFormat(response.data.demo.upcomingDemoSession.dateTime);
            demoDetails = response.data.demo;
        }
    } catch (error) {
        console.error("Error fetching webinars:", error);
    }

    return {
        props: { initialDemoDetails: demoDetails },
    };
}

export default CourseDemo;
