import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Hero from "./course_demo/Hero";
import UpCominDemoSession from './course_demo/UpComingDemoSession'
import KeyBenefits from './course_demo/KeyBenefits'
import SocialRatings from './course_demo/SocialRatings'
import CourseOverView from './course_demo/CourseOverview'
import WhoCanAttend from './course_demo/WhoCanAttend'
import PricingPlans from './course_demo/PricingPlans'
import UpcomingFreeDemoClass from './course_demo/UpcomingFreeDemoClass'
import CourseDemoTestimonials from "./course_demo/CourseDemoTestimonials";
import Alumni from "./course_demo/Alumni";
import RegisterForFreeDemoSession from "./course_demo/RegisterForFreeDemoSession";
import PopupForm from "./course_demo/PopupForm";
import DemoAgenda from "./course_demo/DemoAgenda"
import Faqs from "./course_demo/Faqs";
import GetInTouch from './course_demo/GetInTouch'
import Footer from './course_demo/Footer'
import LimitedSeats from "./course_demo/LimitedSeats";
import httpService from "./../services/httpService";
import Seo from "./Seo";
import { useExpiringLocalStorage } from "../services/useExpiringLocalStorage";

function convertWebinarDateFormat(date) {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 10) + 'T' + newDate.toTimeString().slice(0, 5);
}

const CourseDemo = ({ props }) => {
    const [demoDetails, setDemoDetails] = useState({ hero: {}, alumni: {}, courseOverview: {}, createdAt: "", demoAgenda: {}, keyBenefits: {}, pricing: [], upcomingDemoSession: {}, whoCanAttend: {}, testimonials: [], faqs: {}, status: '', updatedAt: '' });
    const { id } = useParams();
    const [showPopupform, setShowPopupform] = useState(false)
    const [popupProps, setPopupProps] = useState({ title: "", buttonName: "" })
    const [userDetailsSubmitted, setUserDetailsSubmitted] = useState(() => {
        if (typeof window !== "undefined") {
            return !!localStorage.getItem('userDetails');
        }
        return false;
    });

    const handlePopupFormProps = (newProps) => {
        setPopupProps(newProps);
    }

    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
        "userDetails",
        null,
        endOfDay
    );

    useEffect(() => {
        const fetchCourseDemoDetails = async () => {
            try {
                const response = await httpService.get('demo/getDemoById/' + id);
                if (response && response.data) {
                    response.data.demo.upcomingDemoSession.dateTime = convertWebinarDateFormat(response.data.demo.upcomingDemoSession.dateTime)
                    setDemoDetails(response.data.demo); // Set formatted webinars data// Assuming the data is under response.data
                } else {
                    console.error('No data received from the API');
                }
            } catch (error) {
                console.error('Error fetching webinars:', error);
            }
        };

        // const userDetails = localStorage.getItem('userDetails');

        if (userDetails) {
            try {
                const parsedDetails = JSON.parse(userDetails);

                if (parsedDetails && Object.keys(parsedDetails).length > 0) {
                    setUserDetailsSubmitted(true);
                } else {
                    console.warn("userDetails is empty or invalid.");
                    setUserDetailsSubmitted(false);
                }
            } catch (error) {
                console.error("Invalid JSON in localStorage userDetails:", error);
                setUserDetailsSubmitted(false);
            }
        } else {
            setUserDetailsSubmitted(false);
        }


        fetchCourseDemoDetails();
    }, [])

    const handleUserDetailsSubmissionStatus = (status) => {
        setUserDetailsSubmitted(status);
    }
    const handlePopupformVisibility = () => {
        setShowPopupform(!showPopupform);
    }

    const downloadBase64File = (fileSrc, fileName) => {
        if (!fileSrc?.data || !fileSrc?.type || !fileName) {
            console.error("Invalid file source");
            return;
        }

        // Create a Blob from Base64 data
        const byteCharacters = atob(fileSrc.data); // Decode base64
        const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: fileSrc.type });

        // Create a download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    const downloadCurriculum = async () => {
        try {
            const response = await await httpService.post('fileupload/fetchFile', { filePath: demoDetails?.demoAgenda?.curriculum?.path });
            const blobData = response.data;
            if (blobData.data) {
                // downloadBase64File(`data:${blobData.type};base64,${blobData.data}`);
                downloadBase64File(blobData, demoDetails?.demoAgenda?.curriculum?.name);
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    }

    return (
        <>
            <Seo details={demoDetails?.seo}></Seo>
            <div className="demo_body">
                <Hero details={demoDetails.hero} courseTitle={demoDetails.upcomingDemoSession.courseTitle} curriculum={demoDetails.demoAgenda.curriculum} handlePopupformVisibility={handlePopupformVisibility} handlePopupFormProps={handlePopupFormProps} downloadCurriculum={downloadCurriculum} userDetailsSubmitted={userDetailsSubmitted} handleUserDetailsSubmissionStatus={handleUserDetailsSubmissionStatus}></Hero>
                {demoDetails.upcomingDemoSession && <UpCominDemoSession details={demoDetails.upcomingDemoSession}></UpCominDemoSession>}
                <KeyBenefits details={demoDetails.keyBenefits}></KeyBenefits>
                <SocialRatings></SocialRatings>
                <CourseOverView details={demoDetails.courseOverview} downloadCurriculum={downloadCurriculum} userDetailsSubmitted={userDetailsSubmitted} handleUserDetailsSubmissionStatus={handleUserDetailsSubmissionStatus} handlePopupformVisibility={handlePopupformVisibility} handlePopupFormProps={handlePopupFormProps}></CourseOverView>
                <WhoCanAttend details={demoDetails.whoCanAttend}></WhoCanAttend>
                <PricingPlans details={demoDetails.pricing} handlePopupformVisibility={handlePopupformVisibility} handlePopupFormProps={handlePopupFormProps}></PricingPlans>
                <UpcomingFreeDemoClass details={demoDetails.upcomingDemoSession} handlePopupformVisibility={handlePopupformVisibility} handlePopupFormProps={handlePopupFormProps}></UpcomingFreeDemoClass>
                <CourseDemoTestimonials details={demoDetails.testimonials}></CourseDemoTestimonials>
                <Alumni details={demoDetails.alumni}></Alumni>
                <RegisterForFreeDemoSession handlePopupformVisibility={handlePopupformVisibility} handlePopupFormProps={handlePopupFormProps}></RegisterForFreeDemoSession>
                <DemoAgenda details={demoDetails.demoAgenda} handlePopupformVisibility={handlePopupformVisibility} handlePopupFormProps={handlePopupFormProps}></DemoAgenda>
                <LimitedSeats details={demoDetails.upcomingDemoSession} handlePopupformVisibility={handlePopupformVisibility} handlePopupFormProps={handlePopupFormProps}></LimitedSeats>
                <Faqs details={demoDetails.faq}></Faqs>
                <GetInTouch></GetInTouch>
                <Footer></Footer>
                {showPopupform && <PopupForm handlePopupformVisibility={handlePopupformVisibility} popupProps={popupProps} handleUserDetailsSubmissionStatus={handleUserDetailsSubmissionStatus}></PopupForm>}
            </div>
        </>

    );
}

export default CourseDemo;