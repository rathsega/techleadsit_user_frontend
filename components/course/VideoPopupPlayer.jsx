import React, {useCallback } from "react";


const VideoPlayerPopup = React.memo(({ openVideoPopup, handleOpenVideoPopup, videoPath, videoType }) => {

    const handleClose = useCallback(() => handleOpenVideoPopup(), [handleOpenVideoPopup]);
    if (!openVideoPopup || !videoPath) return null;
    return (
        <>
            {openVideoPopup && videoPath && (
                <>
                    <div className="Watch-Video-overlay" id="overlay" onClick={handleOpenVideoPopup}></div>
                    <div className="lesson-popup" id="videoPopup">
                        <div className="close" onClick={handleOpenVideoPopup}>
                            <p className="mb-0">CLOSE</p><span style={{ "fontSize": "30px", "marginLeft": "3px" }}>&times; </span>
                        </div>
                        <video id="myVideo" className="lesson-popup-video" controls autoPlay>
                            <source src={videoPath} type={videoType} />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </>
            )}
        </>
    );
});

export default VideoPlayerPopup;

