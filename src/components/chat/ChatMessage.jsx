import { useState } from "react";
import { copyToClipboard, formatTimestamp } from "../../utils/helpers";
import { AlertCircle, Bot, Check, Copy, User } from "lucide-react";

const ChatMessage = ({ message }) => {
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
      className={`flex gap-3 mt-3 ${
        isUser ? "justify-end" : "justify-start"
      } group`}
    >
      {!isUser && (
        <div
          className={`${
            isError
              ? "bg-red-500"
              : "bg-linear-to-br from-purple-500 to-pink-500"
          } p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0`}
        >
          {isError ? (
            <AlertCircle className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
      )}

      <div className="flex flex-col max-w-[70%]">
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-linear-to-br from-purple-500 to-pink-500 text-white"
              : isError
              ? "bg-red-50 text-red-800 border border-red-200"
              : "bg-white shadow-md text-gray-800"
          }`}
        >
          <p className="whitespace-pre-wrap wrap-break-word overflow-y-auto max-h-[500px]">
            {message.content}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-1 px-2">
          <span className="text-xs text-gray-500">
            {formatTimestamp(new Date(message.timestamp))}
          </span>

          {!isUser && !isError && (
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
        <div className="bg-gray-700 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
