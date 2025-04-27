import { useState } from "react";
import MessageGroup from "@/components/chatbot/MessageGroup";
import ChatbotBottom from "@/components/chatbot/ChatbotBottom";
import { groupMessages } from "@/lib/groupMessages";
import { Message } from "@/types/message";

const ChatbotMessageList = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "노락노락",
      profileUrl: "/images/Chatlogo.svg",
      type: "activity",
      content: "최서희님께 추천하는 활동이에요!",
      timestamp: new Date().toISOString(),
      isUser: false,
    },
  ]);

  const handleSend = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "나",
      profileUrl: "",
      type: "text",
      content: text,
      timestamp: new Date().toISOString(),
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const grouped = groupMessages(messages);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {grouped.map((group, idx) => (
          <MessageGroup key={idx} {...group} />
        ))}
      </div>

      
      <ChatbotBottom onSend={handleSend} />
    </div>
  );
};

export default ChatbotMessageList;
