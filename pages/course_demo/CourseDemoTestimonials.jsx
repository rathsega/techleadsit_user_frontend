import React, { useEffect, useState, useRef } from 'react';
import httpService from '../../services/httpService'
import VideoTestimonialPopup from './../webinar/VideoTestimonialPopup'
import Image from 'next/image';
const CourseDemoTestimonials = ({ details }) => {
    const imageContainerRef = useRef(null);
    const indicatorsRef = useRef([]);
    const [imageSrc, setImageSrc] = useState([]);
    const [groupedData, setGroupedData] = useState([]);
    const [openVideoPopup, setOpenVideoPopup] = useState(false);
    const [videoPath, setVideoPath] = useState('');
    const [videoType, setVideoType] = useState('');

    useEffect(() => {
        const formatTestimonialData = () => {
            const groupedData = [];
            let data = details;
            for (let i = 0; i < data.length; i++) {
                if (data[i].testimonialType === "Video") {
                    const set = [data[i]];
                    for (let j = i + 1; j < data.length && set.length < 3; j++) {
                        if (data[j].testimonialType === "Text") {
                            set.push(data[j]);
                            i = j; // Move the pointer to skip already used items
                        }
                    }
                    groupedData.push(set);
                }
            }
            return setGroupedData(groupedData);
        }


        const fetchWhyAttendIcons = async () => {
            try {
                // Extract the file paths from details
                let imagePaths = [];
                imagePaths = details
                    ?.filter(detail => detail?.testimonialType === "Video" ? detail?.thumbnail?.path : detail?.image?.path) // Filter out details with image paths
                    ?.map(detail => detail?.testimonialType === "Video" ? detail?.thumbnail?.path : detail?.image?.path);  // Extract only the image paths

                const videoPaths = details
                    ?.filter(detail => detail?.testimonialType === "Video" && detail?.video?.path) // Filter only video types with video paths
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

            const totalContainers = document.querySelectorAll('.course-demo-testimonial-video-container').length;

            const handleScroll = () => {
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
        fetchWhyAttendIcons();
    }, [details]);

    const handleIndicatorClick = (index) => {
        const imageContainer = imageContainerRef.current;
        if (!imageContainer) return; // Ensure the element exists

        const totalContainers = document.querySelectorAll('.course-demo-testimonial-video-container').length;
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

    const [selectedTestimonial, setSelectedTestimonial] = useState(null);

    const openPopup = (testimonial) => {
        setSelectedTestimonial(testimonial);
        //console.log(groupedData)
    };

    const closePopup = () => {
        setSelectedTestimonial(null);
    };

    return (
        <>
            <section style={{ "padding": "30px 0px" }} className="Testimonials-section" id="Testimonials">
                <h1 className="Testimonial-h">What Our Attendees Say</h1>
                <p className="Testimonial-p mt-2">Hear from our past participants about their experiences and how this webinar has helped
                    them advance their careers</p>
                <div className="image-container content1 d-flex pt-4" ref={imageContainerRef}>
                    {groupedData.map((set, index) => (
                        <div className="course-demo-testimonial-video-container" key={index}>
                            {set.map((item, subIndex) => {
                                if (item.testimonialType === "Video") {
                                    return (
                                        <React.Fragment key={`${item._id}-video`}>
                                            <div className="individual-vd">
                                                <div className="course-demo-testimonial-image">
                                                    <img
                                                        src={process.env.NEXT_PUBLIC_FILES_URL + item.thumbnail.path}
                                                        className="course-demo-testimonial-image"
                                                        alt="Testimonial Video"
                                                        width={316} height={440}
                                                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 50vw"
                                                        fetchPriority="low" 
                                                    />
                                                </div>
                                            </div>

                                            <img
                                                src="/images/webinar_page_assets/play-button.png"
                                                onClick={() => playVideoTestimonial(item.reviewVideo)}
                                                className="play-button-img"
                                                alt="Play Button"
                                                height={34}
                                                width={34}
                                            />
                                            <div className="course-demo-snack-bar">
                                                <p className="cd-testimonial-snackbar-heading">{item.studentName}</p>
                                                <p className="snackbar-para">{item.designation}</p>
                                            </div>
                                        </React.Fragment>
                                    );
                                }
                                return null;
                            })}

                            <div className="demo-d-fl-just-between">
                                {set.map((textItem, subIndex) => {
                                    if (textItem.testimonialType === "Text") {
                                        return (
                                            <div className="course-demo-testimonail-content" key={`${textItem._id}-text-${index}-${subIndex}`}>
                                                <img src="/images/demo/testimonials colun icon.svg" alt="Vector Icon" width={16} height={14}
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 50vw"
                        fetchPriority="low" />
                                                <p className="course-demo-testimonial-para">{subIndex} {textItem.review}</p>
                                                <span className="read-more-btn" onClick={() => openPopup(textItem)}>Read More</span>
                                                <div className="d-flex align-items-center mt-2">
                                                    <Image src={process.env.NEXT_PUBLIC_FILES_URL + textItem?.image?.path} alt="Reviewer" height="40" width={40}
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 50vw"
                        fetchPriority="low" />
                                                    <div className="d-flex flex-column role-adj">
                                                        <span className="cd-role-h">{textItem.studentName}</span>
                                                        <p className="cd-role">{textItem.designation}</p>
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
            </section>
            {
                selectedTestimonial && <> <div className="read-more-overlay active" onClick={closePopup}></div>
                    <div className="read-more-popup active" onClick={(e) => e.stopPropagation()}>
                        <button className="read-more-close border-0" onClick={closePopup}><i className="fa fa-times" aria-hidden="true"></i></button>
                        <div className="read-more-align">
                            <div>
                                <img src="/images/demo/testimonials colun icon.svg" height="25" width={25} alt='Testimonial icon' />
                                <p className="read-more-popup-text">{selectedTestimonial.review}</p>
                            </div>

                            <div className="popup-reviewer d-flex align-items-center">
                                <img className="popup-reviewer-img" src={getImageSrc(selectedTestimonial.image.path)} alt="Reviewer" height="40" width={40} />
                                <div className="d-flex flex-column role-adj">
                                    <span className="popup-reviewer-name role-h">{selectedTestimonial.studentName}</span>
                                    <p className="popup-reviewer-role role">{selectedTestimonial.designation}</p>
                                </div>
                            </div>
                        </div>
                    </div></>
            }

        </>


    );
};

export default CourseDemoTestimonials;
