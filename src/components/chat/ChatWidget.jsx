import { useCallback, useEffect, useRef, useState } from "react";
import {
  generateId,
  scrollToBottom,
  validateMessage,
} from "../../utils/helpers";
import sendMessageToGroq from "../../services/groqService";
import {
  Bot,
  MessageSquare,
  Minimize2,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";
import ChatBubble from "./ChatBubble";
import LoadingDots from "../common/LoadingDots";

const ChatWidget = ({ onMinimize }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  useEffect(() => {
    if (!isStreaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isStreaming]);

  const sendMessage = useCallback(async () => {
    const validation = validateMessage(input);
    if (!validation.valid || isStreaming) return;

    const userMessage = {
      id: generateId(),
      role: "user",
      content: validation.value,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);

    // Create placeholder for AI message
    const aiMessageId = generateId();
    const aiMessage = {
      id: aiMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, aiMessage]);

    const apiMessages = [...messages, userMessage].map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    await sendMessageToGroq(
      apiMessages,
      (chunk) => {
        // Update AI message with each chunk
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      },
      () => {
        // Streaming complete
        setIsStreaming(false);
      },
      (error) => {
        // Error occurred
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: error, isError: true }
              : msg
          )
        );
        setIsStreaming(false);
      }
    );
  }, [input, messages, isStreaming]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isStreaming) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-linear-to-r from-purple-500 to-pink-500 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">Groq AI Assistant</h2>
            <p className="text-white/80 text-xs">Powered by Llama 3.3</p>
          </div>
        </div>

        <div className="flex gap-2">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="text-white/80 hover:text-white transition p-1"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onMinimize}
            className="text-white/80 hover:text-white transition p-1"
            title="Go to home"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-linear-to-br from-purple-50/50 via-blue-50/50 to-pink-50/50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="bg-linear-to-br from-purple-500 to-pink-500 p-4 rounded-full inline-block mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Start a conversation
              </h3>
              <p className="text-sm text-gray-600">Ask me anything!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg}
                isStreaming={
                  isStreaming &&
                  msg.role === "assistant" &&
                  msg.id === messages[messages.length - 1].id
                }
              />
            ))}
            {isStreaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2 justify-start mb-4">
                <div className="bg-linear-to-br from-purple-500 to-pink-500 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-md">
                  <LoadingDots />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isStreaming}
            className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition disabled:bg-gray-50"
          />

          <button
            onClick={sendMessage}
            disabled={isStreaming || !input.trim()}
            className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 py-2.5 rounded-xl hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-400 text-right">
          {input.length}/4000
        </div>
      </div>
    </div>
  );
};
export default ChatWidget;
