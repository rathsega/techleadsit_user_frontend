import SocialShare from "./SocialShare";
import { useState } from "react";

const socialLinks = {
    linkedin: "https://www.linkedin.com/company/techleadsit1/posts/?feedView=all",
    youtube: "https://www.youtube.com/@TechLeadsIT?sub_confirmation=1",
    instagram: "https://www.instagram.com/techleadsit/",
    facebook: "https://www.facebook.com/techleadsitinstitute"
};

const SocialButtons = ({toggleSocialSharePopup}) => {
    
    return (
        <>
            <div className="follow-us-section" id="followUs">
                <h2 className="follow-h">Follow us on</h2>
                <div className="d-flex align-items-center blog-icon-align">
                    <img 
                        src="/images/Instagram-icon.svg" 
                        onClick={() => window.open(socialLinks.instagram, "_blank", "noopener,noreferrer")} 
                        className="follow-img cursor-pointer" 
                        alt="Instagram" 
                    />
                    <img 
                        src="/images/Linkedin-icon.svg" 
                        onClick={() => window.open(socialLinks.linkedin, "_blank", "noopener,noreferrer")} 
                        className="follow-img cursor-pointer" 
                        alt="LinkedIn" 
                    />
                    <img 
                        src="/images/Youtube-icon.svg" 
                        onClick={() => window.open(socialLinks.youtube, "_blank", "noopener,noreferrer")} 
                        className="follow-img cursor-pointer" 
                        alt="YouTube" 
                    />
                    <img 
                        src="/images/facebook-icon.svg" 
                        onClick={() => window.open(socialLinks.facebook, "_blank", "noopener,noreferrer")} 
                        className="follow-img cursor-pointer" 
                        alt="Facebook" 
                    />
                    <img 
                        src="/images/Share-icon.svg" 
                        className="follow-img cursor-pointer" 
                        alt="Share" 
                        onClick={toggleSocialSharePopup} 
                    />
                </div>
            </div>
        </>
    );
};

export default SocialButtons;
