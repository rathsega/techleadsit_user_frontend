import React from "react";
import { useEffect, useState } from 'react'
import httpService from '../../services/httpService'


const TimelineCard = ({ imgSrc, time, title }) => (
    <div className="C-Webinar-Page-timeline-card">
            <img src={imgSrc} alt={title} />
            <p className="C-Webinar-Page-time-label mt-2">
                {time} &nbsp;&nbsp; <br className="d-block d-xl-none" />
                <span className="C-Webinar-Page-title">{title}</span>
            </p>
    </div>
);

const SessionOverview = ({ details }) => {

    const [imageSrc, setImageSrc] = useState([]);
    const [modifiedDetails, setModifiedDetails] = useState([])
    useEffect(() => {
        const fetchWhyAttendIcons = async () => {
            try {
                // Extract the file paths from details
                const icons = details?.topics.map(detail => detail.image.path);
                //console.log(icons);

                // Make the API call
                const response = await httpService.post('fileupload/fetchFiles', { filePaths: icons });

                if (response.data) {
                    // Map the response to base64 image sources
                    const newImageSrcs = response.data.map(
                        fileSrc => `data:${fileSrc.type};base64,${fileSrc.data}`
                    );

                    // Update the state with all new icons at once
                    setImageSrc(prevImageSrc => [...prevImageSrc, ...newImageSrcs]);
                } else {
                    console.error('No data received from the API');
                }
            } catch (error) {
                console.error('Error fetching icons:', error);
            }
        };

        let duration = 0;
        //console.log(details);
        details.topics = details?.topics?.map(item => {
            let tempDuration = item.duration;
            item.duration = duration + " - " + (duration + parseInt(tempDuration));
            duration += parseInt(tempDuration);
            return item; // Ensure the modified item is returned
        });
        setModifiedDetails(details);
        //fetchWhyAttendIcons();
    }, [details])

    return (<section className="C-Webinar-Page-Curriculum-section mt-5">
        <h2 className="C-Webinar-Page-c-heading mb-3">CURRICULUM</h2>
        <h1 className="C-Webinar-Page-c-subhead">OUR SESSIONS OVERVIEW</h1>
        <p className="C-Webinar-Page-c-para mt-2">
           {details?.shortDescription}
        </p>
        <div className="pt-3">
            <div className="C-Webinar-Page-session-cards">
                {modifiedDetails?.topics?.map((session, index) => (
                    <TimelineCard
                        key={index}
                        imgSrc={process.env.NEXT_PUBLIC_FILES_URL + session?.image?.path}
                        time={session.duration}
                        title={session.title}
                    />
                ))}
            </div>
        </div>
    </section>)
};

export default SessionOverview;
