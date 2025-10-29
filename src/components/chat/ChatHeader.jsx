import { MessageSquare, Trash2 } from "lucide-react";
import Button from "../common/Button";

const ChatHeader = ({ onClearChat, onGoHome, messageCount }) => (
  <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
    <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onGoHome} className="hover:scale-110 transition">
          <div className="bg-linear-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
        </button>
        <div>
          <h1 className="text-xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Groq AI Chat
          </h1>
          <p className="text-xs text-gray-500">
            Powered by Llama 3.3 • {messageCount} messages
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {messageCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearChat}>
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  </header>
);
export default ChatHeader;
