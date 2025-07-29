import React, { useEffect, useState, useRef } from 'react';
import httpService from '../../services/httpService'
import VideoTestimonialPopup from './VideoTestimonialPopup'
import TestimonialReadMorePopup from './TestimonialReadMorePopup';

const Testimonials = ({ details }) => {
    const imageContainerRef = useRef(null);
    const indicatorsRef = useRef([]);
    const [imageSrc, setImageSrc] = useState([]);
    const [groupedData, setGroupedData] = useState([]);
    const [openVideoPopup, setOpenVideoPopup] = useState(false);
    const [videoPath, setVideoPath] = useState('');
    const [videoType, setVideoType] = useState('');

    const [textPopupVisibility, setTextPopupVisibility] = useState(false);
    const [textPopupData, setTextPopupData] = useState({});

    const handleTextPopupVisibility = () => {
        setTextPopupVisibility(prev => !prev)
    }

    useEffect(() => {
        const formatTestimonialData = () => {
            const groupedData = [];
            const videoItems = [];
            const textItems = [];

            // Separate the data into video and text arrays
            for (const item of details) {
                if (item.type === "video") {
                    videoItems.push(item);
                } else if (item.type === "text") {
                    textItems.push(item);
                }
            }

            // Form groups of 1 video + 2 text
            while (videoItems.length > 0 && textItems.length >= 2) {
                const group = [
                    videoItems.shift(),  // take 1 video
                    textItems.shift(),   // take 2 texts
                    textItems.shift()
                ];
                groupedData.push(group);
            }

            //console.log(groupedData);
            setGroupedData(groupedData);
        };



        const fetchWhyAttendIcons = async () => {
            try {
                // Extract the file paths from details
                let imagePaths = [];
                imagePaths = details
                    ?.filter(detail => detail?.image?.path) // Filter out details with image paths
                    ?.map(detail => detail?.image?.path);  // Extract only the image paths

                const videoPaths = details
                    ?.filter(detail => detail?.type === "video" && detail?.video?.path) // Filter only video types with video paths
                    ?.map(detail => detail?.video?.path);

                // Make the API call
                const response = await httpService.post('fileupload/fetchFiles', { filePaths: imagePaths });

                if (response.data) {
                    // Map the response to base64 image sources
                    const newImageSrcs = response.data.map((fileSrc, index) => ({
                        [imagePaths[index]]: `data:${fileSrc.type};base64,${fileSrc.data}`
                    }));
                    //console.log(newImageSrcs);
                    // Update the state with all new icons at once
                    setImageSrc(prevImageSrc => [...prevImageSrc, ...newImageSrcs]);
                    formatTestimonialData();
                } else {
                    console.error('No data received from the API');
                }
            } catch (error) {
                console.error('Error fetching icons:', error);
            }
        };

        const handleScrollEvent = () => {
            const imageContainer = imageContainerRef.current;
            if (!imageContainer) return; // Ensure the element exists

            const totalContainers = document.querySelectorAll('.video-container').length;

            const handleScroll = () => {
                //console.log('scrolling');
                const scrollWidth = imageContainer.scrollWidth - imageContainer.clientWidth;
                const scrollLeft = imageContainer.scrollLeft;
                const activeIndex = Math.round((scrollLeft / scrollWidth) * (totalContainers - 1));

                indicatorsRef.current.forEach((indicator, index) => {
                    if (indicator) {
                        indicator.classList.toggle('active', index === activeIndex);
                    }
                });
            };

            imageContainer.addEventListener('scroll', handleScroll);

            return () => {
                imageContainer.removeEventListener('scroll', handleScroll);
            };
        }

        handleScrollEvent();
        formatTestimonialData();
        //fetchWhyAttendIcons();
    }, [details]);

    const handleIndicatorClick = (index) => {
        const imageContainer = imageContainerRef.current;
        if (!imageContainer) return; // Ensure the element exists

        const totalContainers = document.querySelectorAll('.video-container').length;
        const scrollWidth = imageContainer.scrollWidth / totalContainers;

        imageContainer.scrollTo({
            left: scrollWidth * index,
            behavior: 'smooth',
        });
    };

    const getImageSrc = (key) => {
        const foundItem = imageSrc.find((obj) => obj[key] !== undefined);
        return foundItem ? foundItem[key] : null; // Return the value if found, otherwise null
    };

    const playVideoTestimonial = (video) => {
        setVideoPath(video.path);
        setVideoType(video.type);
        setOpenVideoPopup(true);
    }

    //console.log(details)

    return (
        <section style={{ "padding": "30px 0px" }} id="Testimonials">
            <h1 className="C-Webinar-Page-attendees">What Our Attendees Say</h1>
            <p className="C-Webinar-Page-attendees-para mt-4">Hear from our past participants about their experiences and how this webinar has helped
                them advance their careers</p>
            <div className="image-container content1 d-flex pt-4" ref={imageContainerRef}>
                {groupedData.map((set, index) => (
                    <div className="video-container" key={index}>
                        {set.map((item, subIndex) => {
                            if (item.type === "video") {
                                return (
                                    <React.Fragment key={item._id}>
                                        <div className="individual-vd">
                                            <div className="C-Webinar-testimonial-image">
                                                <img src={process.env.NEXT_PUBLIC_FILES_URL + item?.image?.path} style={{ height: 'auto' }} className="C-Webinar-testimonial-image" alt="Testimonial Video" />
                                                <img src="/images/webinar_page_asstes/play-button.png" onClick={(e) => playVideoTestimonial(item.video)} className="C-Webinar-play-btn-img" alt="Play Button" />
                                            </div>
                                        </div>


                                        <div className="snack-bar">
                                            <p className="snackbar-heading">{item.name}</p>
                                            <p className="snackbar-para">{item.designation}</p>
                                        </div>
                                    </React.Fragment>
                                );
                            }
                            return null;
                        })}

                        <div className="d-fl-just-between">
                            {set.map((item, subIndex) => {
                                if (item.type === "text") {
                                    return (
                                        <div className="C-Webinar-Page-testimonail-content" key={item._id}>
                                            <img src="/images/webinar_page_asstes/Vector.png" alt="Vector Icon" />
                                            <p className="C-Webinar-Page-testimonial-para">{item.review}</p>
                                            <span className="C-Webinar-Page-read-more-btn" onClick={(e) => { setTextPopupData(item); setTextPopupVisibility(!textPopupVisibility); }}>Read More</span>
                                            <div className="d-flex align-items-center">
                                                <img src={process.env.NEXT_PUBLIC_FILES_URL + item?.image?.path} alt="Reviewer" />
                                                <div className="d-flex flex-column C-Webinar-Page-role-adj">
                                                    <span className="C-Webinar-Page-role-h">{item.name}</span>
                                                    <p className="C-Webinar-Page-role">{item.designation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                ))}

            </div>

            <div className="indicators-container">
                {groupedData.length > 2 && [...Array(groupedData.length - 1)].map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${index === 0 ? 'active' : ''}`}
                        onClick={() => handleIndicatorClick(index)}
                        ref={(el) => (indicatorsRef.current[index] = el)}
                    ></div>
                ))}
            </div>


            <VideoTestimonialPopup openVideoPopup={openVideoPopup} setOpenVideoPopup={setOpenVideoPopup} videoPath={videoPath} videoType={videoType}></VideoTestimonialPopup>
            {textPopupVisibility && <TestimonialReadMorePopup handleTextPopupVisibility={handleTextPopupVisibility} textPopupData={textPopupData}></TestimonialReadMorePopup>}
        </section>


    );
};

export default Testimonials;
