"use client";

import { useEffect, useRef, useState } from "react";
import ChatbotGreeting from "@/components/chatbot/ChatbotGreeting";
import ChatbotBottom from "@/components/chatbot/ChatbotBottom";
import MessageGroup from "@/components/chatbot/MessageGroup";
import { groupMessages } from "@/lib/groupMessages";
import { Message } from "@/types/chatbot";
import { CHATBOT_MESSAGES } from "@/constants/chatbot/messages";
import { fetchChatRecommendation } from "@/lib/api/chatRecommend"; 

const ChatbotMessageList = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      profileUrl: "/images/Chatlogo.svg",
      sender: "",
      type: "text",
      content: CHATBOT_MESSAGES.GREETING,
      timestamp: new Date().toISOString(),
      isUser: false,
    },
    {
      id: "init-2",
      profileUrl: "/images/Chatlogo.svg",
      sender: "",
      type: "text",
      content: CHATBOT_MESSAGES.FOLLOWUP,
      timestamp: new Date().toISOString(),
      isUser: false,
    },
    {
      id: "init-3",
      profileUrl: "/images/Chatlogo.svg",
      sender: "",
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      timestamp: new Date().toISOString(),
      type: "text",
      profileUrl: "",
      isUser: true,
      sender: "",
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const handleButtonClick = async (value: string, label: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      type: "text",
      content: label,
      timestamp: new Date().toISOString(),
      isUser: true,
      profileUrl: "",
      sender: "",
    };

    setMessages((prev) => [...prev, userMsg]);

    //추천연결
    const program = await fetchChatRecommendation({type: value}); 

    const responseMsgs: Message[] = [
      {
        id: (Date.now() + 1).toString(),
        content: `🏷️ 추천 프로그램: ${program.name}`,
        type: "text",
        timestamp: new Date().toISOString(),
        isUser: false,
        profileUrl: "/images/Chatlogo.svg",
        sender: "",
      },
      {
        id: (Date.now() + 2).toString(),
        content: `날짜: ${program.date}\n가격: ${program.price}원\n장소: ${program.place}`,
        type: "text",
        timestamp: new Date().toISOString(),
        isUser: false,
        profileUrl: "/images/Chatlogo.svg",
        sender: "",
      },
      {
        id: (Date.now() + 3).toString(),
        type: "button",
        content: "",
        timestamp: new Date().toISOString(),
        isUser: false,
        profileUrl: "/images/Chatlogo.svg",
        sender: "",
        buttons: [
          { label: "예", value: "yes" },
          { label: "아니요", value: "no" },
        ],
      },
    ];

    setMessages((prev) => [...prev, ...responseMsgs]);
  };

  const grouped = groupMessages(messages);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <ChatbotGreeting username="최서희" />
        {grouped.map((group, idx) => (
          <MessageGroup key={idx} {...group} onButtonClick={handleButtonClick} />
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatbotBottom onSend={handleSend} />
    </div>
  );
};

export default ChatbotMessageList;
