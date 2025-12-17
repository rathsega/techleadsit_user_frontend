import React from "react";
import Lottie from "lottie-react";
import robotAnimation from "./../../public/styles/robot-animation.json";

export const WidgetIcon = ({ isHovered, size = "lg", className = "" }) => {
  const sizeMap = {
    sm: 40,
    md: 80,
    lg: 100,
  };

  return (
    <div className={`Chatbot-UI-icon-wrapper Chatbot-UI-icon-${size} ${className}`}>
      <Lottie
        animationData={robotAnimation}
        loop
        autoplay
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
        }}
      />
    </div>
  );
};
