const Hero = ({openForm}) => {
    return (
        <section className="AC-hero-section">
            <div className="AC-banner-content">
                <div className="AC-banner-side-content">
                    <h1 className="AC-banner-hero-h1">Courses Designed for You</h1>
                    <p className="AC-banner-hero-p">Find expert-led courses across various domains to upskill and advance
                        your career.</p>
                </div>
                <div className="AC-cta-Main-Content-Box">
                    <div className="AC-banner-S1">
                        <img src="/images/courses/AC-banner-content-S1.svg" width="76" height="55" alt="AC-stylish-icons" />
                    </div>
                    <div className="AC-banner-S2">
                        <img src="/images/courses/AC-banner-content-S2.svg" width="50" height="45" alt="AC-stylish-icons" />
                    </div>
                    <div className="AC-banner-S3">
                        <img src="/images/courses/AC-banner-content-S3.svg" width="86" height="80" alt="AC-stylish-icons" />
                    </div>
                <div className="AC-cta-box">
                    <div>
                    <h2 className="AC-banner-cta-h">Unlock Your Potential</h2>
                    <p className="AC-banner-cta-p">Gain in-demand skills with expert-led courses designed to help you
                        succeed.</p>
                    <a href="#" className="AC-cta-button" onClick={()=>openForm("Start Learning Now")}>Start Learning Now</a>
                    </div>
                </div>
                </div>
            </div>

        </section>
    )
}

export default Hero;