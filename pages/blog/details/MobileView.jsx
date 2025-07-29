import AlignMeFour from "./AlignMeFour";
import AlignMeSix from "./AlignMeSix";
import AlignMeThree from "./AlignMeThree";
import AlignMeTwo from "./AlignMeTwo";
import HappyStudentsCarousel from "./HappyStudentsCarousel";
import SocialShare from "./SocialShare";
import { useState } from "react";
const MobileView = ({ details, overviewDetails, advertisement, viewsCount, currentBlogId, likeCount, keywords, categories, topBlogsList, toggleSocialSharePopup, category  }) => {

    const socialLinks = {
        linkedin: "https://www.linkedin.com/company/techleadsit1/posts/?feedView=all",
        youtube: "https://www.youtube.com/@TechLeadsIT?sub_confirmation=1",
        instagram: "https://www.instagram.com/techleadsit/",
        facebook: "https://www.facebook.com/techleadsitinstitute"
    };

    return (
        <>
            <div className="mobile-view">
                <div className="align-me">
                    <div className="follow-us-section" id="followUs">
                        <h2 className="follow-h">Follow us on</h2>
                        <div className="d-flex align-items-center blog-icon-align">
                            <img src="/images/Instagram-icon.svg" onClick={() => window.open(socialLinks.instagram, "_blank", "noopener,noreferrer")}  className="follow-img" alt="social-media-icon" />
                            <img src="/images/Linkedin-icon.svg" onClick={() => window.open(socialLinks.linkedin, "_blank", "noopener,noreferrer")}  className="follow-img" alt="social-media-icon" />
                            <img src="/images/Youtube-icon.svg" onClick={() => window.open(socialLinks.youtube, "_blank", "noopener,noreferrer")}  className="follow-img" alt="social-media-icon" />
                            <img src="/images/Share-icon.svg" className="follow-img" alt="social-media-icon"
                                onClick={toggleSocialSharePopup} />
                        </div>
                    </div>
                    <div className="author-section-in-mob">
                        <img src={process.env.NEXT_PUBLIC_FILES_URL + details?.authorImage?.path} height="35" width="35" style={{"borderRadius":"30px"}} alt="blog-person-img" />
                        <div className="ms-1">
                            <p className="mb-0 blog-author-h">Author</p>
                            <p className="mb-0 blog-author-name">{details?.authorName}</p>
                        </div>
                    </div>
                </div>
                <AlignMeThree details={overviewDetails}></AlignMeThree>
                <AlignMeTwo advertisement={advertisement} currentBlogId={currentBlogId} category={category}></AlignMeTwo>
                <AlignMeFour categories={categories} topBlogsList={topBlogsList}></AlignMeFour>
                <HappyStudentsCarousel></HappyStudentsCarousel>
                <AlignMeSix keywords={keywords} viewsCount={viewsCount} likeCount={likeCount} currentBlogId={currentBlogId}></AlignMeSix>
            </div>
        </>
    )
}

export default MobileView;