import React, { useState, useEffect } from "react";
import httpService from '../../services/httpService'

const VideoTestimonialPopup = ({ openVideoPopup, setOpenVideoPopup, videoPath, videoType }) => {
    const [showPopup, setShowPopup] = useState(true);
    const [videoSrc, setVideoSrc] = useState(null);
    useEffect(() => {
        const fetchVideoSource = async () => {
            try {
                const response = await httpService.post('fileupload/video', { filePath: videoPath, type: 'video' });
                //console.log(response);
                if (response) {
                    const videoUrl = URL.createObjectURL(response.data);
                    setVideoSrc(videoUrl);
                } else {
                    console.error('No data received from the API');
                }
            } catch (error) {
                console.error('Error fetching webinars:', error);
            }
        };

        videoPath && fetchVideoSource();
        setShowPopup(openVideoPopup);
    }, [videoPath])


    return (
        <>
            {openVideoPopup && videoSrc && (
                <>
                    <div className="Watch-Video-overlay" id="overlay" onClick={(e) => setOpenVideoPopup(false)}></div>
                    <div className="C-Webinar-page-video-popup" id="videoPopup">
                        <div className="C-Webinar-page-close" onClick={(e) => setOpenVideoPopup(false)}>
                            <p className="mb-0">CLOSE</p><span style={{ "fontSize": "30px", "marginLeft": "3px" }}>&times; </span>
                        </div>
                        <video id="myVideo" controls autoPlay>
                            <source src={videoSrc} type={videoType} />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </>
            )}
        </>
    );
};

export default VideoTestimonialPopup;

