import React, { useRef, useEffect, useState, useCallback } from 'react';
import Faqs from '../../components/course/faqs';
import Hero from '../../components/course/hero';
import CourseOverviewToolsAndModules from '../../components/course/course_overview_tool_modules';
import IsthisCourseRightForYou from '../../components/course/course_overview_is_this_course_right_for_you';
import UpcomingDemoSession from '../../components/course/course_overview_upcoming_demo_session';
import StickyNav from '../../components/course/sticky_nav';
import MobileStickyNav from '../../components/course/mobile_sticky_nav';
import Curriculum from '../../components/course/curriculum';
import InstructorDetails from '../../components/course/instructor_details';
import PricingPlans from '../../components/course/learning_options_pricing_plans';
import PlacementPathSteps from '../../components/course/placement_path_steps';
import ComapniesWaitngForYou from '../../components/course/placement_path_companies_waiting_for_you';
import TopCertifications from '../../components/course/top_certifications';
import CourseRegistrationForm from '../../components/course/RegistrationForm';
import SubscribeNewsLetters from '../../components/course/SubscribeNewaLetters';
import ElevateYourLearning from '../../components/course/learning_options_elevate_your_learning';
import RelatedBlogs from '../../components/course/related_blogs';
import RelatedCourses from '../../components/course/related_courses';
import AlreadySubmitted from '../blog/details/already_submitted';
import YoutubeVideoPopupPlayer from '../../components/course/YoutubeVideoPopupPlayer';
import WhatOurStudentsSay from '../../components/course/curriculum_what_our_students_say';
import JobTrends from '../../components/course/job_trends';
import Seo from '../Seo';
import SchemaLoader from '../../components/course/SchemaLoader';
import UpcomingDemoHeaderStrip from '../../components/course/upcoming_demo_header_strip';
import LearningOptionsDeserveUpgrade from '../../components/course/learning_options_deserve_upgrade';
import CourseOverviewKeyFeatures from '../../components/course/course_overview_key_features';
import CourseOverviewHandsonProjects from '../../components/course/course_overview_handson_projects';
import CourseOverviewWhyTechLeadSIT from '../../components/course/course_overview_why_techleadsit';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import useLmsStore from '../../store/lmsStore';
import QuickPayment from '../../components/course/quick_payment';
import { useExpiringLocalStorage } from '../../services/useExpiringLocalStorage';

