import { useRouter } from "next/router";
import { useLoader } from "../../contexts/LoaderContext";
import { useState } from "react";

const courseList = [
    {
        slug: "oracle-fusion-scm-online-training-course",
        title: "Oracle Fusion SCM Online Training",
        desc: "Oracle Fusion SCM Online Training by Industry expert Mr. Krishna, with 18+ years of real-time experience, has delivered 60+ batches and trained more than 21,000+ students.",
        tag: "Oracle"
    },
    {
        slug: "oracle-fusion-hcm-online-training-course",
        title: "Oracle Fusion HCM Online Training",
        desc: "Oracle Fusion HCM Training at Tech Leads IT by Mr. Sumesh having 20+ years of real-time experience and successfully delivered/worked on a couple of Oracle Fusion HCM Implementations.",
        tag: "Oracle"
    },
    {
        slug: "oracle/oracle-fusion/oracle-fusion-financials-training/oracle-fusion-financials-course",
        title: "Oracle Fusion Financials Online Training",
        desc: "Oracle Fusion Financials Training with detailed content covering almost all the modules and business cycles in the training.",
        tag: "Oracle"
    },
    {
        slug: "oracle-fusion-technical-training-course",
        title: "Oracle Fusion Technical + OIC",
        desc: "Oracle Fusion Technical Training from Real-Time expert covering depth in the content with hands on project based real time examples faced during the projects.",
        tag: "Oracle"
    }
];

