import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
const ComapniesWaitngForYou = React.memo(({ data }) => {

    const careerPathSectionRef = useRef(null);

    useEffect(() => {
        const section = careerPathSectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        section.classList.add('Career-Path-You-Can-Explore-animate');
                        observer.unobserve(section); // run once
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(section);

        // Optional cleanup
        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    return (
        <section className="Main-Course-Company-Waiting-For-You-Section">
            <h2 className="Main-Course-Company-Waiting-For-You-Heading mb-2 text-center">Companies Waiting For You
            </h2>
            <p className="Main-Course-Company-Waiting-For-You-Para text-center">From Fresh Graduates to Experienced
                Professionals - Your Dream Job Awaits!</p>
            <div className="Main-Course-Company-Waiting-For-You-Carrer-Path-Section">
                <div id="Career-Path-You-Can-Explore-career-section" ref={careerPathSectionRef}
                    className="Career-Path-You-Can-Explore-career-Side-1">
                    <h2 className="Career-Path-You-Can-Explore-career-section-heading">Career Path Which You Can
                        Explore</h2>
                    <div className="Career-Path-You-Can-Explore-timeline">
                        {
                            data?.careerPath?.map((cp, cpi) => (
                                <div className="Career-Path-You-Can-Explore-item" key={cpi}>
                                    <div className="Career-Path-You-Can-Explore-dot"></div> {cp}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="Career-Path-You-Can-Explore-career-Side-2">
                    <div className="Main-Course-O-C-Card-Top-Part">
                        <div className="Main-Course-O-C-Card text-center">
                            <h3 className="Main-Course-O-C-Card-Heading">Average Fresher Salary</h3>
                            <p className="Main-Course-O-C-Card-Package">{data?.averageFresherSalary}</p>
                        </div>
                        <div className="Main-Course-O-C-Card text-center">
                            <h3 className="Main-Course-O-C-Card-Heading">Highest Salary of Past Learners at Tech
                                Leads IT</h3>
                            <p className="Main-Course-O-C-Card-Package">{data?.highestSalary}</p>
                            <span className="Main-Course-O-C-Span">Entry-level to expert—Tech Leads IT made it
                                happen.</span>
                        </div>
                    </div>
                    <div className="Main-Course-O-C-Card">
                        <h3 className="Main-Course-O-C-Card-Heading text-center mb-4">Your Next oppotunity is Here
                            Find jobs across startups & MNC's</h3>
                        <div className="Hiring-Partners-Trusted-By-Top-Companies-track">
                            <div className="Hiring-Partners-Trusted-By-Top-Companies-slide mb-5" id="leftSlide">
                                <div className="Career-Path-You-Can-Explore-slide-images" id="imageSet">

                                    <Image priority={false} src="/images/courses/S-C-AAIS-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-accenture-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-aingenious-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-AWC-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-COGNIZANT-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-Dhanush-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-DOYENSYS-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-FORTINET-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />

                                </div>
                            </div>

                            <div className="Hiring-Partners-Trusted-By-Top-Companies-Rslide" id="rightSlide">
                                <div className="Career-Path-You-Can-Explore-slide-images" id="imageRSet">
                                    <Image priority={false} src="/images/courses/S-C-Lenovo-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-LTIMindtree-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-MOURITECH-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/C-Mphasis-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-NTTDATA-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-SLK-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-splashBI-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                    <Image priority={false} src="/images/courses/S-C-TechMahindra-Icon.png" alt="Slider-Company-Icon" width={184} height={64} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
});

export default ComapniesWaitngForYou;