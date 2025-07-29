import React from "react";
import Image from "next/image"; // Importing Image component from next.js for optimized image handling
const CourseOverviewHandsonProjects = React.memo(({id, openForm}) => {
    const projectForFreshers = {
        "WRK-HCM-OT-009" : ["This project equips freshers with end-to-end, module-wise configurations, business transactions, and real-time use cases while covering market-standard interview topics, enabling them to apply theoretical knowledge in practical scenarios and confidently tackle industry challenges.", "By the end of this project, freshers will have developed a strong foundation in Workday HCM, gained practical exposure to real-world business challenges, and enhanced their problem-solving abilities, making them well-prepared for job interviews and real-time HCM implementations"],
        "SAP-CPI-OT-006" : ["This project is designed to provide freshers with a comprehensive understanding of SAP through end-to-end, module-wise configurations, business processes, and real-time use cases. It also covers interview-relevant topics based on current industry standards—helping learners confidently bridge the gap between theory and practice.", "By the end of this project, freshers will have developed a strong foundation in SAP, gained practical exposure to real-world business challenges, and enhanced their problem-solving abilities, making them well-prepared for job interviews and real-time SAP implementations."],
        "SAP-SDO-OT-007" : ["This project is designed to provide freshers with a comprehensive understanding of SAP through end-to-end, module-wise configurations, business processes, and real-time use cases. It also covers interview-relevant topics based on current industry standards—helping learners confidently bridge the gap between theory and practice.", "By the end of this project, freshers will have developed a strong foundation in SAP, gained practical exposure to real-world business challenges, and enhanced their problem-solving abilities, making them well-prepared for job interviews and real-time SAP implementations."],
        "SAP-MMO-OT-037" : ["This project is designed to provide freshers with a comprehensive understanding of SAP through end-to-end, module-wise configurations, business processes, and real-time use cases. It also covers interview-relevant topics based on current industry standards—helping learners confidently bridge the gap between theory and practice.", "By the end of this project, freshers will have developed a strong foundation in SAP, gained practical exposure to real-world business challenges, and enhanced their problem-solving abilities, making them well-prepared for job interviews and real-time SAP implementations."],
        "SAP-ABP-OT-038" : ["This project is designed to provide freshers with a comprehensive understanding of SAP through end-to-end, module-wise configurations, business processes, and real-time use cases. It also covers interview-relevant topics based on current industry standards—helping learners confidently bridge the gap between theory and practice.", "By the end of this project, freshers will have developed a strong foundation in SAP, gained practical exposure to real-world business challenges, and enhanced their problem-solving abilities, making them well-prepared for job interviews and real-time SAP implementations."],
        "SFR-CRM-OT-039" : ["This project equips freshers with end-to-end, module-wise configurations, business processes, and real-time use cases while covering market-standard interview topics, enabling them to apply theoretical knowledge in practical scenarios and confidently tackle industry challenges.", "By the end of this project, freshers will have developed a strong foundation in Salesforce, gained practical exposure to real-world business challenges, and enhanced their problem-solving abilities, making them well-prepared for job interviews and real-time Salesforce implementations."],
    }
    const projectForProfessionals = {
        "WRK-HCM-OT-009" : ["This project equips Workday HCM techno-functional implementers with the expertise to handle various business verticals effectively. With real-time use cases, business scenarios, and hands-on experience, participants gain confidence in navigating complex environments.", "They will not only grasp key concepts but also master troubleshooting, process optimization, and best practices in live ERP systems. A major focus is the Workday Unified Methodology (WUM) lifecycle—covering Inception, Elaboration, Construction, Transition, and Production. To enhance learning, real-time templates aligned with each WUM phase will be provided, ensuring structured, industry-standard ERP implementations."],
        "SAP-CPI-OT-006" : ["This project equips SAP professionals with the skills and confidence to handle various business verticals using real-time scenarios, industry challenges, and practical assignments. Through deep functional and technical exposure, participants gain the ability to manage complex SAP environments efficiently.", "Beyond core concept mastery, learners will sharpen their skills in troubleshooting, process optimization, and applying best practices in live SAP systems. A key focus is the SAP Activate Methodology lifecycle—covering Discover, Prepare, Explore, Realize, Deploy, and Run phases. Real-time templates aligned with each phase are provided, ensuring a structured and industry-aligned SAP project experience."],
        "SAP-SDO-OT-007" : ["This project equips SAP professionals with the skills and confidence to handle various business verticals using real-time scenarios, industry challenges, and practical assignments. Through deep functional and technical exposure, participants gain the ability to manage complex SAP environments efficiently.", "Beyond core concept mastery, learners will sharpen their skills in troubleshooting, process optimization, and applying best practices in live SAP systems. A key focus is the SAP Activate Methodology lifecycle—covering Discover, Prepare, Explore, Realize, Deploy, and Run phases. Real-time templates aligned with each phase are provided, ensuring a structured and industry-aligned SAP project experience."],
        "SAP-MMO-OT-037" : ["This project equips SAP professionals with the skills and confidence to handle various business verticals using real-time scenarios, industry challenges, and practical assignments. Through deep functional and technical exposure, participants gain the ability to manage complex SAP environments efficiently.", "Beyond core concept mastery, learners will sharpen their skills in troubleshooting, process optimization, and applying best practices in live SAP systems. A key focus is the SAP Activate Methodology lifecycle—covering Discover, Prepare, Explore, Realize, Deploy, and Run phases. Real-time templates aligned with each phase are provided, ensuring a structured and industry-aligned SAP project experience."],
        "SAP-ABP-OT-038" : ["This project equips SAP professionals with the skills and confidence to handle various business verticals using real-time scenarios, industry challenges, and practical assignments. Through deep functional and technical exposure, participants gain the ability to manage complex SAP environments efficiently.", "Beyond core concept mastery, learners will sharpen their skills in troubleshooting, process optimization, and applying best practices in live SAP systems. A key focus is the SAP Activate Methodology lifecycle—covering Discover, Prepare, Explore, Realize, Deploy, and Run phases. Real-time templates aligned with each phase are provided, ensuring a structured and industry-aligned SAP project experience."],
        "SFR-CRM-OT-039" : ["This project equips Salesforce professionals with the expertise to handle various business verticals effectively. With real-time use cases, business scenarios, and hands-on experience, participants gain confidence in navigating complex environments.", "They will not only grasp key concepts but also master troubleshooting, process optimization, and best practices in live Salesforce environments. A major focus is the Salesforce implementation lifecycle—covering key phases such as Discovery, Design, Development, Testing, Deployment, and Support. To enhance learning, real-time templates aligned with each phase will be provided, ensuring structured, industry-standard Salesforce implementations."],
    }
    return (
        <section className="Main-Course-Hands-on-Project-Section">
            <h2 className="Main-Course-Hands-on-Project-Main-h text-center">
                Hands-on Projects
            </h2>
            <p className="Main-Course-Hands-on-Project-Main-p text-center">
                Gain practical expertise through industry-focused projects, from
                foundational configurations for freshers & advanced business
                scenarios for experienced professionals.
            </p>
            <div className="Main-Course-Hands-on-Project-card-section">
                <div className="Main-Course-HandsonProject-Main-Div">
                    <Image src="/images/courses/Hands-On-Projects-Main-Img.png" loading="lazy" property={false}
                        className="Hands-On-Projects-Main-img" alt="Hands-On-Projects-Main-Img" width="220"
                        height="400" />
                    <div className="Main-Course-HandsonProject-Sub-Div">
                        <Image src="/images/courses/Hands-On-Projects-Side-Img1.png" loading="lazy" property={false}
                            className="Hands-On-Projects-side-img" alt="Hands-On-Projects-Side-Img" width="220"
                            height="190" />
                        <Image src="/images/courses/Hands-On-Projects-Side-Img2.png" loading="lazy" property={false}
                            alt="Hands-On-Projects-Side-Img" className="Hands-On-Projects-side-img" width="220"
                            height="190" />
                    </div>
                </div>
                <div className="Main-Course-Hands-on-Project-card-content">
                    <h2 className="Main-Course-Hands-on-Project-card-h">
                        Project For Freshers
                    </h2>
                    <p className="Main-Course-Hands-on-Project-card-p">
                        {projectForFreshers[id] ? projectForFreshers[id][0] : "This project equips freshers with end-to-end, module-wise configurations, business transactions, and real-time use cases while covering market-standard interview topics, enabling them to apply theoretical knowledge in practical scenarios and confidently tackle industry challenges."}
                    </p>
                    <p className="Main-Course-Hands-on-Project-card-p">
                        {projectForFreshers[id] ? projectForFreshers[id][1] : "By the end of this project, freshers will have developed a strong foundation in Oracle Fusion ERP, gained practical exposure to real-world business challenges, and enhanced their problem-solving abilities, making them well-prepared for job interviews and real-time ERP implementations"}
                    </p>
                    <button className="Main-Course-Hands-on-Projects" onClick={() => openForm("Start Your First Project")}>
                        <span className="Main-Course-Hands-on-Project-text-one">Start Your First Project!</span>
                        <span className="Main-Course-Hands-on-Project-text-two">Let's Build Something!</span>
                    </button>
                </div>
            </div>

            <div className="Main-Course-Hands-on-Project-card-section mt-4">
                <div className="Main-Course-HandsonProject-Main-Div">
                    <Image src="/images/courses/Hands-On-Projects-Main-Img1.png" loading="lazy" property={false}
                        className="Hands-On-Projects-Main-img" alt="Hands-On-Projects-Main-Img" width="220"
                        height="400" />
                    <div className="Main-Course-HandsonProject-Sub-Div">
                        <Image src="/images/courses/Hands-On-Projects-Side-Img11.png" loading="lazy" property={false}
                            className="Hands-On-Projects-side-img" alt="Hands-On-Projects-Side-Img" width="220"
                            height="190" />
                        <Image src="/images/courses/Hands-On-Projects-Side-Img12.png" loading="lazy" property={false}
                            alt="Hands-On-Projects-Side-Img" className="Hands-On-Projects-side-img" width="220"
                            height="190" />
                    </div>
                </div>
                <div className="Main-Course-Hands-on-Project-card-content">
                    <h2 className="Main-Course-Hands-on-Project-card-h">
                        Project for Professionals
                    </h2>
                    <p className="Main-Course-Hands-on-Project-card-p">
                        {projectForProfessionals[id] ? projectForProfessionals[id][0] : "This project equips Workday HCM techno-functional implementers with the expertise to handle various business verticals effectively. With real-time use cases, business scenarios, and hands-on experience, participants gain confidence in navigating complex environments."}
                    </p>
                    <p className="Main-Course-Hands-on-Project-card-p">
                        {projectForProfessionals[id] ? projectForProfessionals[id][1] : "They will not only grasp key concepts but also master troubleshooting, process optimization, and best practices in live ERP systems. A major focus is the Workday Unified Methodology (WUM) lifecycle—covering Inception, Elaboration, Construction, Transition, and Production. To enhance learning, real-time templates aligned with each WUM phase will be provided, ensuring structured, industry-standard ERP implementations."}
                    </p>
                    <button className="Main-Course-Hands-on-Projects" onClick={() => openForm("Level Up Your Skill")}>
                        <span className="Main-Course-Hands-on-Project-text-one">Level Up Your Skill!</span>
                        <span className="Main-Course-Hands-on-Project-text-two">Push Your Limits!</span>
                    </button>
                </div>
            </div>
        </section>
    );
});

export default CourseOverviewHandsonProjects;