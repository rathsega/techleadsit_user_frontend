"use client"; // Required for Next.js App Router

import React from "react";
import { usePathname } from "next/navigation";
import {
    FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton
} from "react-share";

const SocialShare = ({ toggleSocialSharePopup }) => {
    const pathname = usePathname();
    let currentUrl = "";
    if (typeof window !== "undefined") {
        currentUrl = typeof window !== "undefined"
            ? window.location.origin + pathname
            :  process.env.NEXT_PUBLIC_LMS_URL;
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                const copyMsg = document.getElementById("copy-msg");
                copyMsg.style.display = "block";
                setTimeout(() => {
                    copyMsg.style.display = "none";
                }, 2000);
            })
            .catch(err => console.error("Failed to copy:", err));
    };

    // Close the popup when clicking outside of it or pressing the Escape key
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            const popup = document.getElementById("blog-ov-share-popup");
            if (popup && !popup.contains(event.target)) {
                toggleSocialSharePopup();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                toggleSocialSharePopup();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }
    , [toggleSocialSharePopup]);

    return (
        <div id="blog-ov-share-popup" className="blog-ov-share-popup" onClick={toggleSocialSharePopup}>
            <div className="blog-ov-share-popup-content" onClick={(e) => e.stopPropagation()}>
                <h1 className="blog-ov-share-popup-h">Share this blog</h1>
                <span className="blog-ov-share-close" onClick={toggleSocialSharePopup}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
                <p className="blog-ov-share-popup-p">
                    If you like this article, share it with your friends.
                </p>

                <div className="Blog-ov-share-icons">
                    
                    <WhatsappShareButton url={currentUrl}>
                        <div className="share-icon-container">
                            <img src="/images/careers/whatsapp.svg" className="Blog-ov-icons-popup cursor-pointer" alt="WhatsApp" />
                            <p className="Blog-ov-share-W Blog-ov-share-text">WhatsApp</p>
                        </div>
                    </WhatsappShareButton>

                    <LinkedinShareButton url={currentUrl}>
                        <div className="share-icon-container">
                            <img src="/images/careers/linkedin.svg" className="Blog-ov-icons-popup cursor-pointer" alt="LinkedIn" />
                            <p className="Blog-ov-share-L Blog-ov-share-text">LinkedIn</p>
                        </div>
                    </LinkedinShareButton>

                    <FacebookShareButton url={currentUrl}>
                        <div className="share-icon-container">
                            <img src="/images/careers/facebook.svg" className="Blog-ov-icons-popup cursor-pointer" alt="Facebook" />
                            <p className="Blog-ov-share-F Blog-ov-share-text">Facebook</p>
                        </div>
                    </FacebookShareButton>

                    <TwitterShareButton url={currentUrl}>
                        <div className="share-icon-container">
                            <img src="/images/careers/twitter.svg" className="Blog-ov-icons-popup cursor-pointer" alt="Twitter" />
                            <p className="Blog-ov-share-T Blog-ov-share-text">Twitter</p>
                        </div>
                    </TwitterShareButton>

                </div>

                <div className="Blog-ov-text" onClick={copyToClipboard}>
                    <span className="Blog-ov-link-text">{currentUrl}</span>
                    <i className="fa-solid fa-link" id="link-icon"></i>
                </div>

                <div id="copy-msg" style={{ display: "none" }}>Link copied</div>
            </div>
        </div>
    );
};

export default SocialShare;
