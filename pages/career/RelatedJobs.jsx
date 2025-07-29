import { useCallback } from "react";
import { useRouter } from "next/navigation";
const RelatedJobs = ({ jobs }) => {
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

    const postedTime = (details) => {
        //console.log(details)
        if (!details?.createdAt) return '';
        return timeAgo(details?.createdAt);
    };

    const router = useRouter();
    const viewJob = (details) => {
        router.push("/career/" + details?._id);
    }
    return (
        <section className="CJD-Roles-You-Might-Interested">
            <h2 className="CJD-Roles-You-Might-Interested-heading">
                You might be interested in</h2>
            {
                jobs?.map((job, index) => (
                    <div key={index} className="cursor-pointer" onClick={()=>viewJob(job)}>
                        <div className="Main-Course-CP-CJD-You-Might-Interested-Company-Para-Part">
                            <img src={process.env.NEXT_PUBLIC_FILES_URL + job?.basic?.companyLogo?.path}
                                alt="FYNJ-About-Job" height="48" width="48" className="rounded-1 Main-Course-CJD-About-Job-Company-Logo" />
                            <div className="Main-Course-CP-CJD-You-Might-Interested-Right-Part">
                                <h2 className="Main-Course-CP-CJD-You-Might-Interested-Right-Part-Heading">{job?.basic?.companyName}</h2>
                                <p className="Main-Course-CP-CJD-You-Might-Interested-Right-Part-Para">{job?.basic?.jobTitle}
                                </p>
                                <div className="d-flex row-gap-0.5 column-gap-3 align-items-center flex-wrap">
                                    <div className="d-flex gap-1 align-items-center">
                                        <img src="/images/careers/CP-FYNJ-Experience-Icon.svg"
                                            alt="CP-CJD-Experience-Icon" width="16" height="16" className="CP-CJD-Small-Icons" />
                                        <p className="CJD-Sub-Option-align-Para">{job?.basic?.experience}</p>
                                    </div>
                                    <span className="align-self-center mb-2">.</span>
                                    <div className="d-flex gap-1 align-items-center">
                                        <img src="/images/careers/CP-FYNJ-Currency-Icon.svg"
                                            alt="CP-CJD-Currency-Icon" width="16" height="16" className="CP-CJD-Small-Icons" />
                                        <p className="CJD-Sub-Option-align-Para">{job?.basic?.salary}</p>
                                    </div>
                                    <span className="align-self-center mb-2">.</span>
                                    <div className="d-flex gap-1 align-items-center">
                                        <img src="/images/careers/CP-FYNJ-Location-Icon.svg"
                                            alt="CP-CJD-Location-Icon" width="16" height="16" className="CP-CJD-Small-Icons" />
                                        <p className="CJD-Sub-Option-align-Para">{job?.basic?.location}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <div className="d-flex gap-1 align-items-center">
                                        <img src="/images/careers/CP-FYNJ-Calender-Icon.svg"
                                            alt="CP-FYNJ-Calender-Icon" width="18" height="18" className="CP-CJD-Small-Icons" />
                                        <p className="FYNJ-Sub-Option-align-Para">{postedTime(job)}</p>
                                    </div>

                                    <div className="d-flex gap-1 align-items-center">
                                        <img src="/images/careers/CP-FYNJ-Views-Icon.svg"
                                            alt="CP-FYNJ-View-Icon" width="18" height="18" className="CP-CJD-Small-Icons" />
                                        <p className="FYNJ-Sub-Option-align-Para">{job?.views?.length} Viewed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {jobs?.length - 1 > index && <div style={{ "borderBottom": "1px solid #1E527F", "marginBlock": "20px", "marginInline": "20px" }}></div>}
                    </div>
                ))
            }


        </section>
    )
}

export default RelatedJobs;