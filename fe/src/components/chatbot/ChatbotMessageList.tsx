import { useEffect, useRef, useState } from "react";
import MessageGroup from "@/components/chatbot/MessageGroup";
import ChatbotBottom from "@/components/chatbot/ChatbotBottom";
import ChatbotGreeting from "@/components/chatbot/ChatbotGreeting";
import { groupMessages } from "@/lib/groupMessages";
import { Message } from "@/types/message";

const ChatbotMessageList = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "노락노락",
      profileUrl: "/images/Chatlogo.svg",
      type: "activity",
      content: "어떤활동을 찾고 계신가요?",
      timestamp: new Date().toISOString(),
      isUser: false,
    },

    {
      id: "init-2",
      sender: "노락노락",
      profileUrl: "/images/Chatlogo.svg",
      type: "text", 
      content: "직접 입력하거나 버튼을 눌러 추천받아 보세요!",
      timestamp: new Date().toISOString(),
      isUser: false,
    },

    {
      id: "init-3",
      sender: "",
      profileUrl: "/images/Chatlogo.svg",
      type: "button",  
      content: "",
      timestamp: new Date().toISOString(),
      isUser: false,
      buttons: [
        { label: "실내 활동", value: "indoor" },
        { label: "실외 활동", value: "outdoor" },
      ],
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); 


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

        <ChatbotGreeting username="최서희" />

        {grouped.map((group, idx) => (
          <MessageGroup key={idx} {...group} />
        ))}
      <div ref={bottomRef} />
    </div>

      
      <ChatbotBottom onSend={handleSend} />
    </div>
  );
};

export default ChatbotMessageList;
