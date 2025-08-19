import React, { useCallback } from "react";
import SuccessStories from "./hero_success_stories";
import HeroForm from "./hero_form";
import HeroSuccessStoriesForm from "./hero_success_stories_form";

const Hero = React.memo(({ data, handleButtonClick, openForm, courseTitle, handleYoutibeOpenVideoPopup, demoVideoPath }) => {
    const brouchurePath = data?.brouchurePath;
    const handleBrochureDownload = useCallback(() => {
        const userDetails = localStorage.getItem("userDetails");

        if (userDetails) {
            downloadBrochure();
        } else {
            openForm("Download Course Brochure");
        }
    });

    const handleWatchDemoVideo = useCallback(() => {
        const userDetails = localStorage.getItem("userDetails");

        if (userDetails) {
            handleYoutibeOpenVideoPopup();
        } else {
            openForm("Watch Demo Video");
        }
    }, [handleYoutibeOpenVideoPopup, openForm]);

    const downloadBrochure = useCallback(() => {
        const link = document.createElement("a");
        link.href = brouchurePath; // Ensure this is a valid string URL
        link.download = "brouchure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [brouchurePath]);

    return (
        <section className="Main-Course-Banner-Section">
            <div className="Main-Course-Banner-Side-1">
                <div className="Blinker-Wrapper">
                    <p className="Main-Course-Banner-Blinker1">Elevate your expertise</p>
                    <p className="Main-Course-Banner-Blinker2">Best Seller</p>
                </div>
                <div>
                    <h1 className="Main-Course-Banner-heading">
                        {data?.title} &nbsp;
                        <span>
                            {
                                data?.animationTitle?.map((at, ai) => (
                                    <span key={ai}>{at}</span>
                                ))
                            }
                        </span>
                    </h1>
                    <p className="C-Main-Banner-Para">
                        {data?.shortDescription}
                    </p>
                    <div className="Main-Banner-CTA-Btns">
                        {demoVideoPath && <button className="Main-Banner-Req-Demo-btn Main-Course-CTA-Button-Pop-Section" onClick={handleWatchDemoVideo}><i className="fa-solid fa-circle-play Main-Banner-Watch-Demo-Play-btn"></i><span>Watch Demo Video</span></button>}

                        {data?.brouchurePath && <button
                            className="Main-Banner-Brochure-btn"
                            aria-label="Download-brochure-btn"
                            onClick={handleBrochureDownload}
                        >
                            <p className="Main-Banner-Brochure-download-icon">
                                <svg
                                    className="Main-Banner-Brochure-svgIcon-hero"
                                    viewBox="0 0 384 512"
                                    height="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                                    />
                                </svg>
                                <span className="Main-Banner-Brochure-icon2-hero"></span>
                            </p>
                            Download brochure
                        </button>}

                    </div>
                    {(data?.successStories && data?.successStories?.stories && data?.successStories?.stories.length > 0) && (
                        <HeroForm courseTitle={courseTitle} />
                    )}
                </div>
            </div>

            {data?.successStories && data?.successStories?.stories?.length > 0
                ? <SuccessStories data={data?.successStories} />
                : <HeroSuccessStoriesForm courseTitle={courseTitle} />}
        </section >
    )
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
        prevProps.handleButtonClick === nextProps.handleButtonClick &&
        prevProps.openForm === nextProps.openForm &&
        prevProps.courseTitle === nextProps.courseTitle &&
        prevProps.handleYoutibeOpenVideoPopup === nextProps.handleYoutibeOpenVideoPopup &&
        prevProps.demoVideoPath === nextProps.demoVideoPath;
});

export default Hero;