import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
const CourseOverview = ({ details, downloadCurriculum, openForm, userDetailsSubmitted }) => {
    const handleDownloadCurriculum = () => {
        if (userDetailsSubmitted) {
            downloadCurriculum();
        } else {
            localStorage.setItem('clickedFrom', 'courseOverview');
            openForm("Download Course Curriculum", () => {
                const newDetails = localStorage.getItem("userDetails");
                if (newDetails) {
                    downloadCurriculum();
                }
            });
        }
    }

    useEffect(() => {
        const clickedFrom = localStorage.getItem('clickedFrom');

        if (clickedFrom === 'courseOverview') {
            downloadCurriculum();
            localStorage.removeItem('clickedFrom');
        }

    }, [userDetailsSubmitted])

    const courseItemsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = courseItemsRef.current.indexOf(entry.target); // Get correct index
                    if (entry.isIntersecting) {
                        entry.target.style.transitionDelay = `${index * 0.3}s`;
                        entry.target.classList.add("show");
                    } else {
                        entry.target.classList.remove("show");
                        entry.target.style.transitionDelay = "0s"; // Reset delay when out of view
                    }
                });
            },
            { threshold: 0.3 }
        );

        courseItemsRef.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => observer.disconnect(); // Cleanup observer on unmount
    }, [details]);
    return (
        <section className="Course-overview pt-3">
            <div className="course-section">
                <div className="course-sideA">
                    <h1>Course Overview</h1>
                    <p className="course-sideA-p">{details?.shortDescription}</p>
                    <div className="points-container">
                        {
                            details?.modules && details?.modules.map((module, index) => (
                                <div className="Course-item" key={index} ref={(el) => (courseItemsRef.current[index] = el)}>
                                    <Image src="/images/demo/course overview tick icon.svg" height={30} alt="✔" />
                                    <p>{module.title}</p>
                                </div>
                            ))
                        }
                    </div>
                    <button className="c-demo-btn-1 mt-4" onClick={handleDownloadCurriculum}><i className="fa-solid fa-download"></i>&nbsp;Download Detailed
                        Curriculum</button>
                </div>
                <div className="course-sideB">
                    <Image src="/images/demo/Course-section-img.png" alt="Section" width={500} height={400} />
                </div>
            </div>
        </section>
    )
}

export default CourseOverview;