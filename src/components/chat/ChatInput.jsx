import { useEffect, useRef, useState } from "react";
import { MESSAGES_CONFIG } from "../../constants/config";
import Button from "../common/Button";
import { Send } from "lucide-react";

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <div className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={MESSAGES_CONFIG.INPUT_PLACEHOLDER}
          disabled={disabled}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
        />

        <Button onClick={handleSend} disabled={disabled || !input.trim()}>
          <Send className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center justify-between mt-2 px-2">
        <span className="text-xs text-gray-500">{input.length} / 4000</span>
      </div>
    </div>
  );
};

export default ChatInput;