const CoursePage = ({ slug, filePath, courseData, nativeCourse, changedData, courseId, courseTax, demos, upcomingDemoDate, relatedBlogs, relatedCourses }) => {
    // console.log("Changed Data: ", changedData);
    const formHeading = useLmsStore((state) => state.formHeading);
    const clearFormHeading = useLmsStore((state) => state.clearFormHeading);
    const quickPaymentVisibility = useLmsStore((state) => state.showQuickPayment);
    const setQuickPaymentVisibility = useLmsStore((state) => state.setQuickPaymentVisibility);
    const setBuyingCourse = useLmsStore((state) => state.setBuyingCourse);


    const handleCertificateDownload = () => {
        const link = document.createElement('a');
        link.href = `/images/courses/certificates/${courseData?.title?.replace(/\s*\+\s*/g, "_")?.replace(/\s_\s+/g, "_")}.webp`; // Ensure this path is correct
        link.download = 'Sample-Certificate.webp'; // Desired filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const handleScroll = () => {
            const mainCourseStripCust = document.getElementById("mainCourseStrip");
            const mainCourseStripTextCust = document.querySelectorAll("#mainCourseStrip .mainCoursetext");
            const mainCourseStripPaths = document.querySelectorAll("#mainCourseStrip svg path");

            if (mainCourseStripCust) {
                if (window.scrollY > 50) {
                    mainCourseStripCust.style.backgroundColor = "#ffffff";

                    mainCourseStripTextCust.forEach((text) => {
                        text.style.color = "#006FAA";
                    });

                    mainCourseStripPaths.forEach((path) => {
                        path.setAttribute("fill", "#006FAA");
                    });
                } else {
                    mainCourseStripCust.style.backgroundColor = "transparent";

                    mainCourseStripTextCust.forEach((text) => {
                        text.style.color = "#ffffff";
                    });

                    mainCourseStripPaths.forEach((path) => {
                        path.setAttribute("fill", "#ffffff");
                    });
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const formRef = useRef(null);
    const overlayRef = useRef(null);

    const handleButtonClick = () => {
        // if (formRef.current && overlayRef.current) {
        // formRef.current.style.display = "block";
        // overlayRef.current.style.display = "block";
        setFormVisibility(true)
        // }
    };

    const hidePopupForm = () => {
        // if (formRef.current && overlayRef.current) {
        // formRef.current.style.display = "none";
        // overlayRef.current.style.display = "none";
        setFormVisibility(false)
        // }
    }

    const [formVisibility, setFormVisibility] = useState(false);
    const [formFields, setFormFields] = useState([]);
    const [heading, setHeading] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [formSuccessCallback, setFormSuccessCallback] = useState(null);

    const jobTrendsNotRequired = [
        "SAP-CPI-OT-006",
        "SAP-SDO-OT-007",
        "SAP-MMO-OT-037",
        "SAP-ABP-OT-038",
        "SFR-CRM-OT-039",
        "GEN-DST-OT-008",
        "WRK-HCM-OT-009"
    ]

    const formConfigs = {
        "Request A Free Demo": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Request A Free Demo",
            buttonLabel: "Register Now",
        },
        "Download Course Brochure": {
            fields: ["fullName", "email", "phone"],
            heading: "Download Course Brochure",
            buttonLabel: "Submit",
        },
        "Watch Demo Video": {
            fields: ["fullName", "email", "phone"],
            heading: "Watch Demo Video",
            buttonLabel: "Submit",
        },
        "Start Learning Today": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Registration Form",
            buttonLabel: "Register Now",
        },
        "Get Personalized Guidance": {
            fields: ["fullName", "email", "phone"],
            heading: "Get Personalized Guidance",
            buttonLabel: "Submit",
        },
        "Register now": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Registration Form",
            buttonLabel: "Register Now",
        },
        "Request a call back": {
            fields: ["fullName", "email", "phone"],
            heading: "Request A Call Back",
            buttonLabel: "Submit",
        },
        "join the course": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Join the Course",
            buttonLabel: "Submit",
        },
        "Enroll Now": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Enroll Now!!",
            buttonLabel: "Register Now",
        },
        "Get a personalised quote": {
            fields: ["fullName", "email", "phone"],
            heading: "Get Personalized Quote",
            buttonLabel: "Submit",
        },
        "Start Your First Project": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Start Your First Project",
            buttonLabel: "Register Now",
        },
        "Level Up Your Skill": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Level Up Your Skill",
            buttonLabel: "Register Now",
        },
        "Boost your career": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Boost Your Career",
            buttonLabel: "Register Now",
        },
        "Your Success Starts Here": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Registration Form",
            buttonLabel: "Register Now",
        },
        "Start Your Journey": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Start Your Journey",
            buttonLabel: "Register Now",
        },
        "Enquire Now": {
            fields: ["fullName", "email", "phone"],
            heading: "Request A Call Back",
            buttonLabel: "Submit",
        },
    };


    const [detailsSubmitted, setDetailsSubmitted] = useState(false);
    const handleDetailsSubmitted = () => {
        setDetailsSubmitted(false);
    }

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

    const handleUserDetailsSubmissionStatus = (status) => {
        if (status) {
            setTimeout(() => { hidePopupForm() }, 3000)
        }
    }

    const courseOverviewRef = useRef(null);
    const [showStrip, setShowStrip] = useState(false);
    const [showStripByScroll, setShowStripByScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const section = courseOverviewRef.current;
            if (section) {
                const top = section.getBoundingClientRect().top;
                // Show the strip when top of element crosses top of viewport (<= 0)
                setShowStrip(top <= 0);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [loading, setLoading] = useState(false);

    const [youtibeopenVideoPopup, setYoutibeopenVideoPopup] = useState(false);
    const handleYoutibeOpenVideoPopup = () => {
        console.log("Opening YouTube video popup : ", youtibeopenVideoPopup);
        setYoutibeopenVideoPopup(prev => !prev)
    }

    const handleBrochureDownload = () => {
        // const userDetails = localStorage.getItem("userDetails");
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

        const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
            "userDetails",
            null,
            endOfDay
        );

        if (userDetails) {
            downloadBrochure();
        } else {
            openForm("Download Course Brochure");
        }
    };

    const downloadBrochure = () => {
        const link = document.createElement("a");
        link.href = courseData?.hero?.brouchurePath; // Ensure this is a valid string URL
        link.download = "brouchure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        if (formHeading && formHeading == "Download Course Brochure") {
            downloadBrochure();
            clearFormHeading();
        } else if (formHeading && formHeading == "Watch Demo Video") {
            handleYoutibeOpenVideoPopup();
            clearFormHeading();
        }
        console.log(formHeading);
    }, [formHeading])

    //console.log(courseId);
    const [usd, setUsd] = useState("");
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("https://api.frankfurter.app/latest?from=INR&to=USD");
                const data = await res.json();
                // Frankfurter returns rates as { USD: <rate> }
                const rate = data?.rates?.USD;
                if (rate) {
                    if (nativeCourse?.basic?.discountedPrice) {
                        handleInrChange(nativeCourse?.basic?.discountedPrice, rate);
                    } else {
                        handleInrChange(nativeCourse?.basic?.price, rate);
                    }
                }
            } catch (err) {
                //console.log("Could not fetch exchange rate");
            } finally {
                setLoading(false);
            }
        })();
    }, [slug, nativeCourse?.basic?.discountedPrice, nativeCourse?.basic?.price]);

    const handleInrChange = (value, rate) => {
        //console.log(value);
        // Accept only numbers & optional decimal point
        if (/^\d*\.?\d*$/.test(value)) {
            if (rate) {
                const dollars = (parseFloat(value || 0) * rate).toFixed(2);
                //console.log(dollars);
                setUsd(dollars);
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrolledToBottom =
                window.innerHeight + window.scrollY >= document.body.scrollHeight;
            //console.log(scrolledToBottom)
            if (scrolledToBottom) {
                setShowStripByScroll(false); // hide element
            } else {
                setShowStripByScroll(true); // show element
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [loadBelowFold, setLoadBelowFold] = useState(true);
    const { ref: belowFoldRef, inView } = useInView({
        triggerOnce: true,
        rootMargin: '400px',
    });

    const handleBelowFoldLoad = (status) => {
        setLoadBelowFold(status);
    }

    // Always load below fold on mobile/tablet or after 3 seconds
    // Replace the existing useEffect that handles loadBelowFold
    useEffect(() => {
        if (loadBelowFold) return; // Prevent unnecessary state updates

        if (inView) {
            setLoadBelowFold(true); // Only triggers when needed
        } else {
            const timer = setTimeout(() => {
                setLoadBelowFold(true); // Only triggers when needed
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [inView, loadBelowFold]); // Add loadBelowFold to dependencies

    const handleBuyNowClick = () => {
        setBuyingCourse({
            title: courseData?.title,
            price: nativeCourse?.basic?.price,
            discountedPrice: nativeCourse?.basic?.discountedPrice,
            thumbnail: nativeCourse?.basic?.thumbnailImage?.path,
            id: courseId,
        })
        setQuickPaymentVisibility(true);
    };

    return (<>
        <Seo details={nativeCourse?.seo}></Seo>
        <SchemaLoader slug={slug}></SchemaLoader>
        <main className="Course-Page-CP">
            {nativeCourse?.basic?.discountedPrice && demos.length > 0 && <UpcomingDemoHeaderStrip demos={demos} price={nativeCourse?.basic?.price} discountedPrice={nativeCourse?.basic?.discountedPrice} title={courseData?.title}></UpcomingDemoHeaderStrip>}
            <Hero data={courseData?.hero} courseTitle={courseData?.title} handleButtonClick={handleButtonClick} openForm={openForm} handleYoutibeOpenVideoPopup={handleYoutibeOpenVideoPopup} demoVideoPath={courseData?.curriculum?.demoVideoPath}></Hero>

            {showStrip && showStripByScroll && <div className="Main-Course-Banner-Strip" id="mainCourseStrip">
                <div className="d-flex fl-d-cl-aic">
                    {courseData?.hero?.brouchurePath && <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" className="Main-Course-Strip-Icons" onClick={handleBrochureDownload}
                        viewBox="0 0 49 48" fill="none">
                        <path id="mainCoursepath1"
                            d="M14.38 4C15.212 4 15.886 4.648 15.886 5.448V8.368C17.222 8.344 18.72 8.344 20.406 8.344H28.436C30.12 8.344 31.618 8.344 32.954 8.37V5.45C32.954 4.65 33.628 4 34.46 4C35.292 4 35.966 4.648 35.966 5.448V8.5C38.856 8.722 40.754 9.268 42.146 10.61C43.542 11.95 44.11 13.774 44.34 16.554L44.5 18H4.5V16.552C4.732 13.772 5.3 11.948 6.694 10.608C8.088 9.268 9.984 8.72 12.874 8.498V5.448C12.874 4.648 13.548 4 14.38 4Z"
                            fill="white" />
                        <path id="mainCoursepath2" opacity="0.5"
                            d="M44.5006 28V24C44.5006 22.322 44.4926 19.33 44.4666 18H4.5206C4.4946 19.33 4.5006 22.322 4.5006 24V28C4.5006 35.542 4.5006 39.314 6.8446 41.656C9.1886 43.998 12.9566 44 20.5006 44H28.5006C36.0406 44 39.8126 44 42.1566 41.656C44.5006 39.312 44.5006 35.544 44.5006 28Z"
                            fill="white" />
                        <path id="mainCoursepath3"
                            d="M36.5 34C36.5 34.5304 36.2893 35.0391 35.9142 35.4142C35.5391 35.7893 35.0304 36 34.5 36C33.9696 36 33.4609 35.7893 33.0858 35.4142C32.7107 35.0391 32.5 34.5304 32.5 34C32.5 33.4696 32.7107 32.9609 33.0858 32.5858C33.4609 32.2107 33.9696 32 34.5 32C35.0304 32 35.5391 32.2107 35.9142 32.5858C36.2893 32.9609 36.5 33.4696 36.5 34ZM36.5 26C36.5 26.5304 36.2893 27.0391 35.9142 27.4142C35.5391 27.7893 35.0304 28 34.5 28C33.9696 28 33.4609 27.7893 33.0858 27.4142C32.7107 27.0391 32.5 26.5304 32.5 26C32.5 25.4696 32.7107 24.9609 33.0858 24.5858C33.4609 24.2107 33.9696 24 34.5 24C35.0304 24 35.5391 24.2107 35.9142 24.5858C36.2893 24.9609 36.5 25.4696 36.5 26ZM26.5 34C26.5 34.5304 26.2893 35.0391 25.9142 35.4142C25.5391 35.7893 25.0304 36 24.5 36C23.9696 36 23.4609 35.7893 23.0858 35.4142C22.7107 35.0391 22.5 34.5304 22.5 34C22.5 33.4696 22.7107 32.9609 23.0858 32.5858C23.4609 32.2107 23.9696 32 24.5 32C25.0304 32 25.5391 32.2107 25.9142 32.5858C26.2893 32.9609 26.5 33.4696 26.5 34ZM26.5 26C26.5 26.5304 26.2893 27.0391 25.9142 27.4142C25.5391 27.7893 25.0304 28 24.5 28C23.9696 28 23.4609 27.7893 23.0858 27.4142C22.7107 27.0391 22.5 26.5304 22.5 26C22.5 25.4696 22.7107 24.9609 23.0858 24.5858C23.4609 24.2107 23.9696 24 24.5 24C25.0304 24 25.5391 24.2107 25.9142 24.5858C26.2893 24.9609 26.5 25.4696 26.5 26ZM16.5 34C16.5 34.5304 16.2893 35.0391 15.9142 35.4142C15.5391 35.7893 15.0304 36 14.5 36C13.9696 36 13.4609 35.7893 13.0858 35.4142C12.7107 35.0391 12.5 34.5304 12.5 34C12.5 33.4696 12.7107 32.9609 13.0858 32.5858C13.4609 32.2107 13.9696 32 14.5 32C15.0304 32 15.5391 32.2107 15.9142 32.5858C16.2893 32.9609 16.5 33.4696 16.5 34ZM16.5 26C16.5 26.5304 16.2893 27.0391 15.9142 27.4142C15.5391 27.7893 15.0304 28 14.5 28C13.9696 28 13.4609 27.7893 13.0858 27.4142C12.7107 27.0391 12.5 26.5304 12.5 26C12.5 25.4696 12.7107 24.9609 13.0858 24.5858C13.4609 24.2107 13.9696 24 14.5 24C15.0304 24 15.5391 24.2107 15.9142 24.5858C16.2893 24.9609 16.5 25.4696 16.5 26Z"
                            fill="white" />
                    </svg>}
                    <div className="ms-2 mainCoursetext">
                        <p className="Main-Course-strip-p1">Program Duration</p>
                        <p className="Main-Course-strip-p2">{nativeCourse?.basic?.durationInMonths} {nativeCourse?.basic?.durationInMonths == 1 ? "Month" : "Months"}</p>
                    </div>
                </div>

                <div className="d-flex fl-d-cl-aic">
                    <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" className="Main-Course-Strip-Icons"
                        viewBox="0 0 49 48" fill="none">
                        <path id="mainCoursepath4"
                            d="M41.2992 13.1992C41.2992 11.6079 40.6671 10.0818 39.5419 8.95658C38.4166 7.83136 36.8905 7.19922 35.2992 7.19922H13.6992C12.1079 7.19922 10.5818 7.83136 9.45658 8.95658C8.33136 10.0818 7.69922 11.6079 7.69922 13.1992V14.3992H41.2992V13.1992ZM41.2992 23.0392V16.7992H7.69922V34.7992C7.69922 36.3905 8.33136 37.9166 9.45658 39.0419C10.5818 40.1671 12.1079 40.7992 13.6992 40.7992H23.5392C22.27 38.3147 21.8207 35.4919 22.2556 32.7361C22.6906 29.9803 23.9876 27.4332 25.9604 25.4604C27.9332 23.4876 30.4803 22.1906 33.2361 21.7556C35.9919 21.3207 38.8147 21.77 41.2992 23.0392ZM46.0992 34.7992C46.0992 37.6636 44.9614 40.4106 42.936 42.436C40.9106 44.4614 38.1636 45.5992 35.2992 45.5992C32.4349 45.5992 29.6879 44.4614 27.6625 42.436C25.6371 40.4106 24.4992 37.6636 24.4992 34.7992C24.4992 31.9349 25.6371 29.1879 27.6625 27.1625C29.6879 25.1371 32.4349 23.9992 35.2992 23.9992C38.1636 23.9992 40.9106 25.1371 42.936 27.1625C44.9614 29.1879 46.0992 31.9349 46.0992 34.7992ZM40.6104 33.7504L33.4824 29.7904C33.2998 29.6888 33.0937 29.6367 32.8847 29.6393C32.6757 29.6418 32.471 29.6989 32.2909 29.8048C32.1107 29.9108 31.9613 30.062 31.8576 30.2434C31.7538 30.4248 31.6992 30.6302 31.6992 30.8392V38.7592C31.6992 38.9682 31.7538 39.1736 31.8576 39.3551C31.9613 39.5365 32.1107 39.6877 32.2909 39.7936C32.471 39.8996 32.6757 39.9567 32.8847 39.9592C33.0937 39.9617 33.2998 39.9096 33.4824 39.808L40.6104 35.848C40.7974 35.7441 40.9532 35.592 41.0617 35.4076C41.1701 35.2232 41.2273 35.0132 41.2273 34.7992C41.2273 34.5853 41.1701 34.3752 41.0617 34.1908C40.9532 34.0064 40.7974 33.8544 40.6104 33.7504Z"
                            fill="white" />
                    </svg>
                    <div className="ms-2 mainCoursetext">
                        <p className="Main-Course-strip-p1">Next Demo Date</p>
                        {upcomingDemoDate ? <p className="Main-Course-strip-p2">{upcomingDemoDate}</p> : <p className="Main-Course-strip-p2 cursor-pointer" style={{ textDecoration: "underline" }} onClick={(e) => openForm("Request A Free Demo")}>Contact Us <i className="fa-solid fa-arrow-right"></i></p>}
                    </div>
                </div>

                <div className="d-flex md-strip-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" className="Main-Course-Strip-Icons"
                        viewBox="0 0 49 48" fill="none">
                        <path id="mainCoursepath5"
                            d="M19.46 6.93784C16.0728 5.32066 11.3384 4.52847 5.00001 4.50034C4.40223 4.49222 3.81618 4.66653 3.32 5.00003C2.91274 5.27531 2.57937 5.64644 2.34919 6.08079C2.11902 6.51514 1.99911 6.9994 2 7.49097V34.3128C2 36.126 3.29 37.4938 5.00001 37.4938C11.6628 37.4938 18.3463 38.1163 22.3494 41.9C22.4041 41.952 22.473 41.9868 22.5473 42C22.6217 42.0132 22.6983 42.0043 22.7676 41.9743C22.8369 41.9443 22.8959 41.8947 22.9372 41.8315C22.9785 41.7682 23.0004 41.6943 23 41.6188V10.0147C23.0001 9.8015 22.9545 9.59074 22.8662 9.39666C22.7779 9.20259 22.6489 9.02972 22.4881 8.88972C21.5712 8.10581 20.5526 7.44926 19.46 6.93784ZM45.68 4.99722C45.1836 4.66455 44.5975 4.49121 44 4.50034C37.6616 4.52847 32.9272 5.31691 29.54 6.93784C28.4475 7.44832 27.4286 8.10359 26.5109 8.88597C26.3504 9.02617 26.2218 9.19911 26.1337 9.39315C26.0455 9.58719 26 9.79785 26 10.011V41.6169C26 41.6895 26.0213 41.7604 26.0615 41.8209C26.1016 41.8813 26.1587 41.9286 26.2256 41.9567C26.2925 41.9849 26.3662 41.9926 26.4375 41.979C26.5087 41.9655 26.5744 41.9311 26.6263 41.8803C29.0328 39.4897 33.2563 37.491 44.0038 37.4919C44.7994 37.4919 45.5625 37.1758 46.1251 36.6132C46.6877 36.0506 47.0038 35.2876 47.0038 34.4919V7.49191C47.0049 6.99937 46.8847 6.51413 46.6538 6.07905C46.4229 5.64397 46.0885 5.27242 45.68 4.99722Z"
                            fill="white" />
                    </svg>
                    <div className="ms-2 mainCoursetext">
                        <p className="Main-Course-strip-p1">Learning Format</p>
                        <p className="Main-Course-strip-p2">Online, Self Paced</p>
                    </div>
                </div>

                <div className="d-flex md-strip-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" className="Main-Course-Strip-Icons"
                        viewBox="0 0 49 48" fill="none">
                        <path id="mainCoursepath6" fillRule="evenodd" clipRule="evenodd"
                            d="M16.5 14C16.5 11.8783 17.3429 9.84344 18.8431 8.34315C20.3434 6.84285 22.3783 6 24.5 6C26.6217 6 28.6566 6.84285 30.1569 8.34315C31.6571 9.84344 32.5 11.8783 32.5 14C32.5 16.1217 31.6571 18.1566 30.1569 19.6569C28.6566 21.1571 26.6217 22 24.5 22C22.3783 22 20.3434 21.1571 18.8431 19.6569C17.3429 18.1566 16.5 16.1217 16.5 14ZM16.5 26C13.8478 26 11.3043 27.0536 9.42893 28.9289C7.55357 30.8043 6.5 33.3478 6.5 36C6.5 37.5913 7.13214 39.1174 8.25736 40.2426C9.38258 41.3679 10.9087 42 12.5 42H36.5C38.0913 42 39.6174 41.3679 40.7426 40.2426C41.8679 39.1174 42.5 37.5913 42.5 36C42.5 33.3478 41.4464 30.8043 39.5711 28.9289C37.6957 27.0536 35.1522 26 32.5 26H16.5Z"
                            fill="white" />
                    </svg>
                    <div className="ms-2 mainCoursetext">
                        <p className="Main-Course-strip-p1">Trainer</p>
                        <p className="Main-Course-strip-p2">{courseData?.instructorDetails?.sectionThree?.trainerName}</p>
                    </div>
                </div>

                <div className="d-flex fl-d-cl-aic">
                    <i className="fa-solid fa-tags Price-mb-cust"></i>
                    <div className="ms-2 mainCoursetext">
                        <p className="Main-Course-strip-p1">Price</p>
                        {nativeCourse?.basic?.discountedPrice ? <p className="Main-Course-strip-p2"><span className="Main-Course-strip-p2-span ">₹{nativeCourse?.basic?.price?.toLocaleString("en-IN")}</span>₹{nativeCourse?.basic?.discountedPrice?.toLocaleString("en-IN")} | ${usd}</p> : <p className="Main-Course-strip-p2">₹{nativeCourse?.basic?.price} | ${usd}</p>}
                    </div>

                </div>

                {courseData?.hero?.brouchurePath && <button className="Main-Banner-Strip-btn Main-Course-sm-Download" aria-label="Download-strip-btn" onClick={handleBrochureDownload}>
                    <p className="Main-Banner-Strip-download-icon">
                        <svg className="Main-Banner-Strip-svgIcon-hero" viewBox="0 0 384 512" height="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path className="Main-Banner-Strip-dwnld-icon-scr" fill="white"
                                d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z">
                            </path>
                        </svg>
                        <span className="Main-Banner-Strip-icon2-hero"></span>
                    </p>
                </button>}
            </div>}
            <div className='white-space-issue'>
                <div className="Main-Course-Nav-Container">
                    <StickyNav showJobTrends={jobTrendsNotRequired.indexOf(courseData?.id)} ></StickyNav>

                    <MobileStickyNav showJobTrends={jobTrendsNotRequired.indexOf(courseData?.id)} handleBelowFoldLoad={handleBelowFoldLoad}></MobileStickyNav>
                    <button
                        onClick={handleBuyNowClick}
                        className={`Main-Course-Top-Nav-CTA-Btn Main-Course-CTA-Button-Pop-Section ${!(typeof courseId === 'number' && courseId > 0) ? 'disabled' : ''}`}
                        disabled={!(typeof courseId === 'number' && courseId > 0)}
                    >
                        <span>Buy Now</span>
                        <i className="fa-solid fa-arrow-right Main-Course-CTA-arrow Main-Course-CTA-Top-Nav-arrow ms-2"></i>
                    </button>
                </div>

                <section id="course-overview" ref={courseOverviewRef} className="Main-Course-T-scroll-container">
                    <section className="Main-Course-Top-Navbar">
                        <CourseOverviewKeyFeatures title={courseData?.title} id={courseData?.id}></CourseOverviewKeyFeatures>

                        <CourseOverviewToolsAndModules data={courseData?.courseOverview?.toolsModules}></CourseOverviewToolsAndModules>

                        <CourseOverviewWhyTechLeadSIT id={courseData?.id} openForm={openForm} bfRef={belowFoldRef}></CourseOverviewWhyTechLeadSIT>

                        {loadBelowFold && <IsthisCourseRightForYou data={courseData?.courseOverview?.isThisCourseRightForYou}></IsthisCourseRightForYou>}

                        <section className="Main-Course-CTA-banner1">
                            <div className="Main-Course-CTA-banner-content1">
                                <p className="Main-Course-CTA-banner-p1">
                                    Is This Course the Right Choice for You? Let’s Figure It Out
                                    Together!
                                </p>
                                <button className="Main-Course-CTA-Banner-Btn1" onClick={(e) => openForm("Get Personalized Guidance")}>
                                    <i className="fa-solid fa-phone-volume Main-Course-CTA-Banner-Btn-icon"></i>Get Personalized
                                    Guidance
                                </button>
                            </div>
                            <div className="Main-Course-img-section1">
                                <img loading='lazy' src="/images/courses/Main-Course-CTA-Banner-1.webp"
                                    alt="All-category-CTA-banner-img" className="img-fluid" width="327" height="430" style={{ "color": "transparent", "maxWidth": "100%", "width": "auto", "height": "auto" }} />
                            </div>
                        </section>

                        {loadBelowFold && <CourseOverviewHandsonProjects id={courseData?.id} openForm={openForm}></CourseOverviewHandsonProjects>}

                        <UpcomingDemoSession data={courseData?.courseOverview?.upcomingDemoSession} courseTitle={courseData?.hero?.title} courseId={courseData?.id} demos={demos} openForm={openForm} subHeading={changedData?.upcomingDemoSessionSubHeading}></UpcomingDemoSession>

                        {loadBelowFold && <><section className="Main-Course-CTA-banner2">
                            <div className="Main-Course-CTA-banner-content2">
                                <h2 className="Main-Course-CTA-banner-h2">
                                    Invest in Yourself
                                    It’s the Best Decision You’ll Ever Make!
                                </h2>
                                <p className="Main-Course-CTA-banner-p2">
                                    {changedData?.investInYourselfSubHeadingChange}
                                </p>
                                <button className="Main-Course-CTA-button2" onClick={(e) => openForm("join the course")}>
                                    <div className="Main-Course-CTA-button-dots_border2"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        className="Main-Course-CTA-button-sparkle2">
                                        <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                            fill="black"
                                            d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z">
                                        </path>
                                        <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                            fill="black"
                                            d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z">
                                        </path>
                                        <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                            fill="black"
                                            d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z">
                                        </path>
                                    </svg>
                                    <span className="Main-Course-CTA-button-text_button2">Join The Course</span>
                                </button>
                            </div>
                            <div className="Main-Course-CTA-img-section2">
                                <img loading='lazy' src="/images/courses/Main-Course-CTA-Banner-2.webp"
                                    alt="All-category-CTA-banner-img" className="img-fluid" width="345" height="480" style={{ "color": "transparent", "maxWidth": "100%", "width": "auto", "height": "auto" }} />
                            </div>
                        </section></>}
                    </section>
                </section>
                {courseData?.curriculum?.demoVideoPath && <YoutubeVideoPopupPlayer videoPath={courseData?.curriculum?.demoVideoPath} youtibeopenVideoPopup={youtibeopenVideoPopup} handleYoutibeOpenVideoPopup={handleYoutibeOpenVideoPopup}></YoutubeVideoPopupPlayer>}
                {loadBelowFold && <><section id="curriculum" className="Main-Course-Top-Navbar">
                    <Curriculum data={courseData?.curriculum?.modules} courseTitle={courseData?.hero?.title} openForm={openForm} brouchurePath={courseData?.hero?.brouchurePath} changedData={changedData}></Curriculum>

                    {courseData?.curriculum?.demoVideoPath && courseData?.curriculum?.demoVideoThumbnail && <section className="Main-Course-Watch-Our-Demo-Section">
                        <div>
                            <h2 className="Main-Course-Watch-Our-Demo-Section-heading">Watch Our Demo Video</h2>
                            <p className="Main-Course-Watch-Our-Demo-Section-para">Get an Exclusive Preview of Our Training and
                                Learning Experience!</p>
                            <div className="Main-Course-Why-TL-CTA-Btn-Section cursor-pointer" onClick={(e) => openForm("Request A Free Demo")}>
                                <button className="Main-Course-Why-TL-CTA-Btn">Request for Free Demo</button>
                                <i className="fa-solid fa-arrow-right Main-Course-CTA-arrow ms-2"></i>
                            </div>
                        </div>

                        <div className="Main-Course-Watch-Our-Demo-Video-Section cursor-pointer" onClick={handleYoutibeOpenVideoPopup}>
                            <img src={courseData?.curriculum?.demoVideoThumbnail} alt="Course-Page-Upcoming-Demo-Session-img" className="Course-Page-Upcoming-Demo-Session-img-section" width="677" height="380" style={{ "color": "transparent", "maxWidth": "100%", "width": "auto", "height": "auto" }} loading='lazy' />
                            <img src="/images/courses/Main-Course-Page-Watch-Our-Free-Demo-Play-Btn.svg" alt="Main-Course-Watch-Our-Demo-Section-playButton" className="Course-Page-Upcoming-Demo-Session-img-play-btn" loading='lazy' />
                        </div>
                    </section>}

                    <section className="Main-Course-What-Our-Student-Say-Section">
                        <div className="d-flex flex-column align-items-center">
                            <p className="Main-Course-What-Our-Student-Say-Section-Detail">Testimonials</p>
                            <h2 className="Main-Course-What-Our-Student-Say-Section-Heading text-center">
                                What Our Students Say
                            </h2>
                            <p className="Main-Course-What-Our-Student-Say-Section-Para text-center">
                                Our students have consistently achieved remarkable milestones in their careers with the
                                guidance and training provided by Tech Leads IT.
                            </p>
                        </div>
                        <WhatOurStudentsSay courseId={courseData?.id}></WhatOurStudentsSay>
                    </section>

                    <section className="Main-Course-CTA-banner3">
                        <div className="Main-Course-CTA-banner-content3">
                            <h2 className="Main-Course-CTA-banner-h3">
                                {courseData?.curriculum?.yourFutureBoss?.title}
                            </h2>
                            <p className="Main-Course-CTA-banner-p3">
                                {courseData?.curriculum?.yourFutureBoss?.shortDescription}
                            </p>
                            <button className="Main-Course-CTA-button3" onClick={(e) => openForm("Enroll Now")}>
                                <div className="Main-Course-CTA-button-dots_border3"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    className="Main-Course-CTA-button-sparkle3">
                                    <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                        fill="black"
                                        d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z">
                                    </path>
                                    <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                        fill="black"
                                        d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z">
                                    </path>
                                    <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                        fill="black"
                                        d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z">
                                    </path>
                                </svg>
                                <span className="Main-Course-CTA-button-text_button3">Enroll Now!!</span>
                            </button>
                        </div>
                        <div className="Main-Course-CTA-img-section3">
                            <img loading='lazy' src="/images/courses/Main-Course-CTA-Banner-3.webp"
                                alt="Main-Course-CTA-banner-img" className="img-fluid" width="345" height="480" style={{ "color": "transparent", "maxWidth": "100%", "width": "auto", "height": "auto" }} />
                        </div>
                    </section>
                </section>
                    <InstructorDetails data={courseData?.instructorDetails}></InstructorDetails>
                    <section id="learning-options" className="Main-Course-Top-Navbar">
                        <PricingPlans data={courseData?.learningOptions?.pricingPlans} openForm={openForm} courseId={courseId} nativeCourse={nativeCourse} courseTax={courseTax}></PricingPlans>
                        <section className="Main-Course-Download-From-PlayStore-Section">
                            <div className="Download-From-PlayStore-Card-Section">
                                <div className="Click-For-Download-Sub-Section-Img-Part">
                                    <img loading='lazy' src={courseData?.learningOptions?.mobileLearning?.imagePath}
                                        width="630" height="520"
                                        style={{ "color": "transparent", "maxWidth": "100%", "width": "auto", "height": "auto", "padding": "30px" }}
                                        alt="Click-For-Download-Section-img" className="Click-For-Download-Section-img" />
                                </div>
                                <div className="Main-Course-Download-From-playStore-Content">
                                    <p className="Main-Course-Download-From-PlayStore-text">Mobile Learning</p>
                                    <h3 className="Main-Course-Download-From-PlayStore-heading"> Learn on the Go Anytime!</h3>
                                    <p className="Main-Course-Download-From-PlayStore-text-1">Access course materials anytime with
                                        our seamless mobile app. Stay connected and learn on the go. Our user-friendly interface
                                        ensures effortless navigation and uninterrupted learning.</p>
                                    <p className="Main-Course-Download-Now-Text">Download now!!</p>
                                    <div className="Click-For-App-Social-Icons">
                                        <div className="Click-For-App-Social-Icons-Sub-Section">
                                            <a href="https://apps.apple.com/in/app/tech-leads-it/id6615066544" target="_blank"
                                                rel="noopener noreferrer">
                                                <Image loading='lazy' priority={false} src="/images/courses/Click-For-App-Store.png"
                                                    alt="Click-For-App-Store" height="60" width="192"
                                                    className="Main-Course-Click-For-Store" />
                                            </a>
                                            <a href="https://play.google.com/store/apps/details?id=com.techleadsit.academy_app&pli=1"
                                                target="_blank" rel="noopener noreferrer">
                                                <Image loading='lazy' priority={false} src="/images/courses/Click-For-Play-Store.png"
                                                    alt="Click-For-Play-Store" height="60" width="193"
                                                    className="Main-Course-Click-For-Store" />
                                            </a>
                                        </div>
                                        <Image loading='lazy' priority={false} src="/images/courses/Scan-This-For-App.png" alt="Scan-This-For-App"
                                            height="100" width="100" className="Main-Course-Scan-For-Store" />
                                    </div>
                                </div>


                            </div>
                        </section>

                        <section className="Main-Course-LMS-Portal-Section">
                            <h2 className="Main-Course-LMS-Portal-Heading text-center">Unlock Your Learning Experience with an LMS Walkthrough
                            </h2>
                            <p className="Main-Course-LMS-Portal-Para text-center">Access live classes, hands-on labs, quizzes,
                                forums, and certifications—all in one place. Learn, practice, and grow with ease!</p>
                            <div className="Main-Course-LMS-Portal-Heading-Sides-Section">
                                <div className="Main-Course-LMS-Portal-Side-Bar-Section">
                                    <div className="text-center">
                                        <Image loading='lazy' priority={false} src={courseData?.learningOptions?.portalView?.imagePath} width="740"
                                            height="440" alt="Main-Course-LMS-Portal-Image"
                                            className="Main-Course-LMS-Portal-Course-Image-Section"
                                            style={{ "color": "transparent", "maxWidth": "100%", "width": "100%", "height": "auto" }} />
                                    </div>
                                    <ElevateYourLearning></ElevateYourLearning>
                                </div>
                                <div className="Main-Course-LMS-Portal-Side-Bar-Section">
                                    <h2 className="Main-Course-LMS-Portal-Side-Bar-Heading">Live Class recordings</h2>
                                    <div className="Main-Course-LMS-Portal-Side-Bar-Lesson">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h3 className="Main-Course-LMS-Portal-Side-Bar-Sub-Heading">Module 1</h3>
                                            <i className="fa-solid fa-chevron-up"></i>
                                        </div>
                                        <div className="Main-Course-LMS-Portal-Side-Bar-Lesson-Box">
                                            <p className="Main-Course-LMS-Portal-Side-Bar-Lesson-text">Lesson 1</p>
                                            <Image loading='lazy' priority={false} src="/images/courses/LMS-Play-Btn.svg" height="29" width="25"
                                                alt="LMS-Play-Btn" />
                                        </div>
                                        <div className="Main-Course-LMS-Portal-Side-Bar-Lesson-Box">
                                            <p className="Main-Course-LMS-Portal-Side-Bar-Lesson-text">Lesson 2</p>
                                            <Image loading='lazy' priority={false} src="/images/courses/LMS-Play-Btn.svg" height="29" width="25"
                                                alt="LMS-Play-Btn" />
                                        </div>
                                    </div>

                                    <div className="Main-Course-LMS-Portal-Side-Bar-Lesson">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h3 className="Main-Course-LMS-Portal-Side-Bar-Sub-Heading">Module 2</h3>
                                            <i className="fa-solid fa-chevron-up"></i>
                                        </div>
                                        <div className="Main-Course-LMS-Portal-Side-Bar-Lesson-Box">
                                            <p className="Main-Course-LMS-Portal-Side-Bar-Lesson-text">Lesson 1</p>
                                            <Image loading='lazy' priority={false} src="/images/courses/LMS-Play-Btn.svg" height="29" width="25"
                                                alt="LMS-Play-Btn" />
                                        </div>
                                        <div className="Main-Course-LMS-Portal-Side-Bar-Lesson-Box">
                                            <p className="Main-Course-LMS-Portal-Side-Bar-Lesson-text">Lesson 2</p>
                                            <Image loading='lazy' priority={false} src="/images/courses/LMS-Play-Btn.svg" height="29" width="25"
                                                alt="LMS-Play-Btn" />
                                        </div>
                                    </div>
                                    <div className="Main-Course-LMS-Portal-Side-Bar-Lesson">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h3 className="Main-Course-LMS-Portal-Side-Bar-Sub-Heading">Special Videos</h3>
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </div>
                                    </div>
                                    <div className="Main-Course-LMS-Portal-Side-Bar-Lesson">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h3 className="Main-Course-LMS-Portal-Side-Bar-Sub-Heading">Interview Questions</h3>
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <LearningOptionsDeserveUpgrade courseTitle={courseData?.title}></LearningOptionsDeserveUpgrade>
                    </section>
                    <section id="placements-path" className="Main-Course-Top-Navbar">
                        <section className="Main-Course-Your-Success-Starts-Here-Section">
                            <div className="Main-Course-Placements-Path-Steps-We-Follow-Container">
                                <div className="Main-Course-Placements-Path-Steps-We-Follow-Left">
                                    <img src="/images/courses/Main-Course-Placements-Path-Steps-We-Follow-img.webp" loading='lazy'
                                        width="640" height="660"
                                        style={{ "maxWidth": "100%", "width": "auto", "height": "auto", "position": "relative" }}
                                        alt="Sticky Image" />
                                    <div className="Main-Course-Placements-Path-Steps-We-Follow-Left-Content">
                                        <h2 className="Main-Course-Placements-Path-Steps-We-Follow-Left-Content-Heading">Our Process
                                        </h2>
                                        <p className="Main-Course-Placements-Path-Steps-We-Follow-Left-Content-Para">Develop a solid
                                            foundation, gain hands-on experience, and refine your professional presence to
                                            transition from a learner to a high-demand ERP professional.</p>
                                        <div className="Main-Course-Placements-Path-Steps-We-Follow-Left-Content-Btn-Section">
                                            <button className="Main-Course-Placements-Path-Steps-We-Follow-Left-Content-Btn" onClick={(e) => openForm("Your Success Starts Here")}>Your
                                                Success Starts Here!</button>
                                            <i className="fa-solid fa-arrow-right Main-Course-CTA-arrow ms-2"></i>
                                        </div>
                                    </div>
                                </div>

                                <PlacementPathSteps data={courseData?.placementPath?.steps}></PlacementPathSteps>
                            </div>
                        </section>

                        <section>
                            <div className="Main-Course-Expert-Guidance-Heading-Section">
                                <Image loading='lazy' priority={false} src="/images/courses/Expert-Career-Guidance-Heading-Icon-1.svg"
                                    alt="Expert-Career-Guidance-Heading-Icon" className="Expert-Career-Guidance-Heading-Icon"
                                    height="49" width="47" />
                                <h2 className="Main-Course-Expert-Guidance-Main-Heading mb-0">Expert Career Guidance</h2>
                                <Image loading='lazy' priority={false} src="/images/courses/Expert-Career-Guidance-Heading-Icon-2.svg"
                                    alt="Expert-Career-Guidance-Heading-Icon" className="Expert-Career-Guidance-Heading-Icon"
                                    height="49" width="47" />
                            </div>
                            <div className="Main-Course-Expert-Guidance-Card-Section">
                                <div className="Main-Course-Expert-Guidance-Card">
                                    <Image loading='lazy' priority={false} src="/images/courses/Expert-Career-Guidance-Icon-1.svg"
                                        alt="Expert-Career-Guidance-Icon" height="32" width="32" />
                                    <p className="Main-Course-Expert-Guidance-Card-Para">Resume & Profile Building</p>
                                </div>
                                <div className="Main-Course-Expert-Guidance-Card">
                                    <Image loading='lazy' priority={false} src="/images/courses/Expert-Career-Guidance-Icon-2.svg"
                                        alt="Expert-Career-Guidance-Icon" height="32" width="32" />
                                    <p className="Main-Course-Expert-Guidance-Card-Para">Personalized Career Guidance</p>
                                </div>
                                <div className="Main-Course-Expert-Guidance-Card">
                                    <Image loading='lazy' priority={false} src="/images/courses/Expert-Career-Guidance-Icon-3.svg"
                                        alt="Expert-Career-Guidance-Icon" height="32" width="32" />
                                    <p className="Main-Course-Expert-Guidance-Card-Para">Industry-Specific Interview Prep</p>
                                </div>
                                <div className="Main-Course-Expert-Guidance-Card">
                                    <Image loading='lazy' priority={false} src="/images/courses/Expert-Career-Guidance-Icon-4.svg"
                                        alt="Expert-Career-Guidance-Icon" height="32" width="32" />
                                    <p className="Main-Course-Expert-Guidance-Card-Para">Mock Interviews & Feedback</p>
                                </div>
                                <div className="Main-Course-Expert-Guidance-Card">
                                    <Image loading='lazy' priority={false} src="/images/courses/Expert-Career-Guidance-Icon-5.svg"
                                        alt="Expert-Career-Guidance-Icon" height="32" width="32" />
                                    <p className="Main-Course-Expert-Guidance-Card-Para">Placement Assistance</p>
                                </div>
                            </div>
                        </section>

                        <section className="Main-Course-Hiring-Partners-Trusted-By-Top-Companies-Section">
                            <h2 className="Hiring-Partners-Trusted-By-Top-Companies-Heading mb-0 text-center">Our Hiring Partners
                            </h2>
                            {/* <h2 className="Hiring-Partners-Trusted-By-Top-Companies-Heading text-center">{courseData?.placementPath?.hiringPartnersTitle}</h2> */}
                            <div className="Hiring-Partners-Trusted-By-Top-Companies-track">
                                <div className="Hiring-Partners-Trusted-By-Top-Companies-slide" id="cardSliding">
                                    <div className="Hiring-Partners-Trusted-By-Top-Companies-slide-images" id="imageSetofCompanies">
                                        <Image src="/images/courses/C-AAIS-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-accenture-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-aingenious-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-AWC-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-cognizant-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-Dhanush-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-DOYENSYS-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-FORTINET-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-Lenovo-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-LTIMindtree-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-MOURITECH-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-Mphasis-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-NTTDATA-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-SLK-Icon.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-splashBI.png" width={254} height={88} alt="Company-Icon" />
                                        <Image src="/images/courses/C-TechMahindra-Icon.png" width={254} height={88} alt="Company-Icon" />

                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* <PlacementPathSuccessAlumni></PlacementPathSuccessAlumni> */}

                        <section className="Main-Course-CTA-banner5">
                            <div className="Main-Course-CTA-banner-content5">
                                <h2 className="Main-Course-CTA-banner-h5">
                                    {courseData?.placementPath?.startJourney?.title}
                                </h2>
                                <p className="Main-Course-CTA-banner-p5">
                                    {courseData?.placementPath?.startJourney?.shortDescription}
                                </p>
                                <button className="Main-Course-CTA-button5" onClick={(e) => openForm("Start Your Journey")}>
                                    <div className="Main-Course-CTA-button-dots_border5"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        className="Main-Course-CTA-button-sparkle5">
                                        <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                            fill="black"
                                            d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z">
                                        </path>
                                        <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                            fill="black"
                                            d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z">
                                        </path>
                                        <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                            fill="black"
                                            d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z">
                                        </path>
                                    </svg>
                                    <span className="Main-Course-CTA-button-text_button5">Start Your Journey</span>
                                </button>
                            </div>
                            <div className="Main-Course-CTA-img-section5">
                                <img loading='lazy' src="/images/courses/Main-Course-CTA-Banner-5.webp"
                                    alt="All-category-CTA-banner-img" className="img-fluid" width="345" height="480" style={{ "color": "transparent", "maxWidth": "100%", "width": "auto", "height": "auto" }} />
                            </div>
                        </section>

                        <ComapniesWaitngForYou data={courseData?.placementPath?.companiesWaitingForYou}></ComapniesWaitngForYou>
                    </section>

                    {jobTrendsNotRequired.indexOf(courseData?.id) == -1 && <JobTrends courseData={courseData} openForm={openForm}></JobTrends>}</>}
            </div>
            {loadBelowFold && <section className="Main-Course-Common-Sections">
                <section className="Main-Course-Success-Stories-Of-Our-Proud-Achievers-Section mt-1">
                    <h2 className="Main-Course-Success-Stories-Of-Our-Proud-Achievers-Heading text-center mb-2">
                        Success Stories of Our Proud Achievers
                    </h2>
                    <div className="Success-Stories-Of-Our-Proud-Achievers-track">
                        <div className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide"
                            id="successStoryCompaniesSection">
                            <div className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-images"
                                id="successStoryCompanies">
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-1.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-2.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-3.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-4.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-5.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-6.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-7.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-8.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-9.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-10.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-11.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-12.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-13.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                                <Image loading='lazy' priority={false} width={242} height={342} src="/images/courses/Success-Stories-Placed-Learner-14.webp"
                                    alt="Success-Stories-Img"
                                    className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="Main-Course-Badge-Of-Excellence-Section">
                    <div className="d-flex flex-column align-items-center">
                        <p className="Main-Course-Badge-Of-Excellence-Section-Detail">Certified Success</p>
                        <h2 className="Main-Course-Badge-Of-Excellence-Section-Heading text-center">
                            Earn Your Badge of Excellence
                        </h2>
                        <p className="Main-Course-Badge-Of-Excellence-Section-Para text-center">
                            {changedData?.certificationSectionSubHeading}
                        </p>
                    </div>

                    <div className="Main-Course-Badge-Of-Excellence-Section-Whole-Content">
                        <div className="Main-Course-Badge-Of-Excellence-Image-Section">
                            <Image src={`/images/courses/certificates/${courseData?.title?.replace(/\s*\+\s*/g, "_")?.replace(/\s_\s+/g, "_")}.webp`}
                                alt="Certificate-For-The-Badge-Of-Excellence-Img" loading='lazy' priority={false}
                                className="Main-Course-Badge-Of-Excellence-Section-Img" width="632" height="447" />
                            <button className="Main-Course-Badge-Of-Excellence-Sample-Certificate-btn"
                                aria-label="Download-brochure-btn" onClick={handleCertificateDownload}>
                                <p className="Main-Course-Badge-Of-Excellence-Sample-Certificate-download-icon">
                                    <svg className="Main-Course-Badge-Of-Excellence-Sample-Certificate-svgIcon-hero"
                                        viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z">
                                        </path>
                                    </svg>
                                    <span className="Main-Course-Badge-Of-Excellence-Sample-Certificate-icon2-hero"></span>
                                </p>
                                Download Sample Certificate
                            </button>
                        </div>
                        <div className="Main-Course-Badge-Of-Excellence-Card-Section">
                            <div className="Main-Course-Badge-Of-Excellence-Card">
                                <Image loading='lazy' priority={false} src="/images/courses/Main-Course-Badge-Of-Excellence-Card-Icon-1.svg"
                                    alt="Main-Course-Badge-Of-Excellence-Card-Icon"
                                    className="Main-Course-Badge-Of-Excellence-Card-Icon" height="32" width="32" />
                                <h3 className="Main-Course-Badge-Of-Excellence-Heading">Official Certification</h3>
                                <p className="Main-Course-Badge-Of-Excellence-Para">{changedData?.officialCertification}</p>
                            </div>
                            <div className="Main-Course-Badge-Of-Excellence-Card">
                                <Image loading='lazy' priority={false} src="/images/courses/Main-Course-Badge-Of-Excellence-Card-Icon-2.svg"
                                    alt="Main-Course-Badge-Of-Excellence-Card-Icon"
                                    className="Main-Course-Badge-Of-Excellence-Card-Icon" height="32" width="32" />
                                <h3 className="Main-Course-Badge-Of-Excellence-Heading">Industry Recognition</h3>
                                <p className="Main-Course-Badge-Of-Excellence-Para">{changedData?.industryRecognition}</p>
                            </div>
                            <div className="Main-Course-Badge-Of-Excellence-Card">
                                <Image loading='lazy' priority={false} src="/images/courses/Main-Course-Badge-Of-Excellence-Card-Icon-3.svg"
                                    alt="Main-Course-Badge-Of-Excellence-Card-Icon"
                                    className="Main-Course-Badge-Of-Excellence-Card-Icon" height="32" width="32" />
                                <h3 className="Main-Course-Badge-Of-Excellence-Heading">Verifiable & Shareable</h3>
                                <p className="Main-Course-Badge-Of-Excellence-Para">Receive a digital certificate with a unique
                                    verification link, allowing you to easily showcase your achievement on LinkedIn</p>
                            </div>
                            <div className="Main-Course-Badge-Of-Excellence-Card">
                                <Image loading='lazy' priority={false} src="/images/courses/Main-Course-Badge-Of-Excellence-Card-Icon-4.svg"
                                    alt="Main-Course-Badge-Of-Excellence-Card-Icon"
                                    className="Main-Course-Badge-Of-Excellence-Card-Icon" height="32" width="32" />
                                <h3 className="Main-Course-Badge-Of-Excellence-Heading">Career Advancement</h3>
                                <p className="Main-Course-Badge-Of-Excellence-Para">{changedData?.careerAdvancement}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {(courseData?.topCertifications?.title || courseData?.topCertifications?.certifications) && <TopCertifications data={courseData?.topCertifications}></TopCertifications>}

                <section className="Main-Course-Top-Industry-Professionals-Section">
                    <h2 className="Main-Course-Top-Industry-Professionals-Heading text-center mb-3">Insights from Top Industry
                        Professionals</h2>
                    <p className="Main-Course-Top-Industry-Professionals-Para text-center">“Trusted by Visionaries Who Drive
                        Supply Chain Innovation.<br />See Why They Recommend Our Course for Professionals Worldwide.”</p>
                    <div className="Main-Course-Top-Industry-Professional-section">
                        <div className="Main-Course-Top-Industry-Professional-profile-container">
                            <img loading='lazy' src="/images/courses/Main-Course-Top-Industry-Professionals-Img-1.png" alt="Person" className="Main-Course-Top-Industry-Professional-profile-img" />
                            <div className="Main-Course-Top-Industry-Professional-overlay">
                                <div className="Main-Course-Top-Industry-Professional-info">
                                    <div>
                                        <h3 className="Main-Course-Top-Industry-Professional-info-Person-Name">Deepak Bolia</h3>
                                        <div className="d-flex justify-content-center">
                                            <a href="https://www.linkedin.com/in/deepakbolia/" target="_blank" rel="noopener noreferrer" style={{ "color": "white", "textDecoration": "underline" }}>
                                                <Image loading='lazy' priority={false} height={40} width={40} src="/images/courses/Top-Professional-Linked-In-Icon.svg" alt="LinkedIn" className="Main-Course-Top-Industry-Professional-linkedin-icon" />
                                            </a>
                                            <p className="Main-Course-Top-Industry-Professional-info-Position-Name">Senior Manager <br /> at Accenture</p>
                                        </div>
                                    </div>

                                    <p className="Main-Course-Top-Industry-Professional-testimonial">
                                        “Tech Leads IT has been instrumental in training our freshers and helping them develop the necessary skills to excel in their roles. Their structured training programs, experienced trainers, and hands-on approach have made a significant impact on our teams.”
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="Main-Course-Top-Industry-Professional-profile-container">
                            <img loading='lazy' src="/images/courses/Main-Course-Top-Industry-Professionals-Img-2.png" alt="Person" className="Main-Course-Top-Industry-Professional-profile-img" />
                            <div className="Main-Course-Top-Industry-Professional-overlay">
                                <div className="Main-Course-Top-Industry-Professional-info">
                                    <div>
                                        <h3 className="Main-Course-Top-Industry-Professional-info-Person-Name">Prashant Ghatage</h3>
                                        <div className="d-flex justify-content-center">
                                            <a href="https://www.linkedin.com/in/prashantghatage/" target="_blank" rel="noopener noreferrer" style={{ "color": "white", "textDecoration": "underline" }}>
                                                <Image loading='lazy' priority={false} height={40} width={40} src="/images/courses/Top-Professional-Linked-In-Icon.svg" alt="LinkedIn" className="Main-Course-Top-Industry-Professional-linkedin-icon" />
                                            </a>
                                            <p className="Main-Course-Top-Industry-Professional-info-Position-Name">Manager HR <br /> at AAIS Global</p>
                                        </div>
                                    </div>
                                    <p className="Main-Course-Top-Industry-Professional-testimonial">
                                        “We often hire fresh graduates through off-campus drives, and Tech Leads IT has been our go-to training partner for transforming them into skilled professionals. Their well-structured curriculum, expert trainers, and flexible learning approach make a real difference.”
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="Main-Course-Top-Industry-Professional-profile-container">
                            <img loading='lazy' src="/images/courses/Main-Course-Top-Industry-Professionals-Img-3.png" alt="Person" className="Main-Course-Top-Industry-Professional-profile-img" />
                            <div className="Main-Course-Top-Industry-Professional-overlay">
                                <div className="Main-Course-Top-Industry-Professional-info">
                                    <div>
                                        <h3 className="Main-Course-Top-Industry-Professional-info-Person-Name">Vikram Simha</h3>
                                        <div className="d-flex justify-content-center">
                                            <a href="https://www.linkedin.com/in/vikram-simha-a0828a7/" target="_blank" rel="noopener noreferrer" style={{ "color": "white", "textDecoration": "underline" }}>
                                                <Image loading='lazy' priority={false} height={40} width={40} src="/images/courses/Top-Professional-Linked-In-Icon.svg" alt="LinkedIn" className="Main-Course-Top-Industry-Professional-linkedin-icon" />
                                            </a>
                                            <p className="Main-Course-Top-Industry-Professional-info-Position-Name">Delivery Manager <br />
                                                at ECS</p>
                                        </div>
                                    </div>

                                    <p className="Main-Course-Top-Industry-Professional-testimonial">
                                        “Continuous learning is key to staying ahead, and Tech Leads IT excels in upskilling and cross-skilling our workforce. Their flexible course structure, real-time project exposure, and high-quality content make them an ideal training partner for career progression.”
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                <RelatedCourses courses={relatedCourses} courseTax={courseTax}></RelatedCourses>

                <Faqs data={courseData?.faqs} openForm={openForm}></Faqs>

                <RelatedBlogs blogs={relatedBlogs}></RelatedBlogs>

                <SubscribeNewsLetters></SubscribeNewsLetters>

                <section className="Main-Course-Get-In-Touch-Section">
                    <div style={{ "flex": "1.5" }}>
                        <h2 className="Main-Course-Get-In-Touch-Heading">Get in touch</h2>
                        <p className="Main-Course-Get-In-Touch-Para">Have questions or need assistance? Reach out to us via
                            email or call our support team. We're here to help!"</p>
                    </div>
                    <div style={{ "flex": "2" }}>
                        <div className="row">
                            <div className="col-md-6">
                                <a href="mailto:info@techleadsit.com" style={{ textDecoration: "none" }}>
                                    <div className="d-flex align-items-center gap-2 mt-3">
                                        <Image loading='lazy' priority={false} src="/images/courses/Main-Course-Get-In-Touch-Mail-Us-Icon.svg"
                                            alt="Mail-Us-Icon" height="56" width="56" className="Main-Course-Get-In-Touch-Icon-S" />
                                        <div>
                                            <h3 className="Main-Course-Get-In-Touch-Segment-Heading">Our mail address</h3>
                                            <p className="Main-Course-Get-In-Touch-Segment-Para">info@techleadsit.com</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="col-md-6">
                                <div className="d-flex align-items-center gap-2 mt-3">
                                    <Image loading='lazy' priority={false} src="/images/courses/Main-Course-Get-In-Touch-Call-Us-Icon.svg"
                                        alt="Call-Us-Icon" height="56" width="56" className="Main-Course-Get-In-Touch-Icon-S" />
                                    <div>
                                        <h3 className="Main-Course-Get-In-Touch-Segment-Heading">Our Contact info</h3>
                                        <p className="Main-Course-Get-In-Touch-Segment-Para"><a href="tel:+918125323232" style={{ textDecoration: "none" }}>+91 8125323232</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a href="https://maps.app.goo.gl/MdpESQfm7xGgP7pw7" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                            <div className="d-flex align-items-start gap-2 mt-3">
                                <Image loading='lazy' priority={false} alt="Location-Icon" height="56" width="56" className="Main-Course-Get-In-Touch-Icon-S" src="/images/courses/Main-Course-Get-In-Touch-Our-Location-Icon.svg" />
                                <div>
                                    <h3 className="Main-Course-Get-In-Touch-Segment-Heading">Our address</h3>
                                    <p className="Main-Course-Get-In-Touch-Segment-Para">4th Floor, Eashan Arcade, Plot no 3-164, Trendz Arcade, Kavuri Hills Road, Doctor's Colony, Hyderabad, Telangana 500033</p>
                                </div>
                            </div>
                        </a>
                    </div>

                </section>
            </section>}
        </main>

        {quickPaymentVisibility && <QuickPayment></QuickPayment>}

        {formVisibility && <><div className="Main-Course-Overlay"></div>
            <CourseRegistrationForm
                overlayRef={overlayRef}
                visible={formVisibility}
                fields={formFields}
                heading={heading}
                buttonLabel={buttonLabel}
                hidePopupForm={hidePopupForm}
                pageName="course"
                courseTitle={courseData?.title}
                courseId={courseData?.id}
                onSuccess={(data) => {
                    //console.log("Success!", data);
                    handleUserDetailsSubmissionStatus(true);
                    if (formSuccessCallback) {
                        formSuccessCallback(data); // ← This must be triggered here
                        setFormSuccessCallback(null); // reset after call
                    }
                }}
            ></CourseRegistrationForm></>}
        {detailsSubmitted && <><div className="Main-Course-Overlay"></div><AlreadySubmitted handleDetailsSubmitted={handleDetailsSubmitted}></AlreadySubmitted></>}
    </>)
}

export default CoursePage;