import React from "react";
import Image from "next/image"; // Importing Image component from next.js for optimized image handling
const CourseOverviewWhyTechLeadSIT = React.memo(({ id, openForm, bfRef }) => {

    // Dynamic heading text based on course ID
    let whyTechLeadsText = "Tech Leads IT - The Ultimate Destination for Industry-Focused Oracle Training & Career Growth!";
    if (id === "GEN-PMP-OT-043") {
        whyTechLeadsText = "Tech Leads IT - The Ultimate Destination for Industry-Focused PMP Training & Career Growth!";
    } else if (id === "SAP-ABP-OT-038" || id === "SAP-CPI-OT-006" || id === "SAP-SDO-OT-007" || id === "SAP-MMO-OT-037") {
        whyTechLeadsText = "Tech Leads IT – The Ultimate Destination for Real-Time SAP Training & Global Career Opportunities!";
    } else if (id === "SFR-CRM-OT-039") {
        whyTechLeadsText = "Tech Leads IT – Your Gateway to Hands-On Salesforce Training & Cloud CRM Career Success!";
    } else if (id === "WRK-HCM-OT-009") {
        whyTechLeadsText = "Tech Leads IT – The Trusted Choice for Practical Workday HCM Training & Career Advancement!";
    }

    // Here need to configure default cart title and card description card_one_title, card_one_desc, card_two_title, card_two_desc, card_three_title, card_three_desc, card_four_title, card_four_desc, card_five_title, card_five_desc, card_six_title, card_six_desc

    let card_one_title = "12 Yrs of Excellence";
    let card_one_desc = "A decade of expertise in delivering top-notch Oracle Fusion ERP trainings.";
    let card_two_title = "Industry-Validated Course Structure";
    let card_two_desc = "A curriculum designed to meet current industry demands & standards.";
    let card_three_title = "Mobile App & Learning Portal";
    let card_three_desc = "Access interactive learning materials, live classes, and hands-on labs anytime.";
    let card_four_title = "5000+ Career Transformations";
    let card_four_desc = "From Learning to Leading Become an Oracle Fusion Expert!";
    let card_five_title = "Real Time Senior Faculty";
    let card_five_desc = "Handpicked Faculty, Evaluated for Superior Teaching!";
    let card_six_title = "200% Placement Support";
    let card_six_desc = "Guaranteed Career Growth for Merit Students with Expert Guidance!";

    if ([
        "SAP-CPI-OT-006",
        "SAP-SDO-OT-007",
        "GEN-DST-OT-008",
        "WRK-HCM-OT-009",
        "GEN-DMO-OT-036",
        "SAP-MMO-OT-037",
        "SAP-ABP-OT-038",
        "SFR-CRM-OT-039",
        "GEN-PMP-OT-043"
    ].includes(id)) {
        // Overriding card descriptions for specific course IDs
        card_one_desc = "Over a decade of experience in delivering high-quality professional trainings";
        card_four_desc = "Empowering learners to transition from beginners to industry-ready professionals with confidence and capability.";
    }

    if (id == 'ORF-FIN-OT-003') {
        // need to override all the values
        card_one_title = "12+ Years Expertise";
        card_one_desc = "More than 12 years of delivering high-quality Oracle Fusion ERP training with a focus on real-world applications and learner success.";
        card_two_title = "Market-Aligned Curriculum";
        card_two_desc = "Courses carefully structured to match current market trends, ensuring you gain practical skills that employers are actively seeking.";
        card_three_title = "Learn Anytime, Anywhere";
        card_three_desc = "Access live sessions, recorded lectures, and practice labs from any device, making it easy to learn on your schedule.";
        card_four_title = "5000+ Careers Transformed";
        card_four_desc = "Empowering learners to go from beginners to industry-ready professionals, helping thousands secure roles in leading organizations worldwide.";
        card_five_title = "Expert Mentors";
        card_five_desc = "Learn from senior faculty with years of implementation experience, offering insights into real-world business scenarios and best practices.";
        card_six_title = "Career & Placement Support";
        card_six_desc = "Dedicated career guidance, interview preparation, and personalized job support to help you secure top opportunities with confidence.";

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
                        <h4 className="Why-Techleads-Sub-heading">
                            {card_one_title}
                        </h4>
                        <p className="Why-Techleads-Sub-para">
                            {card_one_desc}

                        </p>
                    </div>
                    <div className="Main-Course-Why-techleads-card">
                        <Image priority={false} loading="lazy" src="/images/courses/Why-Techleads-2.svg" height="50" width="50"
                            className="Main-Course-Why-TL-CTA-img" alt="Why-Techleads-2" />
                        <h4 className="Why-Techleads-Sub-heading">
                            {card_two_title}
                        </h4>
                        <p className="Why-Techleads-Sub-para">
                            {card_two_desc}
                        </p>
                    </div>
                    <div className="Main-Course-Why-techleads-card">
                        <Image priority={false} loading="lazy" src="/images/courses/Why-Techleads-3.svg" height="50" width="50"
                            className="Main-Course-Why-TL-CTA-img" alt="Why-Techleads-3" />
                        <h4 className="Why-Techleads-Sub-heading">
                            {card_three_title}
                        </h4>
                        <p className="Why-Techleads-Sub-para">
                            {card_three_desc}
                        </p>
                    </div>
                </div>
                <div>
                    <div className="Main-Course-Why-techleads-card">
                        <Image priority={false} loading="lazy" src="/images/courses/Why-Techleads-4.svg" height="50" width="50"
                            className="Main-Course-Why-TL-CTA-img" alt="Why-Techleads-4" />
                        <h4 className="Why-Techleads-Sub-heading">
                            {card_four_title}
                        </h4>
                        <p className="Why-Techleads-Sub-para">
                            {card_four_desc}
                        </p>
                    </div>
                    <div className="Main-Course-Why-techleads-card">
                        <Image priority={false} loading="lazy" src="/images/courses/Why-Techleads-5.svg" height="50" width="50"
                            className="Main-Course-Why-TL-CTA-img" alt="Why-Techleads-5" />
                        <h4 className="Why-Techleads-Sub-heading">
                            {card_five_title}
                        </h4>
                        <p className="Why-Techleads-Sub-para">
                            {card_five_desc}
                        </p>
                    </div>
                    <div className="Main-Course-Why-techleads-card">
                        <Image priority={false} loading="lazy" src="/images/courses/Why-Techleads-6.svg" height="50" width="50"
                            className="Main-Course-Why-TL-CTA-img" alt="Why-Techleads-6" />
                        <h4 className="Why-Techleads-Sub-heading">
                            {card_six_title}
                        </h4>
                        <p className="Why-Techleads-Sub-para">
                            {card_six_desc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
})

export default CourseOverviewWhyTechLeadSIT;
