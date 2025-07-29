import React from "react";
import Image from 'next/image'; // Importing Image component from next.js for optimized image handling
const TopCertifications = React.memo(({ data }) => {
    return (
        <section className="Main-Course-Top-Oracle-Cloud-SCM-Certifications-Section">
            <h2 className="Main-Course-Top-Oracle-Cloud-SCM-Certifications-Heading">
                {data?.title}
            </h2>
            {data?.certifications && <div className="Main-Course-Top-Oracle-Cloud-SCM-Certifications-Content-Container">
                {
                    data?.certifications?.map((certification, index) => (
                        <div className="Main-Course-Top-Oracle-Cloud-SCM-Certifications-Content" key={index}>
                            <p>{certification}</p>
                            <Image priority={false} loading="lazy" height={32} width={32} src="/images/courses/Top-Oracle-Cloud-Scm-Certifications-Img.svg"
                                alt="Top-Oracle-Cloud-Scm-Certifications-Img"
                                className="Top-Oracle-Cloud-Scm-Certifications-Img" />
                        </div>
                    ))
                }
            </div>}
        </section>
    )
});

export default TopCertifications;