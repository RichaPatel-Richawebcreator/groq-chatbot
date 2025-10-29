import { Bot, Code, Lightbulb, MessageSquare, Sparkles } from "lucide-react";
import { MESSAGES_CONFIG } from "../../constants/config";

const EmptyState = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center max-w-md px-4">
      <div className="bg-linear-to-br from-purple-500 to-pink-500 p-6 rounded-full inline-block mb-6">
        <Bot className="w-16 h-16 text-white" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-3">
        {MESSAGES_CONFIG.WELCOME.TITLE}
      </h2>

      <p className="text-gray-600 mb-8">{MESSAGES_CONFIG.WELCOME.SUBTITLE}</p>

      <div className="grid gap-3 text-left">
        {[
          { icon: Code, text: "Help with coding problems" },
          { icon: Lightbulb, text: "Creative ideas & brainstorming" },
          { icon: MessageSquare, text: "Natural conversations" },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-lg p-3"
          >
            <div className="bg-purple-100 p-2 rounded-lg">
              <feature.icon className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-gray-700 font-medium">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default EmptyState;
