import React, {Suspense} from "react";
const InstructorTestimonials = React.lazy(() => import("./instructor_testimonials"));
import Image from "next/image"; // Importing Image component from next.js for optimized image handling
const InstructorDetails = React.memo(({ data }) => {
    return (
        <section id="instructor-details" className="Main-Course-Top-Navbar">
            <div className="Main-Course-Meet-Our-Founder-Section">
                <div className="Main-Course-Meet-Our-Founder-Section-Card">
                    <h2 className="Main-Course-Meet-Our-Founder-Heading">{data?.sectionOne?.title}</h2>
                    <p className="Main-Course-Meet-Our-Founder-Para">{data?.sectionOne?.shortDescription}</p>
                </div>
                <div className="Main-Course-Meet-Our-Founder-Sub-Section">
                    <div className="Main-Course-Meet-Our-Founder-Section-Card">
                        <h2 className="Main-Course-Meet-Our-Founder-Acheivements-h">{data?.sectionTwo?.title}</h2>
                        <div className="Main-Course-Meet-Our-Founder-details-Card mb-3">
                            <Image priority={false} loading="lazy" src="/images/courses/Meet-Our-Founder-1.svg"
                                alt="Meet-Our-Founder-details" className="Meet-Our-Founder-Acheivements-Icon"
                                height="48" width="48" />
                            <p className="Main-Course-Meet-Our-Founder-details-Para">{data?.sectionTwo?.points[0]}</p>
                        </div>
                        <div className="Main-Course-Meet-Our-Founder-details-Card mb-3">
                            <Image priority={false} loading="lazy" src="/images/courses/Meet-Our-Founder-2.svg"
                                alt="Meet-Our-Founder-details" className="Meet-Our-Founder-Acheivements-Icon"
                                height="48" width="48" />
                            <p className="Main-Course-Meet-Our-Founder-details-Para">{data?.sectionTwo?.points[1]}</p>
                        </div>
                        <div className="Main-Course-Meet-Our-Founder-details-Card">
                            <Image priority={false} loading="lazy" src="/images/courses/Meet-Our-Founder-3.svg"
                                alt="Meet-Our-Founder-details" className="Meet-Our-Founder-Acheivements-Icon"
                                height="48" width="48" />
                            <p className="Main-Course-Meet-Our-Founder-details-Para">{data?.sectionTwo?.points[2]}</p>
                        </div>
                    </div>
                    <div className="Main-Course-Meet-Our-Founder-Section-Card">
                        <div className="position-relative">
                            <img loading="lazy" src={data?.sectionThree?.avatarImagePath}
                                alt="Our-Founder-image" width="450" height="280"
                                style={{ "color": "transparent", "maxWidth": "100%", "width": "auto", "height": "auto", "position": "relative" }} />
                            <div className="Main-Course-Meet-Our-Founder-Image-Content-Container">
                                <p className="Main-Course-Meet-Our-Founder-Image-Name">{data?.sectionThree?.trainerName}</p>
                                <p className="Main-Course-Meet-Our-Founder-Image-Role">{data?.sectionThree?.trainerDesignation}</p>
                            </div>
                            <div className="Main-Course-Founder-Social-Media-Links">
                                <a href="https://www.facebook.com/techleadsitinstitute" target="_blank"
                                    rel="noopener noreferrer">
                                    <Image priority={false} loading="lazy" src="/images/courses/Founder-Facebook-Icon.svg"
                                        alt="Founder-Facebook-Icon" width="24" height="24" />
                                </a>
                                <a href="https://www.instagram.com/techleadsit/" target="_blank"
                                    rel="noopener noreferrer">
                                    <Image priority={false} loading="lazy" src="/images/courses/Founder-Instagram-Icon.svg"
                                        alt="Founder-Facebook-Icon" width="24" height="24" />
                                </a>
                                <a href="https://www.linkedin.com/company/techleadsit1/" target="_blank"
                                    rel="noopener noreferrer">
                                    <Image priority={false} loading="lazy" src="/images/courses/Founder-Linked-In-Icon.svg"
                                        alt="Founder-Facebook-Icon" width="24" height="24" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {data?.testimonials && data?.testimonials.length > 0 && (
                <Suspense fallback={<div>Loading...</div>}>
                    <InstructorTestimonials data={data?.testimonials} />
                </Suspense>
            )}


        </section>
    )
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

export default InstructorDetails;