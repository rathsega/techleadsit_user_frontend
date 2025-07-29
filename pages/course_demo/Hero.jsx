import React, { useEffect } from 'react';
import Image from 'next/image';

const Hero = ({ courseTitle, downloadCurriculum, userDetailsSubmitted, openForm }) => {
    useEffect(() => {
        const heroElement = document.querySelector('.hero-section-h');
        if (heroElement) {
            heroElement.innerHTML = heroElement.innerHTML.replace(/\.(\s|$)/, '.<br>');
        }

        const wantToKnowMoreElement = document.querySelector('.Want-to-know-more h3');
        if (wantToKnowMoreElement) {
            wantToKnowMoreElement.innerHTML = wantToKnowMoreElement.innerHTML.replace(/\?(\s|$)/, '?<br>');
        }
    }, []);

    const handleDownloadCurriculum = () => {
        if (localStorage.getItem("userDetails")) {
            downloadCurriculum();
        } else {
            localStorage.setItem('clickedFrom', 'hero');
            openForm("Download Course Curriculum", () => {
                const newDetails = localStorage.getItem("userDetails");
                if (newDetails) {
                    downloadCurriculum();
                }
            });
        }
    }

    useEffect(() => {
        const clickedFrom = localStorage.getItem('clickedFrom');

        if (clickedFrom === 'hero') {
            downloadCurriculum();
            localStorage.removeItem('clickedFrom');
        }

    }, [userDetailsSubmitted])

    return (
        <section className="hero-section">
            <div className="hero-section-content">
                <h3 className="hero-section-h pb-0 mb-0">"12+ Years of Excellence. ISO Certified. Trusted & Top-Rated on
                    Google!"</h3>
                <h1 className="mt-4">Join Our Free Demo Session for <span className="heading-imp">"{courseTitle}!"</span></h1>
                <p>Experience hands-on learning with industry experts and explore how {courseTitle} can enhance your
                    career prospects.</p>
            </div>

            <section className="hero-card-section">
                <div className="d-flex align-items-center justify-content-evenly mt-4 mt-s-10px d-fl-al-cen-just-cen-hero g-20">
                    <div className="hero-card hero-section1">
                        <Image src="/images/demo/12 yrs of excellence icon.svg" alt='12 yrs of excellence icon' height="40" className="hero-card1" />
                        <div className="text-start ms-3 ml-m-8px">
                            <h5 className="hero-card-h mb-0">12 Years </h5>
                            <span className="hero-card-p">of Excellence</span>
                        </div>
                    </div>
                    <div className="hero-card hero-section2">
                        <Image src="/images/demo/iso certified icon.svg" alt='iso certified icon' height="40" className="hero-card2" />
                        <div className="text-start ms-3 ml-m-8px">
                            <h5 className="hero-card-h mb-0">ISO Certified </h5>
                            <span className="hero-card-p">Quality Assurance</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-around mt-5 mt-s-20px d-fl-al-cen-just-cen-hero g-80">
                    <div className="hero-card hero-section3">
                        <Image src="/images/demo/career transformations icon.svg" alt='career transformations icon' height="40" className="hero-card3" />
                        <div className="text-start ms-3 ml-m-8px">
                            <h5 className="hero-card-h mb-0">2000+</h5>
                            <span className="hero-card-p">Career Transformations</span>
                        </div>
                    </div>
                    <div className="hero-card hero-section4">
                        <Image src="/images/demo/5000 assisted students icon.svg" alt='5000 assisted students icon' height="40" className="hero-card4" />
                        <div className="text-start ms-3 ml-m-8px">
                            <h5 className="hero-card-h mb-0">5000+ </h5>
                            <span className="hero-card-p">Assisted Students</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-between p-4 p-s-10 mt-4 mt-s-20px">
                    <div className="hero-card hero-section5">
                        <Image src="/images/demo/top rated on google icon.svg" alt='top rated on google icon' height="40" className="hero-card5" />
                        <div className="text-start ms-3 ml-m-8px">
                            <h5 className="hero-card-h mb-0">Top Rated </h5>
                            <span className="hero-card-p">on Google</span>
                        </div>
                    </div>
                    <div className="hero-card hero-section6">
                        <Image src="/images/demo/industry best curriculum icon.svg" alt='industry best curriculum icon' height="40" className="hero-card6" />
                        <div className="text-start ms-3 ml-m-8px">
                            <h5 className="hero-card-h mb-0">Industry </h5>
                            <span className="hero-card-p">Best Curriculum</span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center position-relative">
                <div className="hero-card-btns">
                    <button className="hero-img-btn demo_register-btn" onClick={() => {
                        openForm("Register For Free Demo");
                    }}>Register For Free Demo
                        <Image src="/images/demo/register for free demo arrow icon.svg" alt='register for free demo arrow icon' height="30" className="h-20 r-45"
                        /></button>
                    <button className="hero-img-btn curriculum-btn l-55" onClick={handleDownloadCurriculum}>
                        <p className="download-icon">
                            <svg className="svgIcon-hero" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z">
                                </path>
                            </svg>
                            <span className="icon2-hero"></span>
                        </p> Curriculum
                    </button>
                </div>
                <Image src="/images/demo/hero photo.png" className="hero-section-img " alt='Hero Section Image' fetchPriority="high" />
            </div>
        </section >
    )
}

export default Hero;