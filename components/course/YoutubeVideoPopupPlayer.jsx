import React, { useCallback } from "react";
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => <p>Loading video player...</p>,
});

const YoutubeVideoPopupPlayer = React.memo(({ youtibeopenVideoPopup, handleYoutibeOpenVideoPopup, videoPath }) => {
    const handleClose = useCallback(() => handleYoutibeOpenVideoPopup(false), [handleYoutibeOpenVideoPopup]);
    if (!youtibeopenVideoPopup || !videoPath) return null;

    return (
        <>
            <div className="Watch-Video-overlay" onClick={handleClose}></div>
            <div className="lesson-popup">
                <div className="close" onClick={handleClose}>
                    <p className="mb-0">CLOSE</p>
                    <span style={{ fontSize: "30px", marginLeft: "3px" }}>&times;</span>
                </div>
                <ReactPlayer
                    className="lesson-popup-video"
                    url={videoPath}
                    controls
                    playing
                />
            </div>
        </>
    );
});

export default YoutubeVideoPopupPlayer;