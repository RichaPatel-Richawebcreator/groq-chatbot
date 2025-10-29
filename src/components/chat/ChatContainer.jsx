import React, { useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import ChatMessage from "./ChatMessage";
import EmptyState from "./EmptyState";
import LoadingDots from "../common/LoadingDots";
import { scrollToBottom } from "../../utils/helpers";

const ChatContainer = ({ messages, isLoading, onDeleteMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages, isLoading]);

  return (
    <>
      {messages.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onDelete={() => onDeleteMessage(msg.id)}
            />
          ))}

          {isLoading && (
            <div className="loading-container">
              <LoadingDots />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ChatContainer;
