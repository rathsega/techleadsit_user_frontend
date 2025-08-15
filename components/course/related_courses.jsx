import { useRouter } from 'next/router';
import { useLoader } from '../../contexts/LoaderContext';
import React, { useCallback } from 'react';
import Image from 'next/image'; // Importing Image component from next.js for optimized image handling

const RelatedCourses = React.memo(({ courses, courseTax }) => {
    const { setLoading } = useLoader();
    const router = useRouter();
    const openCourse = useCallback((slug) => {
        setLoading(true)
        router.push(`/${slug}`); // Example route: /slug-value
        setLoading(false)
    }, [router, setLoading]);

    return (
        <section className="Main-Course-Related-Course-Card-Section-Container">
            <h2 className="Main-Course-Related-Course-Card-heading text-center">Explore Our Related Courses</h2>
            <p className="Main-Course-Related-Course-Card-Para text-center">Enhance your career prospects with
                specialized courses in high-demand fields. Gain practical knowledge and stay competitive in the
                industry.</p>
            <div className="Main-Course-Related-Courses-Card-Container">
                <div className="Main-Course-Related-Courses-Cards">
                    {
                        courses?.map((course, index) => (
                            <div className="Main-Course-Related-Courses-Card-Section cursor-pointer" key={course?.basic?._id} onClick={() => openCourse(course?.basic?.slug)}>
                                <div className="position-relative">
                                    <div className="Main-Course-Related-Courses-Card-discount">
                                        <Image priority={false} loading="lazy" src="/images/courses/MC-Related-Blogs-Offer-Icon.svg" alt="Offer Icon"
                                            height="18" width="18" />
                                        <span className="Main-Course-Related-Courses-Card-offer">Get 20% Off</span>
                                    </div>
                                    <Image priority={false} loading="lazy" src={process.env.NEXT_PUBLIC_FILES_URL + course?.basic?.thumbnailImage?.path} width="345"
                                        height="215" alt="Oracle Logo" style={{ "maxWidth": "100%", "width": "100%", "height": "auto" }} />
                                    <div className="Main-Course-Related-Courses-Card-offer-card-options">

                                    </div>
                                </div>
                                <div className="Main-Course-Related-Courses-card-body">
                                    <div className="Main-Course-Related-Courses-rating-section">
                                        <p className="Main-Course-Related-Courses-h">{course?.category?.title}</p>
                                        <div className="Main-Course-Related-Courses-rating">
                                            <Image priority={false} loading="lazy" src="/images/courses/MC-Related-Blogs-Rating-Icon.svg" height="20"
                                                width="20" alt="Rating" />
                                            <span className="Main-Course-Related-Courses-review">{course?.basic?.rating}</span>
                                        </div>
                                    </div>
                                    <h2 className="Main-Course-Related-Courses-main-h">{course?.basic?.title}
                                    </h2>
                                    <div className="Main-Course-Related-Courses-info">
                                        <span>
                                            <Image priority={false} loading="lazy" src="/images/courses/MC-Related-Blogs-Duration-Icon.svg"
                                                alt="Duration" height="16" width="16" />
                                            <span className="Main-Course-Related-Courses-info-details">{course?.basic?.durationInMonths} {course?.basic?.durationInMonths == 1 ? "Month" : "Months"}</span>
                                        </span>
                                        <span>
                                            <Image priority={false} loading="lazy" src="/images/courses/MC-Related-Blogs-Chapters-Icon.svg"
                                                alt="Chapters" height="16" width="16" />
                                            <span className="Main-Course-Related-Courses-info-details">{course?.basic?.chapterCount} {course?.basic?.chapterCount == 1 ? " Lesson" : " Lessons"}</span>
                                        </span>
                                        <span>
                                            <Image priority={false} loading="lazy" src="/images/courses/MC-Related-Blogs-Mode-Icon.svg" alt="Mode"
                                                height="16" width="16" />
                                            <span className="Main-Course-Related-Courses-info-details">{course?.basic?.courseType}</span>
                                        </span>
                                    </div>
                                    <div className="Main-Course-Related-Courses-details">
                                        {course?.basic?.discountedPrice > 0 ? <p className="mb-0">
                                            <span className="Main-Course-Related-Courses-old-price">₹{course?.basic?.price}</span>
                                            <span className="Main-Course-Related-Courses-price">₹{course?.basic?.discountedPrice}</span>
                                            {(courseTax?.cgst > 0 || courseTax?.sgst > 0 || courseTax?.igst > 0) && (
                                                <span className="Main-Course-Related-Courses-text">+Taxes</span>
                                            )}
                                        </p> : <p className="mb-0">
                                            <span className="Main-Course-Related-Courses-price">₹{course?.basic?.price}</span>
                                            {(courseTax?.cgst > 0 || courseTax?.sgst > 0 || courseTax?.igst > 0) && (
                                                <span className="Main-Course-Related-Courses-text">+Taxes</span>
                                            )}
                                        </p>}
                                        <a onClick={() => openCourse(course?.basic?.slug)} className="Main-Course-Related-Courses-enroll-link">
                                            <button className="Main-Course-Related-Courses-enroll">
                                                Enroll Now
                                                <i className="fa-solid fa-chevron-right MC-Related-Blogs-Card-Enroll-Btn-Chevron"></i>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </section>
    )
});

export default RelatedCourses;