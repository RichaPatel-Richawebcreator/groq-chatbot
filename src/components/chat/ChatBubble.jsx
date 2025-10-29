import { useState } from "react";
import { copyToClipboard, formatTimestamp } from "../../utils/helpers";
import { AlertCircle, Bot, Check, Copy, User } from "lucide-react";

const ChatBubble = ({ message, isStreaming }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const isError = message.isError;

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`flex gap-2 ${
        isUser ? "justify-end" : "justify-start"
      } mb-4 group`}
    >
      {!isUser && (
        <div
          className={`${
            isError
              ? "bg-red-500"
              : "bg-linear-to-br from-purple-500 to-pink-500"
          } p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 mt-1`}
        >
          {isError ? (
            <AlertCircle className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
      )}

      <div className="flex flex-col max-w-[75%]">
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isUser
              ? "bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-br-sm"
              : isError
              ? "bg-red-50 text-red-800 border border-red-200 rounded-bl-sm"
              : "bg-white text-gray-800 shadow-md rounded-bl-sm"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap wrap-break-word">
            {message.content}
            {isStreaming && (
              <span className="inline-block w-1 h-4 bg-current ml-1 animate-pulse" />
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-1 px-2">
          <span className="text-xs text-gray-400">
            {formatTimestamp(new Date(message.timestamp))}
          </span>

          {!isUser && !isError && !isStreaming && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-600" />
              ) : (
                <Copy className="w-3 h-3 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          )}
        </div>
      </div>

      {isUser && (
        <div className="bg-gray-700 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 mt-1">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};
export default ChatBubble;
