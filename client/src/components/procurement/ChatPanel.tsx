import React, { useState, useEffect, useRef } from "react";
import { Bot, ChevronRight, CornerDownLeft, PanelRight, Send, Sparkles, UserRound } from "lucide-react";
import { useProcurement } from "@/store/procurement";

export function ChatPanel() {
  const {
    user,
    userMessage,
    submitChatMessage,
    requirementConfirmed,
  } = useProcurement();

  const firstName = user?.name ? user.name.split(" ")[0] : "Arjun";
  const initials = user?.initials || "AK";

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [displayedAgentReply, setDisplayedAgentReply] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fullAgentReply =
    "I have extracted and structured your procurement requirement for IS 2062 E250 Steel Plates (500 MT, 10mm, Delhi Central Warehouse). The structured parameters are populated beside this chat. Please confirm the requirement to begin mill supplier evaluation and landed cost normalization.";

  // When user message changes, simulate AI typing out response
  useEffect(() => {
    if (!userMessage) {
      setDisplayedAgentReply("");
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedAgentReply("");

    let currentLength = 0;
    const interval = setInterval(() => {
      currentLength += 4;
      if (currentLength >= fullAgentReply.length) {
        setDisplayedAgentReply(fullAgentReply);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedAgentReply(fullAgentReply.slice(0, currentLength));
      }
    }, 18);

    return () => clearInterval(interval);
  }, [userMessage]);

  const handleSend = () => {
    if (!inputVal.trim()) return;
    submitChatMessage(inputVal.trim());
    setInputVal("");
  };

  const loadPreset = () => {
    const preset =
      "I need 500 MT of IS 2062 E250 steel plates, 10mm thickness, delivered to our Delhi warehouse within 15 days.";
    setInputVal(preset);
    submitChatMessage(preset);
  };

  return (
    <div id="chat" className="chat-panel panel">
      <div className="chat-topline">
        <div className="chat-agent">
          <div className="agent-avatar">
            <Bot size={17} />
          </div>
          <div>
            <strong>Source AI</strong>
            <span>Autonomous Steel Procurement Agent · Online</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-pill status-green">
            <span className="status-dot" /> Ready
          </span>
        </div>
      </div>

      <div className="chat-messages">
        {/* Welcome greeting */}
        <div className="message-row">
          <div className="agent-avatar small">
            <Bot size={14} />
          </div>
          <div className="message-bubble agent-message">
            <p>
              Good morning, {firstName}. What material do you need to procure today? You can state the
              grade, volume, dimensions, and destination in plain English.
            </p>
            <span>09:41 AM</span>
          </div>
        </div>

        {/* User message if present */}
        {userMessage && (
          <div className="message-row user-row">
            <div className="message-bubble user-message">
              <p>{userMessage}</p>
              <span>09:42 AM</span>
            </div>
            <div className="user-avatar">{initials}</div>
          </div>
        )}

        {/* Agent streaming reply */}
        {userMessage && (
          <div className="message-row">
            <div className="agent-avatar small">
              <Bot size={14} />
            </div>
            <div className="message-bubble agent-message">
              <p>
                {displayedAgentReply}
                {isTyping && <span className="typing-cursor">|</span>}
              </p>
              <span>{isTyping ? "Transcribing..." : "09:42 AM"}</span>
            </div>
          </div>
        )}

        {/* Suggested prompt chip if no message yet */}
        {!userMessage && (
          <div className="mt-3">
            <button
              type="button"
              className="prompt-suggestion"
              onClick={loadPreset}
            >
              <Sparkles size={14} />
              <span>Use demo request: 500 MT IS 2062 E250 plates (Delhi, 15 days)</span>
              <ChevronRight size={13} />
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-composer">
        <textarea
          aria-label="Procurement request"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="e.g. I need 500 MT of IS 2062 E250 steel plates, 10mm thickness, delivered to Delhi warehouse within 15 days..."
          rows={2}
        />
        <div className="composer-bottom">
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <kbd className="keyboard-key">↵ Enter</kbd> to submit request
          </span>
          <button
            type="button"
            className="send-button"
            onClick={handleSend}
            disabled={!inputVal.trim()}
            aria-label="Send procurement request"
          >
            <Send size={15} />
          </button>
        </div>
      </div>

      {requirementConfirmed && (
        <div className="chat-confirmed">
          <Sparkles size={14} />
          <span>Requirement verified & locked — Agent is evaluating primary steel producers</span>
        </div>
      )}
    </div>
  );
}
