import React from "react";
import Image from "next/image"; // Importing Image component from next.js for optimized image handling  
const CourseOverviewKeyFeatures = React.memo(({title, id}) => {

    // List of IDs for which the trainer feature should be customized
    const certifiedIds = [
        "SAP-CPI-OT-006",
        "SAP-SDO-OT-007",
        "GEN-DST-OT-008",
        "WRK-HCM-OT-009",
        "GEN-DMO-OT-036",
        "SAP-MMO-OT-037",
        "SAP-ABP-OT-038",
        "SFR-CRM-OT-039"
    ];

    // Determine if the current id is in the certifiedIds list
    const isCertified = certifiedIds.includes(id);


    return (
        <section className="Main-Course-Key-Feature-section">
            <h2 className="Main-Course-Key-Feature-Main-heading">
                Tech Leads IT  {title} Key Features
            </h2>
            <div className="Main-Course-Key-Feature-Cards">
                <div className="Main-Course-Key-feature-card">
                    <Image priority={false} loading="lazy" src="/images/courses/Course-Key-Feature-1.svg" alt="key-feature"
                        width="30" height="30" />
                    <h3 className="Main-Course-Key-Feature-heading">
                        Comprehensive Module Coverage
                    </h3>
                    <p className="Main-Course-Key-Feature-para">
                        Comprehensive learning experience covering all essential topics, structured to build strong foundational knowledge and advanced expertise.
                    </p>
                </div>
                <div className="Main-Course-Key-feature-card">
                    <Image priority={false} loading="lazy" src="/images/courses/Course-Key-Feature-2.svg" alt="key-feature"
                        width="30" height="30" />
                    <h3 className="Main-Course-Key-Feature-heading">
                        Expert Level Implementation
                    </h3>
                    <p className="Main-Course-Key-Feature-para">
                        Complex real-time business scenario modeling, advanced
                        system integrations, customizations, and implementation tips
                    </p>
                </div>
                <div className="Main-Course-Key-feature-card">
                    <Image priority={false} loading="lazy" src="/images/courses/Course-Key-Feature-3.svg" alt="key-feature"
                        width="30" height="30" />
                    <h3 className="Main-Course-Key-Feature-heading">
                        {isCertified ? "Certified Expert Trainers" : "Oracle Certified Trainers"}
                    </h3>
                    <p className="Main-Course-Key-Feature-para">
                        {isCertified
                            ? "Learn from certified professionals with extensive industry experience and a proven track record in delivering impactful training."
                            : "Learn from industry-recognized Oracle-certified experts with real-world implementation experience."
                        }
                    </p>
                </div>
                <div className="Main-Course-Key-feature-card">
                    <Image priority={false} loading="lazy" src="/images/courses/Course-Key-Feature-4.svg" alt="key-feature"
                        width="30" height="30" />
                    <h3 className="Main-Course-Key-Feature-heading">
                        Hands On Projects
                    </h3>
                    <p className="Main-Course-Key-Feature-para">
                        Hands-on Learning Tailored for Freshers & Experts – From
                        Fundamentals to Advanced Real-World Applications
                    </p>
                </div>
                <div className="Main-Course-Key-feature-card">
                    <Image priority={false} loading="lazy" src="/images/courses/Course-Key-Feature-5.svg" alt="key-feature"
                        width="30" height="30" />
                    <h3 className="Main-Course-Key-Feature-heading">
                        Placements Support & Job Help
                    </h3>
                    <p className="Main-Course-Key-Feature-para">
                        Unmatched Career Assistance – 200% Placement Support for
                        Merit Students to Secure Top Opportunities
                    </p>
                </div>
                <div className="Main-Course-Key-feature-card">
                    <Image priority={false} loading="lazy" src="/images/courses/Course-Key-Feature-6.svg" alt="key-feature"
                        width="30" height="30" />
                    <h3 className="Main-Course-Key-Feature-heading">
                        Mobile App Learning
                    </h3>
                    <p className="Main-Course-Key-Feature-para">
                        From Classroom to Smartphone – The Ultimate Learning
                        Experience, Wherever You Are!
                    </p>
                </div>
            </div>
        </section>
    );
})

export default CourseOverviewKeyFeatures;