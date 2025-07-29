import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
const VideoPlayerPopup = React.lazy(() => import('./VideoPopupPlayer'));
import Image from "next/image"; // Importing Image component from next.js for optimized image handling
const InstructorTestimonials = React.memo(({ data }) => {

    function groupTestimonialsIntoSets(data) {
        const text = data.filter(t => t.testimonialType.toLowerCase() === 'text');
        const video = data.filter(t => t.testimonialType.toLowerCase() === 'video');

        const sets = [];
        let textIndex = 0;
        let videoIndex = 0;

        while (textIndex < text.length || videoIndex < video.length) {
            const set = [];

            // Add 2 text testimonials
            for (let i = 0; i < 2 && textIndex < text.length; i++) {
                set.push(text[textIndex++]);
            }

            // Add 1 video testimonial if available
            if (videoIndex < video.length) {
                set.push(video[videoIndex++]);
            }

            sets.push(set);
        }

        return sets;
    }

    const rearrangedTestimonials = useMemo(() => groupTestimonialsIntoSets(data), [data]);

    const [activeVideoIndex, setActiveVideoIndex] = useState(null);
    const videoRefs = useRef({});

    const showPopup = useCallback((index) => {
        setActiveVideoIndex(index);
        setOpenVideoPopup(prev => !prev);
    }, []);

    const handleOpenVideoPopup = () => {
        setOpenVideoPopup(prev => !prev);
    }

    const [openVideoPopup, setOpenVideoPopup] = useState(false);

    const getVideoType = (path) => {
        const ext = path.split('.').pop().toLowerCase();
        //console.log(path, ext);
        switch (ext) {
            case 'mp4':
                return 'video/mp4';
            case 'webm':
                return 'video/webm';
            case 'ogg':
                return 'video/ogg';
            default:
                return 'video/mp4'; // Fallback
        }
    };

    const locationLinks = {
        "Tanvi Srivastava": "https://maps.app.goo.gl/Y2quqG1XVGEKqhLF8",
        "Umashankar M": "https://maps.app.goo.gl/f3sH1GvWfGw59gBR9",
        "Ratheesh Poshala": "https://maps.app.goo.gl/CAzYtE8NMrzVzgqE6",
        "Velmurugan M": "https://maps.app.goo.gl/77awnEjxonY7gwpa6",
        "Divakar Buddiga": "https://maps.app.goo.gl/uZSRFMsqJUBh6Ppj6",
        "Sudarshan kawade": "https://maps.app.goo.gl/vCnHhKN9xxpRN85r9",
        "Kodamati Sai": "https://g.co/kgs/BBuz2Hz",
        "Anthony Hanatiffe": "https://g.co/kgs/sRU1grb",
        "Darelli Mohankumar": "https://g.co/kgs/BjXNAos",
        "Georgina Marku Tyson": "https://g.co/kgs/GhTGAes",
        "Sai Rupa": "https://g.co/kgs/EbLQmtE",
        "Yogeesh p": "https://g.co/kgs/bSZ4cq6",
        "Matheen Md": "https://g.co/kgs/YNWReJZ",
        "Kasi Reddy P": "https://g.co/kgs/JMY55ia",
        "Jagadeesh Mulaparthi": "https://g.co/kgs/QwVBv6J",
        "Mayuri Bhuvad": "https://g.co/kgs/cZaZb2t",
        "Karthik Sanga": "https://g.co/kgs/UmPwRXo",
        "Venkata Surya Prasad Palivela": "https://g.co/kgs/f2jS6CQ",
        "Hema Kumar": "https://g.co/kgs/b58tBRj",
        "Vaishali Purohit": "https://g.co/kgs/pVLskKS",
        "Rajneesh Kumar": "https://g.co/kgs/HyVbgJZ",
        "Anandakumar Chandrasekaran": "https://g.co/kgs/7f7JMUV",
        "Shrikant Karhale": "https://g.co/kgs/UmPwRXo",
        "Sudheer Devarasetty": "https://maps.app.goo.gl/cpTaHZAayAUHnm5A8",
        "Prathap": "https://maps.app.goo.gl/YtY4Fo2S7N3CLWRr6",
        "Sathish": "https://www.trustpilot.com/reviews/6822d2339247edc405e54fb8",
        "Prakash": "https://maps.app.goo.gl/3vq84fGPuxk9b2kf9",
        "Divya Madhavi": "https://maps.app.goo.gl/4JHyD6V39h12Sjt56",
        "Rohith": "https://maps.app.goo.gl/MKRhnKYwikWydKJ98"
    };

    const getLinkByName = (name) => {
        return locationLinks[name] || "Link not found";
    };

    // Carousel state
    const [scrollIndex, setScrollIndex] = useState(0);
    const containerRef = useRef(null);
    const [maxScrollIndex, setMaxScrollIndex] = useState(0);

    useEffect(() => {
        // Calculate max scroll index based on container and item widths
        const container = containerRef.current;
        if (container && container.children.length > 0) {
            const visibleWidth = container.offsetWidth;
            const itemWidth = container.children[0].offsetWidth;
            const totalItems = rearrangedTestimonials.length;
            const maxIndex = Math.max(0, totalItems - Math.floor(visibleWidth / itemWidth));
            setMaxScrollIndex(maxIndex);
        }
    }, [rearrangedTestimonials]);

    const handlePrev = () => {
        setScrollIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setScrollIndex((prev) => Math.min(maxScrollIndex, prev + 1));
    };

    useEffect(() => {
        // Scroll to the correct position
        const container = containerRef.current;
        if (container && container.children.length > 0) {
            const itemWidth = container.children[0].offsetWidth;
            container.scrollTo({
                left: scrollIndex * itemWidth,
                behavior: "smooth"
            });
        }
    }, [scrollIndex]);


    return (
        <section className="Main-Course-Hear-From-Our-Learners-Section">
            <h2 className="Main-Course-Hear-From-Our-Learners-Heading text-center">Hear From Our Learners</h2>
            <p className="Main-Course-Hear-From-Our-Learners-Para text-center">Explore inspiring stories from our
                students as they share their learning experiences, growth, and success. Their journeys highlight
                the impact of our programs.</p>
            <div style={{ position: "relative" }}>
                <button className={`carousel-button main-course-testimonial-carousel-button left ${scrollIndex === 0 ? 'disabled' : 'active-pagination-button'}`} disabled={scrollIndex === 0} onClick={() => handlePrev()}>&#10094;</button>
                <div className="image-container content1 d-flex">

                    <div className="video-container VC-Scroller" ref={containerRef}>
                        {rearrangedTestimonials.map((group, i) => {
                            const videoItem = group.find(item => item.testimonialType === 'Video');

                            return (
                                <div key={i} className="testimonial-set-wrapper d-flex">
                                    <div className="d-fl-just-between">
                                        {group
                                            .filter(item => item.testimonialType === 'Text')
                                            .map((item, j) => (
                                                <div className="testimonial-content" key={j}>
                                                    <a
                                                        href={getLinkByName(item?.studentName)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img
                                                            src="/images/courses/Google-Icon.svg"
                                                            alt="Google Map Icon"
                                                            height="22"
                                                            width="22"
                                                            className="Main-Course-Hear-From-Our-Students-Card-Source-Icon"
                                                            loading='lazy'
                                                        />
                                                    </a>

                                                    <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Hear-From-Our-Learners-Colon-Icon.svg"
                                                        alt="Colon-Image" height="16" width="16" />
                                                    <p className="C-Webinar-Page-testimonial-para"> {item?.review}</p>

                                                    <div className="d-flex align-items-center mt-2">
                                                        <Image priority={false} loading="lazy" src={item?.imagePath}
                                                            alt="Learner-Image" height="40" width="40" />
                                                        <div className="d-flex flex-column role-adj">
                                                            <span className="role-h">{item?.studentName}</span>
                                                            <p className="role">{item?.designation}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                    {/* Video Testimonial */}
                                    {videoItem && (
                                        <div className="individual-vd">
                                            <div className="testimonial-image cursor-pointer" onClick={() => showPopup(i)}>
                                                <img  loading="lazy"
                                                    src={videoItem.thumbnailPath}
                                                    alt="Testimonial Video"
                                                    className="testimonial-image"
                                                />
                                                <div style={{ position: "absolute", bottom: "10px", left: "10px", zIndex: 9 }}>
                                                    <Image
                                                        priority={false} loading="lazy"
                                                        src="/images/courses/Main-Course-Hear-From-Our-learners-Play-Btn.svg"
                                                        alt="Play Button"
                                                        width="32"
                                                        height="32"
                                                        className="Main-Course-Hear-From-Our-Learners-V-play-button-img"
                                                        style={{ cursor: "pointer" }}
                                                    />
                                                    <div className="snack-bar">
                                                        <p className="snackbar-heading">{videoItem.studentName}</p>
                                                        <p className="snackbar-para">{videoItem.designation}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Popup only for current active video */}
                                            {activeVideoIndex === i && (
                                                <VideoPlayerPopup openVideoPopup={openVideoPopup} handleOpenVideoPopup={handleOpenVideoPopup} videoPath={videoItem.reviewVideoPath} videoType={getVideoType(videoItem.reviewVideoPath)}></VideoPlayerPopup>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button className={`carousel-button main-course-testimonial-carousel-button right ${scrollIndex === maxScrollIndex ? 'disabled' : 'active-pagination-button'}`} disabled={scrollIndex === maxScrollIndex} onClick={() => handleNext()}>&#10095;</button>

            </div>
            <div className="Main-Course-Hear-From-Our-Students-Source-B-Card-Section">
                <a href="https://www.trustpilot.com/review/techleadsit.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div className="Main-Course-Hear-From-Our-Students-Source-B-Card">
                        <Image priority={false} loading="lazy" alt="Source-Card" height="60" width="60" src="/images/courses/Main-Course-Hear-From-Our-Students-Source-Card-Logo-1.svg" />
                        <div>
                            <h3 className="Main-Course-Hear-From-Our-Students-Source-Card-B-heading">Trustpilot</h3>
                            <p className="Main-Course-Hear-From-Our-Students-Source-Card-B-para">Rated 4.6/5 (34)</p>
                        </div>
                    </div>
                </a>

                <a href="https://www.justdial.com/Hyderabad/Tech-Leads-IT-Closed-Down-Sanjeeva-Reddy-Nagar/040PXX40-XX40-130607180326-Q8F9_BZDET?trkid=2801546655-fcomp&term=tech%20leads%20it&ncatid=&area=Sardar%20Patel%20Nagar&search=Showing%20Results%20for%20%22Tech%20Leads%20It%22%20in%20Sardar%20Patel%20Nagar,%20Hyderabad&mncatname=tech%20leads%20it&abd_btn=&abd_heading=&isFreetxt=1&bd=2&cat_b2b_flag=&searchfrom=lst" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div className="Main-Course-Hear-From-Our-Students-Source-B-Card">
                        <Image priority={false} loading="lazy" alt="Source-Card" height="60" width="60" src="/images/courses/Main-Course-Hear-From-Our-Students-Source-Card-Logo-2.svg" />
                        <div>
                            <h3 className="Main-Course-Hear-From-Our-Students-Source-Card-B-heading">Justdial</h3>
                            <p className="Main-Course-Hear-From-Our-Students-Source-Card-B-para">Rated 4.8/5 (1066)</p>
                        </div>
                    </div>
                </a>

                <a href="https://g.co/kgs/hN1zAky" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div className="Main-Course-Hear-From-Our-Students-Source-B-Card">
                        <Image priority={false} loading="lazy" alt="Source-Card" height="60" width="60" src="/images/courses/Main-Course-Hear-From-Our-Students-Source-Card-Logo-3.svg" />
                        <div>
                            <h3 className="Main-Course-Hear-From-Our-Students-Source-Card-B-heading">Google</h3>
                            <p className="Main-Course-Hear-From-Our-Students-Source-Card-B-para">Rated 4.8/5 (867)</p>
                        </div>
                    </div>
                </a>
            </div>
        </section >
    )
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

export default InstructorTestimonials;