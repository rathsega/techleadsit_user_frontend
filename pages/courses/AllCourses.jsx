import React, { useState, useEffect, useMemo } from "react";
import httpService from "../../services/httpService";
import { useRouter } from "next/navigation";
import { useLoader } from "../../contexts/LoaderContext";
import NoResultsFound from "../../components/no_results_found";

const AllCourses = ({ category, subCategory, courseType, courseTracks, skillLevel, searchText, sortByValue, setTotalCoursesCount }) => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { setLoading } = useLoader();

    //console.log(searchText);
    //console.log(sortByValue);
    useEffect(() => {
        fetchCourses();
    }, [currentPage, category, subCategory, courseType, courseTracks, skillLevel, searchText, sortByValue]);
    useEffect(() => {
        setCurrentPage(1);
    }, [category, subCategory, courseType, courseTracks, skillLevel, searchText, sortByValue]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await httpService.get("courses/getCoursesForUser", {
                params: {
                    page: currentPage,
                    limit: 6,
                    category, subCategory, courseType, courseTracks, skillLevel,
                    searchText,
                    sortByValue,
                },
            });
            setLoading(false);
            setCourses(response.data.courses);
            setTotalPages(response.data.totalPages);
            setTotalCoursesCount(response.data.totalCourses)
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };


    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const router = useRouter();
    const openCourse = (slug) => {
        setLoading(true)
        window.open(`/${slug}`, "_blank", "noopener,noreferrer");
        setLoading(false)
    }

    return (
        <>
            {courses.length > 0 && <section>
                <div className="All-category-course-cards">
                    {courses.map((course) => (
                        <div className="All-category-course-card cursor-pointer" onClick={() => openCourse(course?.basic?.slug)}>
                            <div className="position-relative">
                                {/* <div className="All-category-course-card-discount">
                                <img src="/images/courses/AC-Offer-icon.svg" alt="Offer Icon" height="15"
                                    width="15" />
                                <span className="All-category-course-card-offer">Get 20% Off</span>
                            </div> */}
                                <img src={process.env.NEXT_PUBLIC_FILES_URL + course?.basic?.thumbnailImage?.path} alt={course?.basic?.title} height="215"
                                    width="345" style={{ "maxWidth": "100%", "width": "100%", "height": "auto" }} />
                                {/* <div className="All-category-course-card-options">
                                    <img src="/images/courses/AC-RC-Likecount.svg" alt="Likes" height="39"
                                        width="39" />
                                    <img src="/images/courses/AC-Add-to cart.svg" alt="Add to cart" height="39"
                                        width="39" />
                                    <img src="/images/courses/AC-RC-Viewcount.svg" alt="Views" height="39"
                                        width="39" />
                                </div> */}
                            </div>
                            <div className="All-category-course-card-body">
                                <div className="All-category-course-card-rating-segment">
                                    <p className="All-category-course-card-h">{course?.basic?.category?.title}</p>
                                    <div className="All-category-course-card-rating">
                                        <img src="/images/courses/AC-RC-Ratingcount.svg" height="20" width="20"
                                            alt="Rating" />
                                        <span className="All-category-course-card-review">{course?.basic?.rating}</span>
                                    </div>
                                </div>
                                <h1 className="All-category-course-card-main-h">{course?.basic?.title}
                                </h1>
                                <div className="All-category-course-card-info">
                                    <span className="d-flex align-items-center flex-column">
                                        <img src="/images/courses/AC-RC-duration.svg" alt="Duration"
                                            height="16" width="16" />
                                        <span className="All-category-course-card-info-details">{course?.basic?.durationInMonths} {course?.basic?.durationInMonths == 1 ? " Month" : " Months"}</span>
                                    </span>
                                    <span className="d-flex align-items-center flex-column">
                                        <img src="/images/courses/AC-RC-chapters.svg" alt="Chapters"
                                            height="16" width="16" />
                                        <span className="All-category-course-card-info-details">{course?.basic?.chapterCount} {course?.basic?.chapterCount == 1 ? " Chapter" : " Chapters"}</span>
                                    </span>
                                    <span className="d-flex align-items-center flex-column">
                                        <img src="/images/courses/AC-RC-Mode.svg" alt="Mode" height="16"
                                            width="16" />
                                        <span className="All-category-course-card-info-details">{course?.basic?.trainingMode}</span>
                                    </span>
                                </div>
                                <div className="All-category-course-card-details">
                                    <p className="mb-0 All-category-course-card-details-price-cust">
                                        {
                                            course?.basic?.discountedPrice ? <><span className="All-category-course-card-old-price">₹{course?.basic?.price}</span>
                                                <span className="All-category-course-card-price">₹{course?.basic?.discountedPrice}<span className="All-category-course-card-text">+Taxes</span></span></> : <span className="All-category-course-card-price">₹{course?.basic?.price}<span className="All-category-course-card-text">+Taxes</span></span>
                                        }
                                    </p>
                                    <button className="All-category-course-card-enroll">
                                        <a href={`/${course?.basic?.slug}`} target="_blank" rel="noopener noreferrer" className="All-category-course-card-enroll-link">Enroll Now</a>
                                        <img src="/images/courses/AC-Right-Chevron-icon.svg" alt="Chevron"
                                            height="14" width="8" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && <div className="All-category-course-pagination-container">
                    <button className={`All-category-course-scroll-btn left ${currentPage === 1 ? "disabled" : "active-pagination-button"}`} onClick={() => handlePageChange(currentPage - 1)}>««</button>
                    <div className="All-category-course-pagination-scroll">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i + 1} className={`All-category-course-page-item ${currentPage === i + 1 ? "active" : ""}`} onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button className={`All-category-course-scroll-btn right ${currentPage === totalPages ? "disabled" : "active-pagination-button"}`} onClick={() => handlePageChange(currentPage + 1)}>»»</button>
                </div>}
            </section>}
            {
                courses.length == 0 && <section className="mt-4">
                    {/* <img src="/images/courses/AC-Coming-Soon-img.svg" alt="Coming-soon-img" className="img-fluid" width="1500" height="500" /> */}
                    <NoResultsFound></NoResultsFound>
                </section>
            }
        </>
    );
};

export default AllCourses;
