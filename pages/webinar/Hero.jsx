import React, { useState, useEffect } from 'react';
import httpService from "./../../services/httpService";
import Popupform from './popupform'

const studentImages = [
    { src: "/images/webinar_page_asstes/hero_section10kstudents_pic1.jpg", translateX: 0, alt: 'Student' },
    { src: "/images/webinar_page_asstes/hero_section10kstudents_pic2.jpg", translateX: -20, alt: 'Student' },
    { src: "/images/webinar_page_asstes/hero_section10kstudents_pic3.jpg", translateX: -40, alt: 'Student' },
    { src: "/images/webinar_page_asstes/hero_section10kstudents_pic4.jpg", translateX: -60, alt: 'Student' },
    { src: "/images/webinar_page_asstes/hero_section10kstudents_pic5.jpg", translateX: -80, alt: 'Student' },
];

const Hero = ({ details }) => {

    // State to store hours, minutes, and seconds
    const [timeLeft, setTimeLeft] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    const [showPopupform, setShowPopupform] = useState(false)
    const [imageSrc, setImageSrc] = useState("");
    useEffect(() => {
        const target = new Date(details?.date).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = target - now;
            if (difference <= 0) {
                setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
                return;
            }

            const days = Math.floor((difference / (1000 * 60 * 60)) / 24);
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24) + (days * 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({
                hours: String(hours).padStart(2, "0"),
                minutes: String(minutes).padStart(2, "0"),
                seconds: String(seconds).padStart(2, "0"),
            });
        };

        // Run the update every second
        const timer = setInterval(updateTimer, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(timer);
    }, [details?.date]);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await await httpService.post('fileupload/fetchFile', { filePath: details?.image?.path });
                /*if (!response) throw new Error("Failed to fetch image");
                const blob = await response.blob();
                setImageSrc(URL.createObjectURL(blob));*/
                // setImageSrc('http://localhost:5000/uploads/hero/1737357396271-d1a9055d3993.jpg');
                const blobData = response.data;
                //console.log(response);
                if (blobData.data) {
                    setImageSrc(`data:${blobData.type};base64,${blobData.data}`);
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        //fetchImage();
    }, [details?.image?.path]);

    const handlePopupformVisibility = () => {
        setShowPopupform(!showPopupform);
    }

    return (

        <>
            <section className="C-Webinar-Page-hero" id="Home">
                <div className="row d-flex">
                    <div className="col-md-7">
                        <div className="C-Webinar-Page-content p-sm-2 mt-4 margin-top-sm-0">
                            <h1>{details?.title}</h1>
                            <p className='w-80'>
                                {details?.tagline}
                            </p>
                            <div className="t-al-cen">
                                <p className='webinar-info'>Webinar Starts In
                                </p>
                                <div className="C-Webinar-Page-countdown">

                                    <div  className="text-left">
                                        <span id="hours">{timeLeft.hours}</span>
                                        <p>Hours</p>
                                    </div>
                                    <div  className="text-left">
                                        <span id="minutes">{timeLeft.minutes}</span>
                                        <p>Minutes</p>
                                    </div>
                                    <div  className="text-left">
                                        <span id="seconds">{timeLeft.seconds}</span>
                                        <p>Seconds</p>
                                    </div>
                                </div>

                                <button onClick={handlePopupformVisibility} className="C-Webinar-Page-register-btn">Register Now!!</button>
                            </div>
                            <div className="d-flex mb-none mb-3 mt-2rem-hero mt-1-rem-hero">
                                <div className="C-Webinar-Page-students">
                                    {studentImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image.src}
                                            alt={image.alt}
                                            style={{ transform: `translateX(${image.translateX}px)` }}
                                        />
                                    ))}



                                </div>
                                <div className="d-grid " style={{ "transform": "translateX(-55px)" }}>
                                    <span style={{ fontSize: `1rem` }}>10K+ Students</span>
                                    <span style={{ fontSize: `0.7rem` }}>Over 10,000+ Learners Elevating Their Careers!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 C-Webinar-Page-hero-img-X p-md-0 image-align">
                        <div className="C-Webinar-Page-image">
                            <img src={process.env.NEXT_PUBLIC_FILES_URL + details?.image?.path} className="C-Webinar-Page-hero-img" alt="Webinar Image" />
                        </div>
                    </div>
                </div>



            </section>
            {showPopupform && <Popupform handlePopupformVisibility={handlePopupformVisibility}></Popupform>}
        </>
    );
}

export default Hero;