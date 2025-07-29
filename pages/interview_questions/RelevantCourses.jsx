import React, { useRef, useEffect, useState } from "react";
import httpService from "../../services/httpService";
import { useLoader } from "../../contexts/LoaderContext";
import { useRouter } from "next/router";
const RelevantCourses = ({ activeCategory }) => {
    const [courses, setCourses] = useState([]);
    const scrollContainerRef = useRef(null);    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1);
    const { setLoading } = useLoader();
    const router = useRouter();
    useEffect(() => {

        const relatedCoursesByCategory = async () => {
            try {
                setLoading(true)
                const response = await httpService.get('courses/coursesByCategory/' + activeCategory);
                setLoading(false)
                if (response?.data?.courses) {
                    setCourses(response?.data?.courses);
                }
            } catch (e) {
                console.error("Error fetching related blogs:", e);
            }
        }

        relatedCoursesByCategory();
    }, [activeCategory])

    // Adjust slides per view based on screen size
    useEffect(() => {
        const updateSlides = () => {
            if (window.innerWidth >= 1395) setSlidesPerView(4);
            else if (window.innerWidth >= 1046) setSlidesPerView(3);
            else if (window.innerWidth >= 768) setSlidesPerView(2);
            else setSlidesPerView(1);
        };

        updateSlides(); // Initial call
        window.addEventListener("resize", updateSlides); // Update on resize

        return () => window.removeEventListener("resize", updateSlides); // Cleanup
    }, []);


    const handleNext = () => {
        //console.log(currentIndex, slidesPerView, courses.length);
        if (currentIndex + slidesPerView < courses.length) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const openCourse = (slug) => {
        if (slug) {
            setLoading(true)
            router.push(`/${slug}`); // Example route: /slug-value
            setLoading(false)
        } else {
            console.warn("Invalid slug provided!");
        }
    }

    return (
        <section className="mt-4">
            <h1 className="Category-h">Relevant Courses</h1>
            <div className="blogs-relevant-courses-carousel-container">
                {/* Left Navigation Button */}
                <button className="carousel-button left"  onClick={() => handlePrev()}>&#10094;</button>

                {/* Course Cards Wrapper */}
                <div className="carousel-wrapper">
                    <div className="category-relevant-course-cards overflow-x-auto flex space-x-4" ref={scrollContainerRef}>
                        {courses.slice(currentIndex, currentIndex + slidesPerView).map((course, index) => (
                            <div className="category-relevant-course-card cursor-pointer" key={index} onClick={() => {
                                if (course?.basic?.slug) {openCourse(course?.basic?.slug)} else {console.warn("Invalid slug provided!") }}}>
                                <div className="position-relative">
                                    {/* <div className="category-relevant-course-discount">
                                    <img src="/images/blogs/Category-Offer-icon.svg" alt="Offer Icon" height="15" width="15" />
                                    <span className="course-category-offer">Get 20% Off</span>
                                </div> */}
                                    <img src={process.env.NEXT_PUBLIC_FILES_URL + course?.basic?.thumbnailImage?.path} alt={course?.category?.title}
                                        width="345" height="215"
                                        style={{ "maxWidth": "100%", "width": "100%", "height": "auto" }} />
                                    {/* <div className="category-relevant-course-card-options">
                                        <img src="/images/blogs/Category-RC-Likecount.svg" className="cursor-pointer" alt="Likes" height="39" width="39" />
                                        <img src="/images/blogs/Category-Add-to cart.svg" className="cursor-pointer" alt="Add to cart" height="39" width="39" />
                                        <img src="/images/blogs/Category-RC-Viewcount.svg" className="cursor-pointer" alt="Views" height="39" width="39" />
                                    </div> */}
                                </div>
                                <div className="category-relevant-course-card-body">
                                    <div className="category-relevant-course-rating">
                                        <p className="category-relevant-course-h">{course?.basic?.category?.title}</p>
                                        <div className="category-relevant-course-Crating">
                                            <img src="/images/blogs/Category-RC-Ratingcount.svg" height="20" width="20"
                                                alt="Rating" />
                                            <span className="category-relevant-course-review">{course?.basic?.rating}</span>
                                        </div>
                                    </div>
                                    <h1 className="category-relevant-course-main-h">{course?.basic?.title}
                                    </h1>
                                    <div className="category-relevant-course-info">
                                        <span>
                                            <img src="/images/blogs/Category-RC-duration.svg" alt="Duration" height="16" width="16" />
                                            <span className="category-relevant-course-info-details">{course?.basic?.durationInMonths} {course?.basic?.durationInMonths == 1 ? " Month" : " Months"}</span>
                                        </span>
                                        <span>
                                            <img src="/images/blogs/Category-RC-chapters.svg" alt="Chapters" height="16" width="16" />
                                            <span className="category-relevant-course-info-details">{course?.basic?.chapterCount} {course?.basic?.chapterCount == 1 ? " Chapter" : " Chapters"}</span>
                                        </span>
                                        <span>
                                            <img src="/images/blogs/Category-RC-Mode.svg" alt="Mode" height="16" width="16" />
                                            <span className="category-relevant-course-info-details">{course?.basic?.trainingMode}</span>
                                        </span>
                                    </div>
                                    <div className="category-relevant-course-details">
                                        <p className="mb-0">
                                            {course?.basic?.discountedPrice ? <><span className="category-relevant-course-old-price">₹{course?.basic?.price}</span>
                                                <span className="category-relevant-course-price">₹{course?.basic?.discountedPrice}</span></> : <span className="category-relevant-course-price">₹{course?.basic?.price}</span>}
                                            <span className="category-relevant-course-text">+Taxes</span>
                                        </p>
                                        <button className="category-relevant-course-enroll">
                                            <a href={`/${course?.basic?.slug}`} className="category-relevant-course-enroll-link">Enroll Now</a>
                                            <img src="/images/blogs/Category-Right-Chevron-icon.svg" alt="Chevron" height="14" width="8" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Navigation Button */}
                <button className="carousel-button right" onClick={() => handleNext()}>&#10095;</button>
            </div>
        </section>
    )
}

export default RelevantCourses;