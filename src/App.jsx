import { useCallback, useState } from "react";
import { generateId } from "./utils/helpers";
import sendMessageToGroq from "./services/groqService";
import { validateMessage } from "./utils/validators";
import ChatHeader from "./components/chat/ChatHeader";
import ChatContainer from "./components/chat/ChatContainer";
import ChatInput from "./components/chat/ChatInput";
import Hero from "./components/Hero";

function App() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (content) => {
      const validation = validateMessage(content);
      if (!validation.valid) {
        return;
      }

      const userMessage = {
        id: generateId(),
        role: "user",
        content: validation.value,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const apiMessages = [...messages, userMessage].map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        const response = await sendMessageToGroq(apiMessages);

        const aiMessage = {
          id: generateId(),
          role: "assistant",
          content: response.content,
          timestamp: new Date().toISOString(),
          usage: response.usage,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (err) {
        const errorMessage = {
          id: generateId(),
          role: "assistant",
          content: err.message,
          timestamp: new Date().toISOString(),
          isError: true,
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const handleGetStarted = () => {
    setShowChat(true);
  };

  const handleGoHome = () => {
    setShowChat(false);
    setMessages([]);
  };

  if (!showChat) {
    return <Hero onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 flex flex-col">
      <ChatHeader
        onClearChat={clearMessages}
        onGoHome={handleGoHome}
        messageCount={messages.length}
      />

      <div className="flex-1 overflow-hidden flex flex-col justify-center max-w-4xl mx-auto w-full">
        <ChatContainer messages={messages} isLoading={isLoading} />
      </div>

      <div className="sticky bottom-0 bg-linear-to-br from-purple-50 via-blue-50 to-transparent pt-4 pb-4">
        <div className="max-w-4xl mx-auto px-4">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
export default App;
