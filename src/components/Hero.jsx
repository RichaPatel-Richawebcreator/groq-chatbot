import {
  Heart,
  HeartIcon,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Zap,
} from "lucide-react";
import Button from "./common/Button";

const Hero = ({ onGetStarted }) => (
  <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
    <div className="max-w-4xl mx-auto text-center">
      {/* Hero Icon */}
      <div className="relative mb-8">
        <div className="bg-linear-to-br from-purple-500 to-pink-500 p-8 rounded-full inline-block animate-pulse">
          <Sparkles className="w-20 h-20 text-white" />
        </div>
      </div>

      {/* Hero Text */}
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
        Welcome to Groq AI Chat
      </h1>

      <p className="text-xl md:text-2xl text-gray-700 mb-4">
        Experience lightning-fast AI conversations
      </p>

      <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Powered by Llama 3.3 70B - Get instant, intelligent responses for coding
        help, creative writing, problem-solving, and more!
      </p>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
        {[
          {
            icon: Zap,
            title: "Lightning Fast",
            desc: "Get responses in milliseconds",
          },
          {
            icon: Lightbulb,
            title: "Smart & Helpful",
            desc: "Intelligent answers to any question",
          },
          {
            icon: HeartIcon,
            title: "Easy to Use",
            desc: "Simple, beautiful interface",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="bg-linear-to-br from-purple-100 to-pink-100 p-4 rounded-xl inline-block mb-4">
              <feature.icon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      {!onGetStarted.hidden && (
        <div className="flex justify-center float-right">
          <Button onClick={onGetStarted.action} className="text-lg px-8 py-4">
            <MessageSquare className="w-6 h-6" />
            Start Chatting Now
          </Button>
        </div>
      )}
    </div>
  </div>
);
export default Hero;
