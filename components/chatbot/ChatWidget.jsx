import React, { useState } from "react";
import { ChatWidgetTrigger } from "./ChatWidgetTrigger";
import ChatWidgetUI from "./ChatWidgetUI";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Chatbot-UI-root">
      {/* Floating Trigger Icon */}
      <ChatWidgetTrigger
        isOpen={isOpen}
        onClick={() => setIsOpen(true)}
      />

      {/* Chat Window */}
      {isOpen && (
        <ChatWidgetUI
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
