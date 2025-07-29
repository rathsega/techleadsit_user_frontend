import Image from 'next/image';
import { memo } from 'react';

const alumniData = [
    {
        img: "/images/courses/Main-Course-Successful-Alumni-Image-1.webp",
        alt: "Profile 1",
        stars: 4.5,
        feedback: `After completing Oracle Fusion SCM course, I gained valuable skills that helped optimize supply chain processes at Tech Leads IT. This enhanced expertise led to a 120% salary hike and my promotion to Oracle SCM Functional Consultant, where I now contribute to streamlining operations and driving efficiency.`,
        hike: "120%",
        heading: "Oracle SCM Functional Consultant | Pune",
        name: "Samrudhi Shetty",
        pre: "Petrofac",
        post: "Cognizant",
        hikeLabel: "120%",
    },
    {
        img: "/images/courses/Main-Course-Successful-Alumni-Image-2.webp",
        alt: "Profile 2",
        stars: 4.5,
        feedback: `I needed expertise in Oracle SCM to move into a senior role. Tech Leads IT provided real-world projects and practical insights. Their expert mentorship made a huge difference in my confidence. I successfully transitioned to Senior Consultant with a 100% salary hike!`,
        hike: "140%",
        heading: "Senior Oracle SCM Functional Consultant | Pune",
        name: "Abhinav Mahtre",
        pre: "Virtusa",
        post: "Accenture",
        hikeLabel: "140%",
    },
    {
        img: "/images/courses/Main-Course-Successful-Alumni-Image-3.webp",
        alt: "Profile 3",
        stars: 4.5,
        feedback: `The training covered everything from fundamentals to advanced SCM concepts. 1-on-1 support and real-world projects gave me the confidence to apply my skills. The mentorship helped me land multiple job offers. I finally secured my dream role with a 150% salary hike!`,
        hike: "150%",
        heading: "Oracle SCM Functional Consultant | Pune",
        name: "Ajay Kumar R",
        pre: "IBM",
        post: "Wipro",
        hikeLabel: "100%",
    },
    {
        img: "/images/courses/Main-Course-Successful-Alumni-Image-4.webp",
        alt: "Profile 4",
        stars: 4.5,
        feedback: `I always wanted to transition into Oracle SCM but didn't know where to start. Tech Leads IT provided step-by-step guidance, real-time projects, and career counseling. The structured approach helped me gain confidence, and within months, I landed my dream role at Wipro with a 100% Hike`,
        hike: "100%",
        heading: "Oracle SCM Functional Consultant | Pune",
        name: "Supriya Verma",
        pre: "Liberty Global",
        post: "Infosys",
        hikeLabel: "150%",
    },
];

const StarIcons = memo(({ stars }) => {
    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 !== 0;
    return (
        <>
            {[...Array(fullStars)].map((_, i) => (
                <Image priority={false} loading="lazy"
                    key={i}
                    src="/images/courses/Main-Course-Alumni-Full-Star-Icon.svg"
                    className="Main-Course-Successful-Alumni-card-star-Icon"
                    alt="Alumni-card-star-Icon"
                />
            ))}
            {halfStar && (
                <Image priority={false} loading="lazy"
                    src="/images/courses/Main-Course-Alumni-Half-Star.svg"
                    className="Main-Course-Successful-Alumni-card-star-Icon"
                    alt="Alumni-card-half-star-Icon"
                />
            )}
        </>
    );
});

const ArrowIcons = memo(() => (
    <>
        <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Alumni-Arrow-Icon.svg" height={24} width={12} alt="Alumni-Arrow-Icon" />
        <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Alumni-Arrow-Icon.svg" height={24} width={12} alt="Alumni-Arrow-Icon" />
        <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Alumni-Arrow-Icon.svg" height={24} width={12} alt="Alumni-Arrow-Icon" />
    </>
));

const PlacementPathSuccessAlumni = () => {
    return (
        <section className="Main-Course-Successful-Alumni-section">
            <div>
                <h2 className="Main-Course-Successful-Alumni-Main-heading">
                    Hear From Our Successful Alumni
                </h2>
                <p className="Main-Course-Successful-Alumni-Main-para">
                    Our students have upskilled, switched careers, and unlocked high-paying roles. Your
                    success story starts here
                </p>
            </div>
            <div className="Alumni-subsection">
                <div className="Main-Course-Successful-Alumni-grid-container">
                    {alumniData.map((alumni, idx) => (
                        <div key={alumni.name + idx}>
                            <div className="Main-Course-Successful-Alumni-card">
                                <div className="Main-Course-Successful-Alumni-card-inner">
                                    <div className="Main-Course-Successful-Alumni-card-front">
                                        <Image
                                            height={300}
                                            width={332}
                                            src={alumni.img}
                                            alt={alumni.alt}
                                            priority={idx === 0}
                                        />
                                    </div>
                                    <div className="Main-Course-Successful-Alumni-card-back">
                                        <div className="Main-Course-Successful-Alumni-stars pb-2">
                                            <StarIcons stars={alumni.stars} />
                                        </div>
                                        <p className="Main-Course-Successful-Alumni-flipped-content mb-2">
                                            {alumni.feedback}
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <p className="Main-Course-Successful-Alumni-flipped-content mb-0">
                                                Salary Hiked By
                                            </p>
                                            <p className="Main-Course-Successful-Alumni-amnt-flip ms-2 mb-0">
                                                {alumni.hike}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-1">
                                <h3 className="Main-Course-Successful-Alumni-Sub-Heading">
                                    {alumni.heading}
                                </h3>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="Main-Course-Successful-Alumni-Sub-Para">{alumni.name}</p>
                                    <span className="Main-Course-Successful-Alumni-Sub-Span-1">Salary Hike</span>
                                    <span className="Main-Course-Successful-Alumni-Sub-Span-2">{alumni.hikeLabel}</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <span className="Main-Course-Successful-Alumni-CC-1">Pre Tech Leads IT</span>
                                        <p className="Main-Course-Successful-Alumni-CC-2">{alumni.pre}</p>
                                    </div>
                                    <div className="d-flex">
                                        <ArrowIcons />
                                    </div>
                                    <div>
                                        <span className="Main-Course-Successful-Alumni-CC-1">Post Tech Leads IT</span>
                                        <p className="Main-Course-Successful-Alumni-CC-21">{alumni.post}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(PlacementPathSuccessAlumni);