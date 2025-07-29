import Image from "next/image";
import React, { useCallback } from "react";

const LiveChatButton = React.memo(({
  className = "",
  iconSrc,
  iconAlt = "",
  iconWidth = 24,
  iconHeight = 24,
  label = "Live Chat with Us",
}) => {
  const handleClick = useCallback(() => {
    window.open(process.env.NEXT_PUBLIC_LIVE_CHAT_URL, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <button type="button" className={`inline-flex items-center ${className}`} onClick={handleClick}>
      {iconSrc &&
        (typeof iconSrc === "string" ? (
          <img src={iconSrc} alt={iconAlt} width={iconWidth} height={iconHeight} className="me-2" />
        ) : (
          <Image src={iconSrc} alt={iconAlt} width={iconWidth} height={iconHeight} className="me-2" />
        ))}
      <span>{label}</span>
    </button>
  );
});

export default LiveChatButton;
