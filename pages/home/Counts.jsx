import React from "react";
import Image from 'next/image'; // Importing Image component from next.js for optimized image handling
const Counts = React.memo(() => {
    return (
        <section className="Main-Course-Home-Page-Empowering-Learners-Section">
            <div className="d-flex flex-wrap justify-content-around row-gap-4 column-gap-3">
                <div className="text-center">
                    <div className="d-flex gap-3 align-items-center justify-content-center">
                        <Image loading='lazy' priority={false} height={32} width={32} src="/images/home/Main-Course-HP-Empowering-Learners-B1.svg"
                            alt="Main-Course-HP-Empowering-Learners-B-Icon"
                            className="Main-Course-HP-Empowering-Learners-B-Icon" />
                        <p className="Main-Course-HP-Empowering-Learners-B-H-Text" id="trainedCount">23,000+</p>
                    </div>
                    <p className="Main-Course-HP-Empowering-Learners-B-P-Text">Happy Students Successfully Trained
                    </p>
                </div>
                <div className="text-center">
                    <div className="d-flex gap-3 align-items-center justify-content-center">
                        <Image loading='lazy' priority={false} height={32} width={32} src="/images/home/Main-Course-HP-Empowering-Learners-B2.svg"
                            alt="Main-Course-HP-Empowering-Learners-B-Icon"
                            className="Main-Course-HP-Empowering-Learners-B-Icon" />
                        <p className="Main-Course-HP-Empowering-Learners-B-H-Text" id="yearsOfExperienceCount">13
                            Yrs+</p>
                    </div>
                    <p className="Main-Course-HP-Empowering-Learners-B-P-Text">Industry Experience in Oracle
                        Training</p>
                </div>
                <div className="text-center">
                    <div className="d-flex gap-3 align-items-center justify-content-center">
                        <Image loading='lazy' priority={false} height={32} width={32} src="/images/home/Main-Course-HP-Empowering-Learners-B3.svg"
                            alt="Main-Course-HP-Empowering-Learners-B-Icon"
                            className="Main-Course-HP-Empowering-Learners-B-Icon" />
                        <p className="Main-Course-HP-Empowering-Learners-B-H-Text" id="careerTransformationCount">
                            12,000+</p>
                    </div>
                    <p className="Main-Course-HP-Empowering-Learners-B-P-Text">Students Successful Career
                        Transformations
                    </p>
                </div>
            </div>
        </section>
    )
});

export default Counts;