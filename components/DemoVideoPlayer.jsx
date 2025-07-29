// components/DemoVideoPlayer.jsx
import { useRef } from 'react';

function DemoVideoPlayer() {
  const videoRef = useRef(null);
  const playPauseBtnRef = useRef(null);

  const togglePlayPause = () => {
    const video = videoRef.current;
    const btn = playPauseBtnRef.current;

    if (video.paused) {
      video.play();
      btn.textContent = '❚❚';
    } else {
      video.pause();
      btn.textContent = '►';
    }
  };

  const skip10Sec = () => {
    videoRef.current.currentTime += 10;
  };

  return (
    <div>
      <video
        id="Main-Course-Watch-Our-Demo-Section-customVideo"
        ref={videoRef}
        controls
        width="400"
      />
      <div>
        <button id="playPauseBtn" ref={playPauseBtnRef} onClick={togglePlayPause}>
          ►
        </button>
        <button onClick={skip10Sec}>+10s</button>
      </div>
    </div>
  );
}

export default DemoVideoPlayer;
