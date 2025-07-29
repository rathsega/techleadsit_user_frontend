import React, { useEffect } from "react";
import Image from "next/image";
const SuccessStories = React.memo(({ data }) => {
    useEffect(() => {
        if (typeof window !== "undefined" && data?.stories?.length > 0) {
            import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
                const carouselElement = document.querySelector("#customCarouselExampleIndicators");
                if (carouselElement) {
                    new bootstrap.Carousel(carouselElement, { interval: 2000 });
                }
            }).catch((error) => console.error("Bootstrap JS load error:", error));
        }
    }, [data]);

    return (
        <div className="phone-wrapper">
            <img priority={true} src="/images/courses/Main-Course-Banner-Hero-R-Img.webp" loading="eager"
                className="phone-image" alt="Phone Image" />

            <div className="carousel-overlay">
                <div id="customCarouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {data?.stories?.map((story, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <div className="Main-Course-Hero-Card">
                                    <div className="d-flex">
                                        <Image priority={index === 0} src={story.studentAvatarPath} height="120"
                                            width="120" className="Main-Course-Hero-card-Img" alt={story.studentName} />
                                        <div className="ms-3">
                                            <h2 className="Main-Course-Hero-card-p-name">
                                                {story.studentName}
                                            </h2>
                                            <p className="Main-Course-Hero-card-role-name">
                                                {story.studentDesignation}
                                            </p>
                                            <span className="Main-Course-Hero-card-span-1">Salary Hike</span>
                                            <span className="Main-Course-Hero-card-span-2">{story.salaryHikeInPercentage}</span>
                                        </div>
                                    </div>
                                    <p className="Main-Course-Hero-card-rev">
                                        {story.studentReview}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <div className="Main-Course-Hero-card-job-ch">
                                            <p className="mb-1">Pre Tech Leads IT</p>
                                            <p>{story.preTechLeadsItCompanyName}</p>
                                        </div>
                                        <div className="Main-Course-Hero-card-job-ch">
                                            <p className="mb-1">Post Tech Leads IT</p>
                                            <Image priority={false} src={story.postTechLeadsItCompanyLogoPath} className="Hero-img-Company-Name12" style={{ borderRadius: "0px !important" }} alt="company logo" width="100"
                                                height="40" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

export default SuccessStories;