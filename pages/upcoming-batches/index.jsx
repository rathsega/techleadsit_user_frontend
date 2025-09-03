import React, { useState, useEffect, useRef, useCallback, act } from "react";
import httpService from './../../services/httpService';
import CourseRegistrationForm from '../../components/course/RegistrationForm';
import AlreadySubmitted from '../blog/details/already_submitted'
import { useExpiringLocalStorage } from '../../services/useExpiringLocalStorage'
import YoutubeVideoPopupPlayer from './../../components/course/YoutubeVideoPopupPlayer';
import { useLoader } from "../../contexts/LoaderContext";

const UpcomingBatches = () => {
    const [webinars, setWebinars] = useState([]);
    const [batches, setBatches] = useState([]);
    const overlayRef = useRef(null);
    const { setLoading } = useLoader();

    const formConfigs = {
        "Enroll Now": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Enroll Form",
            buttonLabel: "Enroll Now",
        },
        "Watch Video": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Watch Video",
            buttonLabel: "Watch Now",
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await httpService.get('/webinar/getActiveWebinars');
                setLoading(false)
                console.log(response.data);
                setWebinars(response.data);
            } catch (error) {
                setLoading(false)
                console.error('Error fetching upcoming batches:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await httpService.get('/course/getUpComingDemoDates');
                setLoading(false)
                console.log(response.data);
                setBatches(response.data);
            } catch (error) {
                setLoading(false)
                console.error('Error fetching upcoming batches:', error);
            }
        };

        fetchData();
    }, [])

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    function formatTimeRange(dateStr, durationMinutes) {
        const start = new Date(dateStr);
        const end = new Date(start.getTime() + durationMinutes * 60000);

        const formatTime = (date) =>
            date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });

        return `${formatTime(start)} - ${formatTime(end)}`;
    }

    const [formFields, setFormFields] = useState([]);
    const [heading, setHeading] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [formVisibility, setFormVisibility] = useState(false);
    const [formSuccessCallback, setFormSuccessCallback] = useState(null);
    const [detailsSubmitted, setDetailsSubmitted] = useState(false);
    const [youtibeopenVideoPopup, setYoutibeopenVideoPopup] = useState(false);
    const [videoPath, setVideoPath] = useState("");
    const [courseTitle, setCourseTitle] = useState("");
    const [slug, setSlug] = useState("");

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

    const handleCTA = (action, title = null, slug= null) => {

        const config = formConfigs[action];
        console.log(action, config);
        if (userDetails) {
            if(action === "Watch Video"){
                setYoutibeopenVideoPopup(true);
            }else{
            setDetailsSubmitted(true);
            }
        } else {
            if (config) {
                setFormFields(config.fields);
                setHeading(config.heading);
                setButtonLabel(config.buttonLabel);
                setFormVisibility(true);
                if(title){
                    setCourseTitle(title);
                }else{
                    setCourseTitle("");
                }
                if(slug){
                    setSlug(slug);
                }else{
                    setSlug("");
                }
            }
        }
    };

    const handleYoutibeOpenVideoPopup = () => {
        setYoutibeopenVideoPopup(prev => !prev)
    }

    const getVideoPath = async (slug) => {
        try {
            slug = slug.split('/');
            const course_data_filename = slug.join('_');
            const response = await fetch(`/data/${course_data_filename}.json`);
            const data = await response.json();
            setVideoPath(data?.curriculum?.demoVideoPath);
        } catch (error) {
            console.error('Error fetching video path:', error);
        }
    };

    const handleWatchDemoVideo = useCallback(async (slug) => {
        await getVideoPath(slug);
        if (userDetails) {
            handleYoutibeOpenVideoPopup();
        } else {
            handleCTA("Watch Video");
        }
    }, []);

    
    const handleUserDetailsSubmissionStatus = (status) => {
        if (status) {
            setTimeout(() => { hidePopupForm() }, 3000)
        }
    }


    return (
        <section>
            <div className="Main-Course-Upcoming-Batches-Banner-section">
                <div className="Main-Course-Upcoming-Batches-Banner-Content-Section">
                    <div className="Main-Course-Upcoming-Batches-Banner-Sub-Content-Section">
                        <h1 className="Main-Course-Upcoming-Batches-banner-section-h1">Upcoming Batches & Events</h1>
                        <p className="Main-Course-Upcoming-Batches-Banner-Para-2">Explore our latest training batches and live
                            events. Reserve your spot today and take the next step in your tech journey.</p>
                    </div>
                    <img src="/images/upcoming-batches/Upcoming-Batches-Banner-Bg-Icon.svg" alt="C-P-Banner-Img"
                        className="Main-Course-Upcoming-Batches-banner-section-img Icon-floating-H" />
                </div>
            </div>
            <section className="Upcoming-Batches-Content-section">
                <div>
                    <h2 className="Upcoming-Batches-Cards-Heading">Upcoming Batches</h2>
                    <div className="Upcoming-Batches-Cards-Section">
                        {
                            batches?.map((batch, key) => {
                                return (
                                    <div className="Upcoming-Batches-card" key={key}>
                                        <div className="Upcoming-Batches-image">
                                            <img src={process.env.NEXT_PUBLIC_FILES_URL + batch?.thumbnail} alt={batch?.basic?.title} />
                                        </div>
                                        <div className="Upcoming-Batches-details">
                                            <div>
                                                <div className="Upcoming-Batches-title">{batch?.title}</div>
                                                <div className="Upcoming-Batches-info">
                                                    <p>Start Date: <span id="start-date">{formatDate(batch?.demo?.date)}</span></p>
                                                    <p>Mode: <span id="mode">{batch?.demo?.demoMode}</span></p>
                                                    <p>Zoom ID: <span id="zoom-id">{batch?.demo?.zoomId}</span></p>
                                                    <p>Password: <span id="password">{batch?.demo?.password}</span></p>
                                                </div>
                                            </div>
                                            <div className="Upcoming-Batches-actions">
                                                <button className="Upcoming-Batches-btn Upcoming-Batches-btn-enroll" onClick={() => handleCTA('Enroll Now', batch?.title, batch?.slug)}>Enroll Now</button>
                                                <button className="Upcoming-Batches-btn Upcoming-Batches-btn-sample" onClick={() => handleWatchDemoVideo(batch?.slug)}><i className="fa-solid fa-circle-play"></i> Sample Video</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }


                    </div>
                </div>

                {webinars && webinars.length > 0 && <div className="mt-4">
                    <h2 className="Upcoming-Batches-Cards-Heading">Upcoming Events</h2>
                    <div className="Upcoming-Batches-Cards-Section">
                        {
                            webinars?.map((webinar) => (
                                <div className="Upcoming-Batches-card" key={webinar._id}>
                                    <div className="Upcoming-Batches-image">
                                        <img src={process.env.NEXT_PUBLIC_FILES_URL + webinar?.hero?.thumbnail?.path} alt={`${webinar?.hero?.titleOne + ' ' + webinar?.hero?.titleTwo}`} />
                                    </div>
                                    <div className="Upcoming-Batches-details">
                                        <div>
                                            <div className="Upcoming-Batches-title">{webinar?.hero?.titleOne + ' ' + webinar?.hero?.titleTwo}</div>
                                            <div className="Upcoming-Batches-info">
                                                <p>Start Date: <span id="start-date">{formatDate(webinar?.hero?.date)}</span></p>
                                                <p>Mode: <span id="mode">{webinar?.hero?.mode}</span></p>
                                                <p>Time: <span id="time">{formatTimeRange(webinar?.hero?.date, webinar?.hero?.duration)}</span></p>
                                            </div>
                                        </div>
                                        <div className="Upcoming-Batches-actions">
                                            <button className="Upcoming-Batches-btn Upcoming-Batches-btn-enroll" onClick={() => window.open(`/webinar/${webinar?._id}`, "_blank")}>Enroll Now</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>}
            </section>
            {formVisibility && <><div className="Main-Course-Overlay"></div><CourseRegistrationForm
                overlayRef={overlayRef}
                visible={formVisibility}
                fields={formFields}
                heading={heading}
                buttonLabel={buttonLabel}
                hidePopupForm={hidePopupForm}
                pageName={"upcoming_demo - " + courseTitle}
                courseTitle={courseTitle}
                courseSlug={slug}
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
            {youtibeopenVideoPopup && <YoutubeVideoPopupPlayer videoPath={videoPath} youtibeopenVideoPopup={youtibeopenVideoPopup} handleYoutibeOpenVideoPopup={handleYoutibeOpenVideoPopup}></YoutubeVideoPopupPlayer>}
        </section>
    )
};

export default UpcomingBatches;