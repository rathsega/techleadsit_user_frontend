import React, { lazy, useEffect, useRef, useState, Suspense } from "react";
import Image from "next/image"; // Importing Image component from next.js for optimized image handling
const TurnKnowledgeIntoPower = lazy(() => import("./job_trends_turn_knowledge_into_power"));

const JobTrends = React.memo(({ courseData, openForm }) => {
    const chartRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target); // stop observing after trigger
                }
            },
            {
                threshold: 0.3, // Adjust if needed
            }
        );

        if (chartRef.current) {
            observer.observe(chartRef.current);
        }

        return () => observer.disconnect();
    }, []);
    return (
        <section id="job-trends" className="Main-Course-Top-Navbar">
            <section className="Main-Course-Award-Winning-Section">
                <a href="https://www.oracle.com/news/announcement/oracle-is-a-continued-leader-in-three-gartner-magic-quadrant-reports-assessing-finance-capabilities-2025-01-23/"
                    target="_blank" className="Main-Course-Award-Winning-Pointer-Redirecting" rel="noopener noreferrer">
                    <div className="Main-Course-Award-Winning-Pointer-Section">
                        <span>Source:</span><Image priority={false} loading="lazy" src="/images/courses/Gartner-Source.svg"
                            alt="Gartner-Source" height="22" width="22" /> <span>Gartner</span>
                        <Image priority={false} height={30} width={30} loading="lazy" src="/images/courses/Pointer-GIF.gif" alt="Description of gif"
                            className="Main-Course-Gartner-GIF-Icon" />
                    </div>
                </a>
                <div className="text-center">
                    <img loading="lazy" src="/images/courses/Main-Course-Award-Winning-Job-Trends-Icon.svg"
                        alt="Award-Winning-Image" className="Main-Course-Award-Winning-Job-Trends-Icon" />
                </div>
                <div>
                    <h2 className="Main-Course-Award-Winning-Heading">Oracle Fusion ERP has been named a Leader</h2>
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="Award-Winning-Small-Icon-BP">
                            <img loading="lazy" src="/images/courses/Main-Course-Award-Winning-Small-Icon.svg"
                                className="Main-Course-Award-Winning-Small-Icon" alt="Award-Winning-Icon" />
                        </div>
                        <p className="Main-Course-Award-Winning-BP-Content">2024 Gartner&reg; Magic Quadrant for Cloud
                            ERP for Service-Centric Enterprises,</p>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="Award-Winning-Small-Icon-BP">
                            <img loading="lazy" src="/images/courses/Main-Course-Award-Winning-Small-Icon.svg"
                                className="Main-Course-Award-Winning-Small-Icon" alt="Award-Winning-Icon" />
                        </div>
                        <p className="Main-Course-Award-Winning-BP-Content">2024 Gartner&reg; Magic Quadrant for Cloud
                            ERP for Product-Centric Enterprises, </p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="Award-Winning-Small-Icon-BP">
                            <img loading="lazy" src="/images/courses/Main-Course-Award-Winning-Small-Icon.svg"
                                className="Main-Course-Award-Winning-Small-Icon" alt="Award-Winning-Icon" />
                        </div>
                        <p className="Main-Course-Award-Winning-BP-Content">2024 Gartner&reg; Magic Quadrant&trade; for
                            Financial Planning Software.</p>
                    </div>
                </div>
            </section>
            <section className="Main-Course-Estimated-Job-Openings-Section">
                <h2 className="Main-Course-Estimated-Job-Openings-Heading text-center mb-3">
                    Estimated Oracle Fusion ERP Job Growth (2024-2030)
                </h2>
                <div className="Main-Course-Estimated-Job-Openings-Content-Section">
                    <div className="revenue-chart-container" ref={chartRef}>
                        { inView && (<svg viewBox="0 0 500 400" className={`revenue-chart ${inView ? "animate" : ""}`} loading="lazy">
                            <g className="revenue-grid">
                                <line x1="60" y1="350" x2="500" y2="350"></line>
                                <line x1="60" y1="250" x2="500" y2="250"></line>
                                <line x1="60" y1="150" x2="500" y2="150"></line>
                                <line x1="60" y1="50" x2="500" y2="50"></line>
                            </g>

                            <g className="revenue-labels">
                                <text x="10" y="353">1,00,000</text>
                                <text x="10" y="253">2,00,000</text>
                                <text x="10" y="153">3,00,000</text>
                                <text x="10" y="53">4,00,000</text>
                            </g>

                            <path className="revenue-line"
                                d="M70,330 L130,300 L190,270 L260,230 L320,200 L370,150 L430,60" />

                            <g className="revenue-points">
                                <circle cx="70" cy="330" r="5" />
                                <circle cx="130" cy="300" r="5" />
                                <circle cx="190" cy="270" r="5" />
                                <circle cx="260" cy="230" r="5" />
                                <circle cx="320" cy="200" r="5" />
                                <circle cx="370" cy="150" r="5" />
                                <circle cx="430" cy="60" r="5" />
                            </g>

                            <g className="revenue-years">
                                <text x="60" y="370">2024</text>
                                <text x="120" y="370">2025</text>
                                <text x="180" y="370">2026</text>
                                <text x="240" y="370">2027</text>
                                <text x="300" y="370">2028</text>
                                <text x="360" y="370">2029</text>
                                <text x="420" y="370">2030</text>
                            </g>

                            <g className="revenue-values" fill="#fff" fontSize="12px">
                                <text x="40" y="320">1,10,000</text>
                                <text x="100" y="290">1,35,000</text>
                                <text x="140" y="260">1,65,000</text>
                                <text x="210" y="220">2,00,000</text>
                                <text x="270" y="190">2,40,000</text>
                                <text x="320" y="140">2,88,000</text>
                                <text x="430" y="50">3,45,000</text>
                            </g>
                        </svg>)}
                    </div>


                    <div className="job-openings-table-container">
                        <table className="job-openings-table">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Estimated Job Openings</th>
                                    <th>Growth Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2024</td>
                                    <td>1,10,000+</td>
                                    <td>Baseline</td>
                                </tr>
                                <tr>
                                    <td>2025</td>
                                    <td>1,35,000+</td>
                                    <td>22%</td>
                                </tr>
                                <tr>
                                    <td>2026</td>
                                    <td>1,65,000+</td>
                                    <td>22%</td>
                                </tr>
                                <tr>
                                    <td>2027</td>
                                    <td>2,00,000+</td>
                                    <td>21%</td>
                                </tr>
                                <tr>
                                    <td>2028</td>
                                    <td>2,40,000+</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>2029</td>
                                    <td>2,88,000+</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>2030</td>
                                    <td>3,45,000+</td>
                                    <td>20%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="Main-Course-Source-Text-Section">
                    <span className="Bottom-Source-Text-Content">Here's a projected year-wise job trend growth chart for
                        Oracle Fusion ERP based on available market insights and trends.</span>
                    <div className="Bottom-Source-Text-Content-1">
                        <span className="Bottom-Source-Content">Source:</span><Image priority={false} loading="lazy"
                            src="/images/courses/Source-Naukri-Icon.svg" alt="Naukri-Source" height="22"
                            width="22" /> <span className="Bottom-Source-Content">Naukri</span>
                    </div>
                </div>
            </section>

            <section className="Main-Course-ERP-Job-Trends-Section">
                <h2 className="Main-Course-ERP-Job-Trends-Heading text-center mb-2">Oracle Fusion ERP Job Trends &
                    Opportunities</h2>
                <p className="Main-Course-ERP-Job-Trends-Para text-center">The Oracle Fusion ERP job market is booming!
                    Discover the latest trends, industry demand, and how you can secure a top-paying role.</p>
                <div className="Main-Course-ERP-Job-Trends-Content-Section">
                    <div className="d-flex align-items-baseline gap-2">
                        <Image priority={false} loading="lazy" src="/images/courses/Oracle-ERP-Job-Growth-Icon.svg" height="29" width="29"
                            alt="Oracle-ERP-Job-Growth-Icon" className="Main-Course-ERP-Job-Trends-Icon" />
                        <h3 className="Main-Course-ERP-Job-Trends-Sub-Heading">Oracle Fusion ERP Job Growth (2024-2030)
                        </h3>
                    </div>
                    <p className="Main-Course-ERP-Job-Trends-Sub-Para">The demand for Oracle Fusion ERP professionals is
                        experiencing significant growth, driven by the increasing adoption of cloud-based ERP
                        solutions. Key trends influencing this growth include:</p>
                    <div>
                        <div className="Main-Course-ERP-Job-Trends-bullet-points">
                            <Image priority={false} loading="lazy" src="/images/courses/Is-this-course-pointer.svg"
                                className="Main-Course-ERP-Job-Trends-imp-point-icon" alt="Is-this-course-pointer"
                                width="10" height="23" />
                            <p className="Main-Course-ERP-Job-Trends-bullet-imp-p">Annual growth rate of 20-22%, fueled
                                by widespread implementation of Oracle Cloud ERP.</p>
                        </div>
                        <div className="Main-Course-ERP-Job-Trends-bullet-points">
                            <Image priority={false} loading="lazy" src="/images/courses/Is-this-course-pointer.svg"
                                className="Main-Course-ERP-Job-Trends-imp-point-icon" alt="Is-this-course-pointer"
                                width="10" height="23" />
                            <p className="Main-Course-ERP-Job-Trends-bullet-imp-p">High demand in Financials, HCM, and
                                SCM modules, with organizations prioritizing these areas.</p>
                        </div>
                        <div className="Main-Course-ERP-Job-Trends-bullet-points">
                            <Image priority={false} loading="lazy" src="/images/courses/Is-this-course-pointer.svg"
                                className="Main-Course-ERP-Job-Trends-imp-point-icon" alt="Is-this-course-pointer"
                                width="10" height="23" />
                            <p className="Main-Course-ERP-Job-Trends-bullet-imp-p">Increasing opportunities in
                                contract-based and remote roles, making Oracle ERP a flexible career choice.</p>
                        </div>
                        <div className="Main-Course-ERP-Job-Trends-bullet-points">
                            <Image priority={false} loading="lazy" src="/images/courses/Is-this-course-pointer.svg"
                                className="Main-Course-ERP-Job-Trends-imp-point-icon" alt="Is-this-course-pointer"
                                width="10" height="23" />
                            <p className="Main-Course-ERP-Job-Trends-bullet-imp-p">Advancements in AI-driven ERP
                                analytics, automation, and cloud transformations, further increasing the need for
                                skilled professionals.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Suspense fallback={<div>Loading...</div>}>
                <TurnKnowledgeIntoPower data={courseData?.turnKnowledgeIntoPower} courseTitle={courseData?.title} openForm={openForm}></TurnKnowledgeIntoPower>
            </Suspense>
        </section>
    )
});

export default JobTrends;