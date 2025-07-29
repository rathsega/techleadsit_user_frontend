import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image"; // Importing Image component from next.js for optimized image handling

const WhatOurStudentsSay = React.memo(({ courseId }) => {

    const oracleFusionReviews = {
        "Oracle Fusion SCM": [
            {
                name: "Onkar Channe",
                review_link: "https://share.google/2sLhCXP0T9RnY71Ue",
                linkedin: "https://www.linkedin.com/in/onkar-channe-16218021b/",
                designation: "Technical Lead at Nagpur Broadcast Company",
                review: "Tech Leads IT is a very good institute. Krishna Sir teaches very well for both freshers and experienced people, and his communication skills are excellent and he provides great guidance for career development."
            },
            {
                name: "Santosh Kumar Badiger",
                review_link: "https://www.trustpilot.com/reviews/67c907f677a0403b27591a08",
                linkedin: "https://www.linkedin.com/in/santoshkumar-badiger-3695aa6a/",
                designation: "Sr Business System Analyst at Cloud Software Group",
                review: "I really appreciate Krishna's enthusiasm for the subject matter. It made the course more enjoyable. He clearly explains all the concepts with examples which can be understood by a new person entering this ERP world This is really helpful in building our skills."
            },
            {
                name: "Vasu Patnaik Uriti",
                review_link: "https://g.co/kgs/kRRH4rB",
                linkedin: "https://www.linkedin.com/in/vasupatnaik-uriti/",
                designation: "SCM Functional Consultant at TOYOTSU",
                review: "I joined for Oracle cloud SCM and am totally satisfied with Krishna's way of detailing the contents and the way of handling the queries and guiding. The quality during teaching specially voice clarity is too good."
            },
            {
                name: "Thirumal M",
                review_link: "https://www.trustpilot.com/reviews/679068c960af589c549dba3d",
                linkedin: "https://www.linkedin.com/in/thirumal-m-1072b917/",
                designation: "Project Manager at Tietoevry",
                review: "I recently completed the Oracle Fusion SCM Training from Tech Leads it. The training session was incredibly insightful and well-organized. The content was relevant and clearly presented, which made it easy to follow."
            }
        ],
        "Oracle Fusion HCM": [
            {
                name: "Aparna Jakkula",
                review_link: "https://g.co/kgs/cf5p6BR",
                linkedin: "https://www.linkedin.com/in/aparnajakkula/",
                designation: "HR Practitioner at Accenture",
                review: "TechLeadsIT provides excellent Oracle Fusion HCM training, with real-time scenarios and expert guidance that significantly enhanced my learning experience."
            },
            {
                name: "Nitisha Babaria",
                review_link: "https://g.co/kgs/x7Dn2kw",
                linkedin: "https://www.linkedin.com/in/nitisha-babaria/",
                designation: "Human Resources Executive",
                review: "I have Attended Oracle Fusion HCM training in Tech Lead IT. Our trainer Raj has explained the topics by giving real time scenarios and the Assignments provided by him gave a good hold on the topics. He has a very good knowledge."
            },
            {
                name: "Jaydip Tripathi",
                review_link: "https://maps.app.goo.gl/9a8VkWg2nCwRmxaJ9",
                linkedin: "https://www.linkedin.com/in/jaydip-tripathi-82165415/",
                designation: "Senior Manager at GUVNL",
                review: "Excellent content presentation. Covering all the points and Hands on practice is an added advantage. Must enroll for better clarity and understanding basic concepts not only related to Application but business functions as well."
            },
            {
                name: "Nidhi Behl",
                review_link: "https://g.co/kgs/ovyBGZU",
                linkedin: "https://www.linkedin.com/in/nidhi-behl-88483458/",
                designation: "Senior Associate HR at Antarang",
                review: "Oracle HCM Fusion Sumesh's manner of teaching is so wonderful and refreshing!! He’s patient and supportive, but really knows how to motivate his students. He has vast experience in HCM Fusion and he handles our queries efficiently."
            }
        ],
        "Oracle Fusion Financials": [
            {
                name: "Aditya Garabadu",
                review_link: "https://www.linkedin.com/posts/aditya-garabadu-ab1a11184_i-am-writing-to-express-my-heartfelt-gratitude-activity-7188132464588984321-pWVy?utm_source=share&utm_medium=member_desktop&rcm=ACoAADm5p2EBO7oeFsm6jX6U0_raZ2TmEtohuH8",
                linkedin: "https://www.linkedin.com/in/aditya-garabadu-ab1a11184/",
                designation: "Application Development Analyst at Accenture",
                review: "I am writing to express my heartfelt gratitude for the invaluable training, guidance, and support I received during my course at Tech Leads IT Institute. I have not only gained knowledge but also acquired the skills in Oracle Fusion Financials."
            },
            {
                name: "Monica Benny",
                review_link: "https://g.co/kgs/QtPXg8r",
                linkedin: "https://www.linkedin.com/in/monica-benny-aa232154/",
                designation: "Oracle ERP Technical Consultant at Abu Dhabi Airports",
                review: "This course offered comprehensive coverage, providing me with the skills to handle real-world scenarios. This training is not just theoretical and Instructor guidance made it a truly enriching experience."
            },
            {
                name: "Taha Maaz",
                review_link: "https://g.co/kgs/dy8SBtY",
                linkedin: "https://www.linkedin.com/in/taha-maaz-84240922/",
                designation: "Senior Specialist at American Express",
                review: "I completed my Oracle Fusion Financial training from Tech Leads IT. It is one of the best and highly recommended institution, I have come across with very professional approach and have had a great learning experience with Mr. Kaleem Basha the faculty at the institute."
            },
            {
                name: "Hari Mulik",
                review_link: "https://g.co/kgs/y2viBxu",
                linkedin: "https://www.linkedin.com/in/hari-mulik-mulikhari/",
                designation: "Manager - Finance at Haldirams",
                review: "One of the Best training institute for Oracle Fusion finance And Basha Sir having very good Knowledge on Finance Modules. I can recommend this institute for Oracle Fusion trainings for everyone"
            }
        ],
        "Oracle Fusion Technical+OIC": [
            {
                name: "B Subramanian",
                review_link: "https://g.co/kgs/uay2qAZ",
                linkedin: "https://www.linkedin.com/in/b-subramanian-4a535014b/",
                designation: "Oracle Technical Consultant at Propel",
                review: "Study materials provided by Tech leads IT team is quite good to practice and gain knowledge & confidence. Instructor Explained the concept clearly and in the understantable manner.Thanks for sharing your knowledge sir."
            },
            {
                name: "Juan Bastida",
                review_link: "https://g.co/kgs/V1KYn86",
                linkedin: "https://www.linkedin.com/in/juanbastida/",
                designation: "JD Edwards Developer Consultant",
                review: "It has been a wonderful experience to take the Oracle Fusion Technical+OIC course. nstructor Vijay has trasmited all concepts clearly and with real time scenarios. I feel very thankful with Teach Leads It and specially with Vijay for his teaching engagement."
            },
            {
                name: "Jaydip Tripathi",
                review_link: "https://maps.app.goo.gl/9a8VkWg2nCwRmxaJ9",
                linkedin: "https://www.linkedin.com/in/jaydip-tripathi-82165415/",
                designation: "Senior Manager at GUVNL",
                review: "Excellent content presentation. Covering all the points and Hands on practice is an added advantage. Must enroll for better clarity and understanding basic concepts not only related to Application but business functions as well."
            },
            {
                name: "Madhukar Chavan",
                review_link: "https://maps.app.goo.gl/7UyV4EbZuuNaP6hD9",
                linkedin: "https://www.linkedin.com/in/madhukarchavan/",
                designation: "Senior Principal Consultant",
                review: "Techleads is One of the Best training institute for Oracle Fusion. I would strongly recommend this institute for beginners and experienced people. Here the faculty is very experienced and knowledgeable"
            }
        ],
        "Remaining Courses": [
            {
                name: "Jaydip Tripathi",
                review_link: "https://maps.app.goo.gl/9a8VkWg2nCwRmxaJ9",
                linkedin: "https://www.linkedin.com/in/jaydip-tripathi-82165415/",
                designation: "Senior Manager at GUVNL",
                review: "Excellent content presentation. Covering all the points and Hands on practice is an added advantage. Must enroll for better clarity and understanding basic concepts not only related to Application but business functions as well."
            },
            {
                name: "Madhukar Chavan",
                review_link: "https://maps.app.goo.gl/7UyV4EbZuuNaP6hD9",
                linkedin: "https://www.linkedin.com/in/madhukarchavan/",
                designation: "Senior Principal Consultant",
                review: "Techleads is One of the Best training institute for Oracle Fusion. I would strongly recommend this institute for beginners and experienced people. Here the faculty is very experienced and knowledgeable"
            },
            {
                name: "B Subramanian",
                review_link: "https://g.co/kgs/uay2qAZ",
                linkedin: "https://www.linkedin.com/in/b-subramanian-4a535014b/",
                designation: "Oracle Technical Consultant at Propel",
                review: "Study materials provided by Tech leads IT team is quite good to practice and gain knowledge & confidence. Instructor Explained the concept clearly and in the understantable manner.Thanks for sharing your knowledge sir."
            },
            {
                name: "Monica Benny",
                review_link: "https://g.co/kgs/QtPXg8r",
                linkedin: "https://www.linkedin.com/in/monica-benny-aa232154/",
                designation: "Oracle ERP Technical Consultant at Abu Dhabi Airports",
                review: "This course offered comprehensive coverage, providing me with the skills to handle real-world scenarios. This training is not just theoretical and Instructor guidance made it a truly enriching experience."
            }
        ]
    };

    const trainingCourses = {
        "Oracle Fusion SCM": {
            "Oracle Fusion SCM Online Training": "ORF-SCM-OT-001",
            "Oracle Fusion SCM Training in Hyderabad": "ORF-SCM-PT-024",
            "Oracle Fusion SCM Certification Training": "ORF-SCM-CT-025",
            "Oracle Fusion SCM Self Paced Training": "ORF-SCM-SP-026",
        },
        "Oracle Fusion HCM": {
            "Oracle Fusion HCM Online Training": "ORF-HCM-OT-002",
            "Oracle Fusion HCM Technical Training": "ORF-HCM-OT-011",
            "Oracle Fusion HCM Training in Hyderabad": "ORF-HCM-PT-027",
            "Oracle Fusion HCM Certification Training": "ORF-HCM-CT-028",
            "Oracle Fusion HCM Self Paced Training": "ORF-HCM-SP-029"
        },
        "Oracle Fusion Financials": {
            "Oracle Fusion Financials Training": "ORF-FIN-OT-003",
            "Oracle Fusion Financials Training in Hyderabad": "ORF-FIN-PT-030",
            "Oracle Fusion Financials Certification Training": "ORF-FIN-CT-031",
            "Oracle Fusion Financials Self Paced Training": "ORF-FIN-SP-032"
        },
        "Oracle Fusion Technical+OIC": {
            "Oracle Fusion Technical + OIC Training": "ORF-TEC-OT-004",
            "Oracle Fusion Technical OIC Certification Training": "ORF-TEC-CT-033",
            "Oracle Fusion Technical Self Paced Training": "ORF-TEC-SP-034"
        },
        "Remaining Courses": {
            "Oracle Fusion WMS Cloud (Logfire) Training": "ORF-WMS-OT-005",
            "SAP CPI Online Training": "SAP-CPI-OT-006",
            "SAP SD Online Training": "SAP-SDO-OT-007",
            "Data Science Online Training": "GEN-DST-OT-008",
            "Oracle Transportation Management OTM cloud Training": "ORF-OTM-OT-013",
            "Oracle Global Trade Management Cloud Online Training": "ORF-GTM-OT-014",
            "Oracle Fusion WMS Cloud (Logfire) Self Paced Training": "ORF-WMS-SP-035",
            "Digital Marketing Online Training": "GEN-DMO-OT-036",
            "SAP MM online Training": "SAP-MMO-OT-037",
            "SAP ABAP Online Training": "SAP-ABP-OT-038",
            "Salesforce Online Training": "SFR-CRM-OT-039",
            "Fusion Cloud CRM Online Training": "ORF-CRM-OT-041",
            "Oracle Fusion PPM | Project's Training": "ORF-PPM-OT-017",
            "Oracle EBS R12 SCM Training": "ORR-SCM-OT-019",
            "Oracle Fusion Procurement Training": "ORF-PRC-OT-010",
            "Oracle Fusion Manufacturing training": "ORF-MFG-OT-016",
            "Oracle Fusion Planning Central Training": "ORF-PLC-OT-040",
            "Workday HCM Techno Functional Training": "WRK-HCM-OT-009",
            "Oracle Recruiting Cloud Online Training": "ORF-RCT-OT-012",
            "Oracle EBS R12 Financials Training": "ORR-FIN-OT-020",
            "Oracle EBS R12 Project Accounting Training": "ORR-PAT-OT-021",
            "Oracle Integration Cloud (OIC) Online Training": "ORF-OIC-OT-015",
            "Oracle ADF Online Training": "ORF-ADF-OT-018",
            "Oracle Apps R12 Technical Training": "ORR-TCH-OT-022",
            "Oracle OAF Online Training": "ORR-OAF-OT-023"
        }
    };


    const getGroupReviewsByCourseId = useCallback((courseId) => {
        for (const group in trainingCourses) {
            const courses = trainingCourses[group];
            for (const courseName in courses) {
                if (courses[courseName] === courseId) {
                    // Found the courseId in this group
                    return {
                        group: group,
                        reviews: oracleFusionReviews[group] || []
                    };
                }
            }
        }
        // Not found
        return {
            group: null,
            reviews: []
        };
    }, [courseId]);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (courseId) {
            let reviews = getGroupReviewsByCourseId(courseId)
            setReviews(reviews?.reviews)
        }
    }, [courseId])

    return (
        <div className="Main-Course-What-Our-Students-Say-Card-Section">
            {
                reviews?.map((review, reviewIndex) => (
                    <div className="Main-Course-What-Our-Students-Say-Card" key={reviewIndex}>
                        <a href={review?.review_link} target="_blank"
                            rel="noopener noreferrer">
                            <Image priority={false} loading="lazy" src="/images/courses/Google-Icon.svg" alt="Google-Icon" height="22"
                                width="22" className="Main-Course-What-Our-Students-Say-Card-Source-Icon" />
                        </a>
                        <Image priority={false} loading="lazy" src={`/images/courses/students/our_students/${review?.name}.png`} alt="What-Our-Students-Say"
                            height="150" width="150" className="Main-Course-What-Our-Students-Say-img" />
                        <div className="d-flex align-items-end mb-2 mt-2">
                            <h2 className="Main-Course-What-Our-Students-Say-Name">{review?.name}</h2><a
                                href={review?.linkedin} target="_blank"
                                rel="noopener noreferrer"><Image priority={false} loading="lazy" src="/images/courses/Linked-In-Icon.svg"
                                    alt="Linked-In-Icon" height="20" width="20" /></a>
                        </div>
                        <p className="Main-Course-What-Our-Students-Say-Position">{review?.designation}</p>
                        <p className="Main-Course-What-Our-Students-Say-Review">{review?.review} </p>
                    </div>
                ))
            }
        </div>
    )
})

export default WhatOurStudentsSay;