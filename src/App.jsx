import { useState } from "react";
import Hero from "./components/Hero";
import ChatWidget from "./components/chat/ChatWidget";

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="relative">
      <Hero
        onGetStarted={{
          action: () => setShowChat(true),
          hidden: showChat,
        }}
      />
      {showChat && <ChatWidget onMinimize={() => setShowChat(false)} />}
    </div>
  );
}
export default App;
