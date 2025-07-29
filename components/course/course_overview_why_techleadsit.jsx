import React from "react";
import Image from "next/image"; // Importing Image component from next.js for optimized image handling
const CourseOverviewWhyTechLeadSIT = React.memo(({id, openForm, bfRef}) => {

    // Dynamic heading text based on course ID
    let whyTechLeadsText = "Tech Leads IT - The Ultimate Destination for Industry-Focused Oracle Training & Career Growth!";
    if (id === "SAP-MMO-OT-037") {
        whyTechLeadsText = "Tech Leads IT – The Ultimate Destination for Real-Time SAP Training & Global Career Opportunities!";
    } else if (id === "SAP-ABP-OT-038" || id === "SAP-CPI-OT-006" || id === "SAP-SDO-OT-007") {
        whyTechLeadsText = "Tech Leads IT – The Ultimate Destination for Real-Time SAP Training & Global Career Opportunities!";
    } else if (id === "SFR-CRM-OT-039") {
        whyTechLeadsText = "Tech Leads IT – Your Gateway to Hands-On Salesforce Training & Cloud CRM Career Success!";
    } else if (id === "WRK-HCM-OT-009") {
        whyTechLeadsText = "Tech Leads IT – The Trusted Choice for Practical Workday HCM Training & Career Advancement!";
    }
    
    return (
        <section className="Main-Course-Why-techleads-Section" ref={bfRef}>
            <div>
                <h2 className="Main-Course-Why-Techleads-heading">
                    Why <br className="Why-Techleads-heading-adj" />
                    Tech Leads IT ?
                </h2>
                <p className="Main-Course-Why-Techleads-para">
                    “{whyTechLeadsText}”
                </p>
                <div className="Main-Course-Why-TL-CTA-Btn-Section cursor-pointer" onClick={(e) => openForm("Start Learning Today")}>
                    <button className="Main-Course-Why-TL-CTA-Btn">
                        Start Learning Today</button><i
                            className="fa-solid fa-arrow-right Main-Course-CTA-arrow ms-2"></i>
                </div>
            </div>
            <div className="Main-Course-Why-techleads-card-Section">
                <div>
                    <div className="Main-Course-Why-techleads-card">
                        <Image priority={false} loading="lazy" src="/images/courses/Why-Techleads-1.svg" height="50" width="50"
                            className="Main-Course-Why-TL-CTA-img" alt="Why-Techleads-1" />
                        <h3 className="Why-Techleads-Sub-heading">
                            12 Yrs of Excellence
                        </h3>
                        <p className="Why-Techleads-Sub-para">
                            {
                                [
                                    "SAP-CPI-OT-006",
                                    "SAP-SDO-OT-007",
                                    "GEN-DST-OT-008",
                                    "WRK-HCM-OT-009",
                                    "GEN-DMO-OT-036",
                                    "SAP-MMO-OT-037",
                                    "SAP-ABP-OT-038",
                                    "SFR-CRM-OT-039"
                                ].includes(id)
                                    ? "Over a decade of experience in delivering high-quality professional trainings"
                                    : "A decade of expertise in delivering top-notch Oracle Fusion ERP trainings."
                            }

                        </p>
                    </div>
                    <div className="Main-Course-Why-techleads-card">
                        <Image priority={false} loading="lazy" src="/images/courses/Why-Techleads-2.svg" height="50" width="50"
                            className="Main-Course-Why-TL-CTA-img" alt="Why-Techleads-2" />
                        <h3 className="Why-Techleads-Sub-heading">
                            Industry-Validated Course Structure
                        </h3>
                        <p className="Why-Techleads-Sub-para">
                            A curriculum designed to meet current industry demands &
                            standards.
                        </p>
                    </div>
                    <div className="Main-Course-Why-techleads-card">
                        <Image priority={false} loading="lazy" src="/images/courses/Why-Techleads-3.svg" height="50" width="50"
                            className="Main-Course-Why-TL-CTA-img" alt="Why-Techleads-3" />
                        <h3 className="Why-Techleads-Sub-heading">
                            Mobile App & Learning Portal
                        </h3>
                        <p className="Why-Techleads-Sub-para">
                            Access interactive learning materials, live classes, and
                            hands-on labs anytime.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="Main-Course-Why-techleads-card">
                        <Image priority={false} loading="lazy" src="/images/courses/Why-Techleads-4.svg" height="50" width="50"
                            className="Main-Course-Why-TL-CTA-img" alt="Why-Techleads-4" />
                        <h3 className="Why-Techleads-Sub-heading">
                            5000+ Career Transformations
                        </h3>
                        <p className="Why-Techleads-Sub-para">
                            {
                                [
                                    "SAP-CPI-OT-006",
                                    "SAP-SDO-OT-007",
                                    "GEN-DST-OT-008",
                                    "WRK-HCM-OT-009",
                                    "GEN-DMO-OT-036",
                                    "SAP-MMO-OT-037",
                                    "SAP-ABP-OT-038",
                                    "SFR-CRM-OT-039"
                                ].includes(id)
                                    ? "Empowering learners to transition from beginners to industry-ready professionals with confidence and capability."
                                    : "From Learning to Leading Become an Oracle Fusion Expert!"
                            }
                        </p>
                    </div>
                    <div className="Main-Course-Why-techleads-card">
                        <Image priority={false} loading="lazy" src="/images/courses/Why-Techleads-5.svg" height="50" width="50"
                            className="Main-Course-Why-TL-CTA-img" alt="Why-Techleads-5" />
                        <h3 className="Why-Techleads-Sub-heading">
                            Real Time Senior Faculty
                        </h3>
                        <p className="Why-Techleads-Sub-para">
                            Handpicked Faculty, Evaluated for Superior Teaching!
                        </p>
                    </div>
                    <div className="Main-Course-Why-techleads-card">
                        <Image priority={false} loading="lazy" src="/images/courses/Why-Techleads-6.svg" height="50" width="50"
                            className="Main-Course-Why-TL-CTA-img" alt="Why-Techleads-6" />
                        <h3 className="Why-Techleads-Sub-heading">
                            200% Placement Support
                        </h3>
                        <p className="Why-Techleads-Sub-para">
                            Guaranteed Career Growth for Merit Students with Expert
                            Guidance!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
})

export default CourseOverviewWhyTechLeadSIT;