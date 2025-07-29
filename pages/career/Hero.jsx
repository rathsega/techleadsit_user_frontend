import React, { useState, useMemo, useCallback } from 'react';
import Subscribe from './Subscribe';
import SocialShare from './SocialShare';
import { useRouter } from "next/navigation";
const Hero = ({ details }) => {
    // Memoized function to get human-friendly time difference
    const timeAgo = useCallback((dateString) => {
        //console.log(dateString);
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (seconds < 60) return 'Just now';
        if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        if (days === 1) return `Yesterday`;
        if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
        if (weeks === 1) return `a week ago`;
        return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    }, []);

    // Memoized result to avoid unnecessary re-renders
    const postedTime = useMemo(() => {
        //console.log(details)
        if (!details?.career?.createdAt) return '';
        return timeAgo(details?.career?.createdAt);
    }, [details?.career?.createdAt, timeAgo]);

    const [openPopup, setOpenPopup] = useState(false)
    const [openSocialSharePopup, setOpenSocialSharePopup] = useState(false)
    const handleOpenPopup = () => {
        setOpenPopup(prev => !prev)
    }
    const handleSocialSharePopup = () => {
        setOpenSocialSharePopup(prev => !prev)
    }

    const router = useRouter();
    const applyJob = () => {
        router.push("/career/job-application/" + details?.career?._id);
    }

    return (
        <>
            <div className="Main-Course-CP-CJD-Job-Abouts">
                <div className="Career-View-company-logo-wrapper">
                    <img src={process.env.NEXT_PUBLIC_FILES_URL + details?.career?.basic?.companyLogo?.path}
                        alt="FYNJ-About-Job" className="rounded-1 Career-View-company-logo" />
                </div>

                <button className="Main-Course-CJD-Apply-Btn positioned-CJD-Btn" onClick={applyJob}>Apply Job</button>
                <div className="Main-Course-CP-CJD-Job-Abouts-Company-Details">
                    <h4 className="Main-Course-CP-CJD-Job-Abouts-Company-Details-Heading">{details?.career?.basic?.companyName}</h4>
                    <p className="Main-Course-CP-CJD-Job-Abouts-Company-Details-Para">{details?.career?.basic?.jobTitle}
                    </p>
                    <div className="d-flex row-gap-0.5 column-gap-3 align-items-center flex-wrap">
                        <div className="d-flex gap-1 align-items-center">
                            <img src="/images/careers/CP-FYNJ-Experience-Icon.svg"
                                alt="CP-FYNJ-Experience-Icon" width="18" height="18" className="CP-FYNJ-Small-Icons" />
                            <p className="CJD-Sub-Option-align-Para">{details?.career?.basic?.experience}</p>
                        </div>
                        <span className="align-self-center mb-2">.</span>
                        <div className="d-flex gap-1 align-items-center">
                            <img src="/images/careers/CP-FYNJ-Currency-Icon.svg"
                                alt="CP-FYNJ-Currency-Icon" width="18" height="18" className="CP-FYNJ-Small-Icons" />
                            <p className="CJD-Sub-Option-align-Para">{details?.career?.basic?.salary}</p>
                        </div>
                        <span className="align-self-center mb-2">.</span>
                        <div className="d-flex gap-1 align-items-center">
                            <img src="/images/careers/CP-FYNJ-Location-Icon.svg"
                                alt="CP-FYNJ-Location-Icon" width="18" height="18" className="CP-FYNJ-Small-Icons" />
                            <p className="CJD-Sub-Option-align-Para">{details?.career?.basic?.location}</p>
                        </div>
                        <span className="align-self-center mb-2">.</span>
                        <div className="d-flex gap-1 align-items-center">
                            <img src="/images/careers/CP-FYNJ-JobType-Icon.svg"
                                alt="CP-FYNJ-Currency-Icon" width="18" height="18" className="CP-FYNJ-Small-Icons" />
                            <p className="CJD-Sub-Option-align-Para">{details?.career?.basic?.employmentType}</p>
                        </div>
                        <span className="align-self-center mb-2">.</span>
                        <div className="d-flex gap-2 align-items-center cursor-pointer" onclick="CJDshareshowPopup()">
                            <img src="/images/careers/CP-FYNJ-Share-Icon.svg"
                                alt="CP-FYNJ-Currency-Icon" width="18" height="18" className="CP-FYNJ-Small-Icons" />
                            <p className="CJD-Sub-Option-align-Para CP-CJD-Share-Popup-Para-text" onClick={handleSocialSharePopup}>Share this job</p>
                        </div>
                    </div>

                    <div className="Main-Course-CP-CJD-Job-Abouts-job-info-bar">
                        <div className="Main-Course-CP-CJD-Job-Abouts-left-info">
                            <span>Posted {postedTime}</span>
                            <span>|</span>
                            <span>{details?.career?.basic?.numberOfOpenings} {details?.career?.basic?.numberOfOpenings == 1 ? " Opening" : "Openings"}</span>
                            <span>|</span>
                            <span>{details?.jobApplicationsCount} {details?.jobApplicationsCount == 1 ? " Applicant" : " Applicants"}</span>
                        </div>
                        <div className="CJD-Send-Me-Job-Like-This-link" onclick="CJDSMJLTshareshowPopup()">
                            <a href="#" onClick={handleOpenPopup} className="Main-Course-CP-CJD-Job-Abouts-job-link">Send me jobs like this</a>
                        </div>
                    </div>


                </div>
            </div>

            {openPopup && <Subscribe handleOpenPopup={handleOpenPopup}></Subscribe>}
            {openSocialSharePopup && <SocialShare handleSocialSharePopup={handleSocialSharePopup}></SocialShare>}
        </>
    )
}

export default Hero;