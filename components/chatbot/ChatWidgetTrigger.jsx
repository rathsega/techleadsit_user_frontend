import React, { useState, useEffect, useRef } from "react";
import { WidgetIcon } from "./WidgetIcon.jsx";

export const ChatWidgetTrigger = ({ isOpen, onClick, hasNewMessage = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showIdleMessage, setShowIdleMessage] = useState(false);

  const idleTimerRef = useRef(null);
  const hideTimerRef = useRef(null);

  // Idle message logic
  useEffect(() => {
    if (isOpen || isHovered) {
      setShowIdleMessage(false);
      clearTimeout(idleTimerRef.current);
      clearTimeout(hideTimerRef.current);
      return;
    }

    const showMessage = () => {
      setShowIdleMessage(true);
      hideTimerRef.current = setTimeout(() => {
        setShowIdleMessage(false);
        idleTimerRef.current = setTimeout(showMessage, 8000);
      }, 4000);
    };

    idleTimerRef.current = setTimeout(showMessage, 5000);

    return () => {
      clearTimeout(idleTimerRef.current);
      clearTimeout(hideTimerRef.current);
    };
  }, [isOpen, isHovered]);

  if (isOpen) return null;

  return (
    <div className="Chatbot-UI-trigger-wrapper">

      {/* Tooltip bubble */}
      <div
        className={
          "Chatbot-UI-idle-tooltip " +
          (showIdleMessage ? "Chatbot-UI-tooltip-show" : "Chatbot-UI-tooltip-hide")
        }
      >
        <p>24×7 smart guidance. You bring questions, we bring direction.</p>
      </div>

      {/* Floating button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="Chatbot-UI-trigger-button"
      >
        <div className="Chatbot-UI-trigger-inner">

          {/* CTA bubble */}
          <div
            className={
              "Chatbot-UI-trigger-cta " +
              (isHovered ? "Chatbot-UI-cta-show" : "Chatbot-UI-cta-hide")
            }
          >
            <span>Chat with our AI assistant</span>
          </div>

          {/* Bot Icon */}
          <WidgetIcon isHovered={isHovered} />
        </div>
      </button>
    </div>
  );
};
