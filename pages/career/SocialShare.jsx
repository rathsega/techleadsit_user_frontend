"use client"; // Required for Next.js App Router

import React from "react";
import { usePathname } from "next/navigation";
import {
    FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton
} from "react-share";

const SocialShare = ({ handleSocialSharePopup }) => {
    const pathname = usePathname();
    let currentUrl = "";
    if (typeof window !== "undefined") {
        currentUrl = typeof window !== "undefined"
            ? window.location.origin + pathname
            : process.env.NEXT_PUBLIC_LMS_URL;
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

    return (
        <div id="Main-Course-CP-CJD-Job-ov-share-popup" className="Main-Course-CP-CJD-Job-ov-share-popup"
            onClick={handleSocialSharePopup}>
            <div className="Main-Course-CP-CJD-Job-ov-share-popup-content" onClick={(e) => e.stopPropagation()}>
                <h1 className="Main-Course-CP-CJD-Job-ov-share-popup-h">Share this Job</h1>
                <span className="Main-Course-CP-CJD-Job-ov-share-close" onClick={handleSocialSharePopup}><i
                    className="fa-solid fa-xmark"></i></span>
                <p className="Main-Course-CP-CJD-Job-ov-share-popup-p">Know someone perfect for this role? Help them grow by
                    sharing! </p>
                <div className="Main-Course-CP-CJD-Job-ov-share-icons">

                    <WhatsappShareButton url={currentUrl}>
                        <div className="">
                            <img src="/images/careers/whatsapp.svg"
                                className="Main-Course-CP-CJD-Job-ov-icons-popup" />
                            <p className="Main-Course-CP-CJD-Job-ov-share-W Main-Course-CP-CJD-Job-ov-share-text">WhatsApp</p>
                        </div>
                    </WhatsappShareButton>

                    <LinkedinShareButton url={currentUrl}>
                        <div className="">
                            <img src="/images/careers/linkedin.svg"
                                className="Main-Course-CP-CJD-Job-ov-icons-popup" />
                            <p className="Main-Course-CP-CJD-Job-ov-share-L Main-Course-CP-CJD-Job-ov-share-text">Linkedin</p>
                        </div>
                    </LinkedinShareButton>

                    <FacebookShareButton url={currentUrl}>
                        <div className="">
                            <img src="/images/careers/facebook.svg"
                                className="Main-Course-CP-CJD-Job-ov-icons-popup" />
                            <p className="Main-Course-CP-CJD-Job-ov-share-F Main-Course-CP-CJD-Job-ov-share-text">Facebook</p>
                        </div>
                    </FacebookShareButton>

                    <TwitterShareButton url={currentUrl}>
                        <div className="">
                            <img src="/images/careers/twitter.svg"
                                className="Main-Course-CP-CJD-Job-ov-icons-popup" />
                            <p className="Main-Course-CP-CJD-Job-ov-share-T Main-Course-CP-CJD-Job-ov-share-text">Twitter</p>
                        </div>
                    </TwitterShareButton>


                </div>
                <div className="Main-Course-CP-CJD-Job-ov-text" onClick={copyToClipboard}>
                    <span className="Main-Course-CP-CJD-Job-ov-link-text">{currentUrl}</span>
                    <i className="fa-solid fa-link" id="link-icon"></i>
                </div>
                <div id="copy-msg" style={{ display: "none" }}>Link copied</div>
            </div>
        </div>
    )
}

export default SocialShare;