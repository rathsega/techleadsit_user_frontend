import React, { useEffect, useRef, useState } from 'react';

const PathToSuccess = ({ openForm }) => {
    const lineContainerRef = useRef(null);
    const lineFillRef = useRef(null);
    const stepsRef = useRef([]);
    const loopTimeoutRef = useRef(null);
    const animationInProgressRef = useRef(false); // Use ref instead of state

    const handleStepClick = (index) => {
        if (loopTimeoutRef.current) {
            clearTimeout(loopTimeoutRef.current);
            loopTimeoutRef.current = null;
            startLoop(index)
        }
        animateStep(index);
    };

    function startLoop(startFrom = 0) {
        const timeout = setTimeout(() => {
            const nextStep = startFrom % steps.length;
            animateStep(nextStep);
            startLoop(nextStep + 1);
            if (startFrom == 0) {
                setLineContainerHeight(80);
            }
        }, 2200);
        loopTimeoutRef.current = timeout;
    }

    function animateStep(i) {
        if (animationInProgressRef.current) return;
        animationInProgressRef.current = true;

        resetTimeline(i);

        const step = steps[i];
        step.classList.add('active');

        const cumulativeHeight = steps
            .slice(0, i + 1)
            .reduce((height, step) => {
                const style = getComputedStyle(step);
                return height + step.offsetHeight + parseInt(style.marginBottom);
            }, 0);

        const finalHeight = calculateFinalHeight();
        if (lineFillRef.current) {
            lineFillRef.current.style.transform = `scaleY(${cumulativeHeight / finalHeight})`;
        }

        setTimeout(() => {
            animationInProgressRef.current = false;
            if (!loopTimeoutRef.current) startLoop(i + 1);
        }, 2200);
    }

    function calculateFinalHeight() {
        const lastStep = steps[steps.length - 1];
        const lastStepBottom = lastStep.offsetTop + lastStep.offsetHeight;
        const firstStepTop = steps[0].offsetTop;
        return lastStepBottom - firstStepTop;
    }

    function resetTimeline(startFrom = 0) {
        steps.forEach((step, index) => {
            if (index < startFrom) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
        if (lineFillRef.current) {
            lineFillRef.current.style.transform = `scaleY(0)`;
        }
    }

    function setLineContainerHeight(more) {
        const finalHeight = calculateFinalHeight();
        if (more) {
            if (lineContainerRef.current) {
                lineContainerRef.current.style.height = `${finalHeight}px`;
            }
        } else {
            if (lineContainerRef.current) {
                lineContainerRef.current.style.height = `${finalHeight + more}px`;
            }
        }

    }

    const steps = stepsRef.current;


    useEffect(() => {











        function handleResize() {
            setLineContainerHeight();
        }

        window.addEventListener('resize', handleResize);

        setLineContainerHeight();
        startLoop(0); // Initial height adjustment to ensure visibility


        return () => {
            window.removeEventListener('resize', handleResize);
            if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
        };
    }, []); // Only run once on mount

    return (
        <section className="Main-Course-Your-path-To-Sucess-Section">
            <div className="Main-Course-Your-path-To-Sucess-Content-Section">
                <div>
                    <h2 className="Main-Course-YPTS-small-heading">How It Works</h2>
                    <h3 className="Main-Course-YPTS-Main-heading">Your Path to Success Starts Here</h3>
                    <p className="Main-Course-YPTS-Main-Para">
                        Start your learning journey with a live demo session, where you’ll gain insights into our expert-led training.
                        Continue with two free live classes to experience hands-on learning and real-world project applications.
                        Once you’re confident, enroll in our career-transforming courses and unlock full access to structured lessons,
                        mentorship, and placement support.
                    </p>

                    <button className="Main-Course-HP-CL-CTA-button">
                        <div className="Main-Course-HP-CL-CTA-button-dots_border"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            className="Main-Course-HP-CL-CTA-button-sparkle">
                            <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                fill="black"
                                d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z">
                            </path>
                            <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                fill="black"
                                d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z">
                            </path>
                            <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black"
                                fill="black"
                                d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z">
                            </path>
                        </svg>
                        <span className="Main-Course-HP-CL-CTA-button-text_button" onClick={() => {
                            openForm("Start Your Journey");
                        }}>Start Your Learning Journey</span>
                    </button>
                </div>

                <div className="Main-Course-Home-Page-YPTS-timeline">
                    <div className="Main-Course-Home-Page-YPTS-line-container" ref={lineContainerRef}>
                        <div className="Main-Course-Home-Page-YPTS-line-fill" ref={lineFillRef}></div>
                    </div>

                    {[
                        "Attend a Live Demo Session",
                        "Experience Two Free Live Classes",
                        "Enroll & Access Full Course Content",
                        "Develop In-Demand Skills with Expert Guidance",
                        "Stand Out with Resume & Interview Prep",
                        "Earn an Industry-Recognized Certification",
                        "Placement Assistance & On-the-Job Support",
                    ].map((title, index) => (
                        <div
                            key={index}
                            className="Main-Course-Home-Page-YPTS-step"
                            data-step={index + 1}
                            ref={(el) => (stepsRef.current[index] = el)}
                            onClick={() => handleStepClick(index)}
                        >
                            <h3>{title}</h3>
                            <p>{[
                                "Gain firsthand insights into our expert-led training through an interactive live demo session for the upcoming batch.",
                                "Participate in two additional live training sessions to evaluate the course structure, teaching methodology, and real-time project integration.",
                                "Complete your course enrollment to unlock structured lessons, hands-on exercises, and instructor-led training sessions.",
                                "Learn through a comprehensive curriculum, real-world case studies, and industry-focused projects to build job-ready expertise.",
                                "Receive professional resume-building support, personalized interview coaching, and mock interview sessions to boost your hiring prospects.",
                                "Upon completion, receive a globally recognized digital certificate, validating your expertise and boosting your professional profile.",
                                "Leverage our dedicated placement support, job referrals, and post-placement mentorship to excel in your career.",
                            ][index]}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PathToSuccess;