const TopCourses = () => {
    const router = useRouter();
    const { setLoading } = useLoader();
    const [hoveredIdx, setHoveredIdx] = useState(null);

    const openCourse = (slug) => {
        if (slug) {
            setLoading(true);
            router.push(`/${slug}`);
            setLoading(false);
        } else {
            console.warn("Invalid slug provided!");
        }
    };

    return (
        <>
            <section className="Main-Course-HP-Explore-Our-Top-Courses-Section">
                <img loading="lazy" src="/images/home/Main-Course-Explore-Our-Courses-BG-Back.webp"
                    alt="Main-Course-Explore-Our-Courses-BG-Back"
                    className="Main-Course-HP-Explore-Our-Top-Courses-BG-Style" />
                <h2 className="Main-Course-Home-Page-C-Section-Heading mb-2">
                    Explore Our Top Courses
                </h2>
                <p className="Main-Course-Home-Page-C-Section-Para">Enhance your career prospects with specialized courses
                    in
                    high-demand fields. Gain practical knowledge and stay competitive in the industry.</p>
                <div className="Main-Course-HP-Explore-Our-Top-Courses-Content">
                    <div
                        className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-1 Main-Course-HP-Explore-Our-Top-Courses-Content-Bg">
                        <div className="Home-Page-Course-Card-container cursor-pointer">
                            <h3 className="Home-Page-Course-Card-title">Oracle Fusion SCM Online Training</h3>
                            <div className="Home-Page-Course-Card-info">
                                <span><i className="fa-solid fa-circle-play me-1"></i> 80 Lessons</span>
                                <span><i className="fa-solid fa-clock me-1"></i> 80 hours</span>
                            </div>
                            <div className="Home-Page-Course-Card-duration">
                                <i className="fa-solid fa-calendar-days me-1"></i> 3 Months (Daily 1 hour)
                            </div>
                            <div className="Home-Page-Course-Card-modules">
                                <h4>Tools & Modules :</h4>
                                <ul>
                                    <li>Inventory Management</li>
                                    <li>Product Management</li>
                                    <li>Order Management</li>
                                    <li>Pricing</li>
                                    <li>RSSP</li>
                                    <li>Purchasing</li>
                                    <li>Sourcing</li>
                                    <li>Supplier Portal</li>
                                    <li>SQM</li>
                                    <li>Cost Management</li>
                                </ul>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="Home-Page-Course-Card-btn" onClick={() => openCourse('oracle-fusion-scm-online-training-course')}><span>More details </span>
                                    <div
                                        className="Main-Course-Home-Page-IT-Slanting-Arrow-button HP-Explore-Top-Courses-Sub-Section-Button-bg">
                                        <span className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-wrapper">
                                            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button"
                                                width="15">
                                                <path
                                                    d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                    fill="currentColor"></path>
                                            </svg>

                                            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg--copy"
                                                width="15">
                                                <path
                                                    d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content cursor-pointer" onClick={() => openCourse('oracle-fusion-scm-online-training-course')}>
                            <span className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Span">Oracle</span>
                            <h2 className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Heading">Oracle Fusion
                                SCM Online Training</h2>
                            <p className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Para">Oracle Fusion SCM
                                Online Training by Industry expert Mr. Krishna, with 18+ years of real-time experience,
                                has delivered 60+ batches and trained more than 21,000+ students.</p>
                            <button className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Button" onClick={() => openCourse('oracle-fusion-scm-online-training-course')}><span>Enroll
                                Now </span>
                                <div
                                    className="Main-Course-Home-Page-IT-Slanting-Arrow-button HP-Explore-Top-Courses-Section-Button-bg">
                                    <span className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-wrapper">
                                        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button"
                                            width="15">
                                            <path
                                                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                fill="currentColor"></path>
                                        </svg>

                                        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg--copy"
                                            width="15">
                                            <path
                                                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div
                        className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-2 Main-Course-HP-Explore-Our-Top-Courses-Content-Bg" onClick={() => openCourse('oracle-fusion-hcm-online-training-course')}>
                        <div className="Home-Page-Course-Card-container cursor-pointer">
                            <h3 className="Home-Page-Course-Card-title">Oracle Fusion HCM Online Training</h3>
                            <div className="Home-Page-Course-Card-info">
                                <span><i className="fa-solid fa-circle-play me-1"></i> 70 Lessons</span>
                                <span><i className="fa-solid fa-clock me-1"></i> 70 hours</span>
                            </div>
                            <div className="Home-Page-Course-Card-duration">
                                <i className="fa-solid fa-calendar-days me-1"></i> 3 Months (Daily 1 hour)
                            </div>
                            <div className="Home-Page-Course-Card-modules">
                                <h4>Tools & Modules :</h4>
                                <ul>
                                    <li>Core HR</li>
                                    <li>Absence Management</li>
                                    <li>Compensation</li>
                                    <li>Payroll</li>
                                    <li>Talent Management</li>
                                    <li>Goal Management</li>
                                    <li>Profile Management</li>
                                    <li>HCM Communicate</li>
                                    <li>Succession Planning</li>
                                    <li>Oracle ME</li>
                                </ul>

                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="Home-Page-Course-Card-btn" onClick={() => openCourse('oracle-fusion-hcm-online-training-course')}><span>More details </span>
                                    <div
                                        className="Main-Course-Home-Page-IT-Slanting-Arrow-button HP-Explore-Top-Courses-Sub-Section-Button-bg">
                                        <span className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-wrapper">
                                            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button"
                                                width="15">
                                                <path
                                                    d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                    fill="currentColor"></path>
                                            </svg>

                                            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg--copy"
                                                width="15">
                                                <path
                                                    d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content cursor-pointer" onClick={() => openCourse('oracle-fusion-hcm-online-training-course')}>
                            <span className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Span">Oracle</span>
                            <h2 className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Heading">Oracle Fusion
                                HCM Online Training</h2>
                            <p className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Para">Oracle Fusion HCM
                                Training at Tech Leads IT by Mr. Sumesh having 20+ years of real-time experience and
                                successfully delivered/worked on a couple of Oracle Fusion HCM Implementations.</p>
                            <button className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Button" onClick={() => openCourse('oracle-fusion-hcm-online-training-course')}><span>Enroll
                                Now </span>
                                <div
                                    className="Main-Course-Home-Page-IT-Slanting-Arrow-button HP-Explore-Top-Courses-Section-Button-bg">
                                    <span className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-wrapper">
                                        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button"
                                            width="15">
                                            <path
                                                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                fill="currentColor"></path>
                                        </svg>

                                        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg--copy"
                                            width="15">
                                            <path
                                                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div
                        className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-3 Main-Course-HP-Explore-Our-Top-Courses-Content-Bg" onClick={() => openCourse('oracle/oracle-fusion/oracle-fusion-financials-training/oracle-fusion-financials-course')}>
                        <div className="Home-Page-Course-Card-container cursor-pointer">
                            <h3 className="Home-Page-Course-Card-title">Oracle Fusion Financials Online Training</h3>
                            <div className="Home-Page-Course-Card-info">
                                <span><i className="fa-solid fa-circle-play me-1"></i> 70 Lessons</span>
                                <span><i className="fa-solid fa-clock me-1"></i> 70 hours</span>
                            </div>
                            <div className="Home-Page-Course-Card-duration">
                                <i className="fa-solid fa-calendar-days me-1"></i> 3 Months (Daily 1 hour)
                            </div>
                            <div className="Home-Page-Course-Card-modules">
                                <h4>Tools & Modules :</h4>
                                <ul>
                                    <li>General Ledger</li>
                                    <li>Account Payables</li>
                                    <li>Account Receivables</li>
                                    <li>Cash Management</li>
                                    <li>Fusion Tax</li>
                                    <li>Fixed Assets</li>
                                    <li>Fusion Expenses</li>
                                    <li>Budgeting</li>
                                    <li>Inter Company</li>
                                </ul>

                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="Home-Page-Course-Card-btn" onClick={() => openCourse('oracle/oracle-fusion/oracle-fusion-financials-training/oracle-fusion-financials-course')}><span>More details </span>
                                    <div
                                        className="Main-Course-Home-Page-IT-Slanting-Arrow-button HP-Explore-Top-Courses-Sub-Section-Button-bg">
                                        <span className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-wrapper">
                                            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button"
                                                width="15">
                                                <path
                                                    d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                    fill="currentColor"></path>
                                            </svg>

                                            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg--copy"
                                                width="15">
                                                <path
                                                    d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content cursor-pointer" onClick={() => openCourse('oracle/oracle-fusion/oracle-fusion-financials-training/oracle-fusion-financials-course')}>
                            <span className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Span">Oracle</span>
                            <h2 className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Heading">Oracle Fusion
                                Financials Online Training</h2>
                            <p className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Para">Oracle Fusion
                                Financials Training with detailed content covering almost all the modules and business
                                cycles in the training.</p>
                            <button className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Button" onClick={() => openCourse('oracle/oracle-fusion/oracle-fusion-financials-training/oracle-fusion-financials-course')}><span>Enroll
                                Now </span>
                                <div
                                    className="Main-Course-Home-Page-IT-Slanting-Arrow-button HP-Explore-Top-Courses-Section-Button-bg">
                                    <span className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-wrapper">
                                        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button"
                                            width="15">
                                            <path
                                                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                fill="currentColor"></path>
                                        </svg>

                                        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg--copy"
                                            width="15">
                                            <path
                                                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div
                        className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-4 Main-Course-HP-Explore-Our-Top-Courses-Content-Bg" onClick={() => openCourse('oracle-fusion-technical-training-course')}>
                        <div className="Home-Page-Course-Card-container cursor-pointer">
                            <h3 className="Home-Page-Course-Card-title">Oracle Fusion Technical+OIC Online Training</h3>
                            <div className="Home-Page-Course-Card-info">
                                <span><i className="fa-solid fa-circle-play me-1"></i> 50 Lessons</span>
                                <span><i className="fa-solid fa-clock me-1"></i> 50 hours</span>
                            </div>
                            <div className="Home-Page-Course-Card-duration">
                                <i className="fa-solid fa-calendar-days me-1"></i> 2 Months (Daily 1 hour)
                            </div>
                            <div className="Home-Page-Course-Card-modules">
                                <h4>Tools & Modules :</h4>
                                <ul>
                                    <li>OTBI Reports</li>
                                    <li>BIP Reports</li>
                                    <li>Data Migration</li>
                                    <li>Extensions</li>
                                    <li>File Integrations</li>
                                    <li>Web Service Integrations</li>
                                    <li>Rest API Integrations</li>
                                    <li>FBDI Generic & ATP</li>
                                    <li>VBCS</li>
                                    <li>PCS</li>
                                    <li>Scheduling & Migration</li>
                                </ul>

                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="Home-Page-Course-Card-btn" onClick={() => openCourse('oracle-fusion-technical-training-course')}><span>More details </span>
                                    <div
                                        className="Main-Course-Home-Page-IT-Slanting-Arrow-button HP-Explore-Top-Courses-Sub-Section-Button-bg">
                                        <span className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-wrapper">
                                            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button"
                                                width="15">
                                                <path
                                                    d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                    fill="currentColor"></path>
                                            </svg>

                                            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg--copy"
                                                width="15">
                                                <path
                                                    d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content cursor-pointer" onClick={() => openCourse('oracle-fusion-technical-training-course')}>
                            <span className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Span">Oracle</span>
                            <h2 className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Heading">Oracle Fusion
                                Technical + OIC</h2>
                            <p className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Para">Oracle Fusion
                                Technical Training from Real-Time expert covering depth in the content with hands on
                                project based real time examples faced during the projects.</p>
                            <button className="Main-Course-HP-Explore-Our-Top-Courses-Content-Bg-Content-Button" onClick={() => openCourse('oracle-fusion-technical-training-course')}><span>Enroll
                                Now </span>
                                <div
                                    className="Main-Course-Home-Page-IT-Slanting-Arrow-button HP-Explore-Top-Courses-Section-Button-bg">
                                    <span className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-wrapper">
                                        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button"
                                            width="15">
                                            <path
                                                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                fill="currentColor"></path>
                                        </svg>

                                        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg HP-Explore-Top-Courses-Section-Button Main-Course-Home-Page-IT-Slanting-Arrow-button__icon-svg--copy"
                                            width="15">
                                            <path
                                                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="VAC-btn-conteiner mt-4">
                <a className="VAC-btn-content" href="/courses">
                    <span className="VAC-btn-title">View All Courses</span>
                    <span className="VAC-icon-arrow">
                        <svg width="55px" height="32px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                            <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <path id="arrow-icon-one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                <path id="arrow-icon-two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                <path id="arrow-icon-three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                            </g>
                        </svg>
                    </span>
                </a>
            </div>
        </>
    );
};

export default TopCourses;