import React, { useState, useRef, useEffect } from "react";
import { WidgetIcon } from "./WidgetIcon";
import { Send, Phone, X } from "lucide-react";
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

const API_BASE = "https://chatbotapi.techleadsit.com";
const SESSION_KEY = "tl_chat_session_id";

const demoMessages = [
  {
    id: 1,
    sender: "ai",
    text: "Welcome to Techleads IT. I'm here 24×7 to help you choose the right course. What should I call you?",
    time: "17:59",
  }
];

function generateSessionId() {
  // simple unique id
  return `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatWidgetUI({ onClose, isOpen }) {
  const [messages, setMessages] = useState(demoMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const sessionIdRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // load or create session when widget opens
  useEffect(() => {
    if (!isOpen) return;

    const init = async () => {
      try {
        let sessionId = null;
        if (typeof window !== "undefined") {
          sessionId = localStorage.getItem(SESSION_KEY);
        }

        if (!sessionId) {
          sessionId = generateSessionId();
          localStorage.setItem(SESSION_KEY, sessionId);
        }
        sessionIdRef.current = sessionId;

        // fetch existing chat history if any
        try {
          const res = await fetch(`${API_BASE}/sessions/${encodeURIComponent(sessionId)}`);
          if (res.ok) {
            const data = await res.json();
            // expect data.messages || data.history array; normalize
            const fetched = data?.messages || data?.history || data || [];
            if (Array.isArray(fetched) && fetched.length > 0) {
              // map to our message shape if necessary
              const norm = fetched.map((m, idx) => {
                let sender = m.sender ?? (m.role === "assistant" ? "ai" : "user");
                let text = m.text ?? m.message ?? m.content ?? "";
                // If assistant and content is JSON with msg_to_user, extract it
                if (sender === "ai" && typeof text === "string") {
                  try {
                    const parsed = JSON.parse(text);
                    if (parsed && parsed.msg_to_user) {
                      text = parsed.msg_to_user;
                    }
                  } catch (e) {
                    // not JSON, use as-is
                  }
                }
                return {
                  id: m.id ?? `srv_${idx}_${Date.now()}`,
                  sender,
                  text,
                  time:
                    m.time ??
                    (m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
                };
              });
              setMessages(norm);
            }
          } else {
            // no session yet - keep demo or empty messages
          }
        } catch (err) {
          // fetch session failed -> ignore, keep demo
          console.error("Failed to fetch chat session:", err);
        }
      } catch (err) {
        console.error("Chat init error:", err);
      }
    };

    init();
  }, [isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const sessionId = sessionIdRef.current || (() => {
      const s = generateSessionId();
      sessionIdRef.current = s;
      if (typeof window !== "undefined") localStorage.setItem(SESSION_KEY, s);
      return s;
    })();

    // Create placeholder for streaming message
    const assistantMsgId = `ai_${Date.now()}`;
    const assistantMsg = {
      id: assistantMsgId,
      sender: "ai",
      text: "",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      streaming: true,
    };
    setMessages((prev) => [...prev, assistantMsg]);

    setIsTyping(true);

    try {
      const url = `${API_BASE}/agent?user_message=${encodeURIComponent(text)}&session_id=${encodeURIComponent(sessionId)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Agent responded with ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      setIsTyping(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        
        // Parse markdown and update the streaming message in real-time
        const parsedHtml = marked.parse(result);
        const sanitizedHtml = DOMPurify.sanitize(parsedHtml);
        
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? { ...msg, text: result, renderedHtml: sanitizedHtml, streaming: true }
              : msg
          )
        );
      }

      // Mark streaming as complete
      const finalParsedHtml = marked.parse(result);
      const finalSanitizedHtml = DOMPurify.sanitize(finalParsedHtml);
      
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? { ...msg, text: result, renderedHtml: finalSanitizedHtml, streaming: false }
            : msg
        )
      );

    } catch (error) {
      console.error("Agent request failed:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                text: "Unable to reach the assistant. Please try again later.",
                streaming: false,
              }
            : msg
        )
      );
      setIsTyping(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="chatbot-ui-wrapper">
      <div className="chatbot-ui-container">
        {/* HEADER */}
        <div className="chatbot-ui-header">
          <div className="chatbot-ui-header-left">
            <div className="chatbot-ui-header-icon">
              <WidgetIcon size="sm" className="chatbot-ui-widgeticon" />
            </div>

            <div className="chatbot-ui-header-info">
              <div className="chatbot-ui-header-title">Techleads AI</div>
              <div className="chatbot-ui-header-status">
                <span className="chatbot-ui-status-dot"></span>
                <span>Online • AI Mentor</span>
              </div>
            </div>
          </div>

          <div className="chatbot-ui-header-actions">
            <a href="tel:+918125323232" className="chatbot-ui-header-action-btn">
              <Phone size={16} className="chatbot-ui-action-icon" />
            </a>

            <button className="chatbot-ui-header-action-btn" onClick={onClose}>
              <X size={16} className="chatbot-ui-action-icon" />
            </button>
          </div>
        </div>

        {/* MESSAGES AREA */}
        <div className="chatbot-ui-messages">
          <div className="chatbot-ui-messages-inner">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}

            {isTyping && (
              <div className="chatbot-ui-ai-typing">
                <div className="chatbot-ui-ai-avatar">AI</div>
                <div className="chatbot-ui-ai-typing-bubble">
                  <div className="chatbot-ui-ai-typing-loader"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* INPUT AREA */}
        <div className="chatbot-ui-input-section">
          <div className="chatbot-ui-input-wrapper">
            <div className="chatbot-ui-input-container">
              {/* Left icon */}
              <span className="chatbot-ui-input-lefticon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16v12H7l-3 3V4z" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>

              {/* Input field */}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="chatbot-ui-input"
              />

              {/* Send button */}
              <button onClick={sendMessage} className="chatbot-ui-send-btn" aria-label="Send message">
                <Send size={16} className="chatbot-ui-send-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* MESSAGE BUBBLE */
function formatMessageText(text) {
  if (!text) return "";
  
  try {
    // Parse markdown to HTML
    const html = marked.parse(text);
    // Sanitize HTML to prevent XSS
    return DOMPurify.sanitize(html);
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return DOMPurify.sanitize(text);
  }
}

function MessageBubble({ message }) {
  const isAI = message.sender === "ai";

  return (
    <div className={`chatbot-ui-bubble-row ${isAI ? "chatbot-ui-ai-row" : "chatbot-ui-user-row"}`}>
      {isAI && <div className="chatbot-ui-ai-avatar">AI</div>}

      <div className={`chatbot-ui-bubble ${isAI ? "chatbot-ui-bubble-ai" : "chatbot-ui-bubble-user"}`}>
        <div 
          className="chatbot-ui-bubble-text" 
          dangerouslySetInnerHTML={{ 
            __html: isAI 
              ? (message.renderedHtml || formatMessageText(message.text))
              : DOMPurify.sanitize(message.text) 
          }} 
        />
        <div className="chatbot-ui-bubble-time">{message.time}</div>
      </div>

      {!isAI && <div className="chatbot-ui-user-avatar">Y</div>}
    </div>
  );
}