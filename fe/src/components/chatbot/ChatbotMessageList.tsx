'use client';

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

   // 사용자가 직접 입력해서 전송
   const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: '',
      profileUrl: '',
      type: 'text',
      content: text,
      timestamp: new Date().toISOString(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
  };

   // 버튼 클릭했을 때 흐름
   const handleButtonClick = async (value: string, label: string) => {
    // 1. 내가 버튼 누른 거 채팅창에 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: '',
      profileUrl: '',
      type: 'text',
      content: label,
      timestamp: new Date().toISOString(),
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);

    // 2. 추천 프로그램 가져오기 (가짜 API 호출)
    const program = await fakeRecommendAPI(value);

   // 3. 프로그램 이름 추가
   const programNameMessage: Message = {
     id: (Date.now() + 1).toString(),
     sender: '',
     profileUrl: '/images/Chatlogo.svg',
     type: 'text',
     content: `🏷️ 추천 프로그램: ${program.name}`,
     timestamp: new Date().toISOString(),
     isUser: false,
   };

       // 4. 프로그램 상세정보 추가
       const programDetailMessage: Message = {
        id: (Date.now() + 2).toString(),
        sender: '',
        profileUrl: '/images/Chatlogo.svg',
        type: 'text',
        content: `날짜: ${program.date}\n가격: ${program.price}원\n장소: ${program.place}`,
        timestamp: new Date().toISOString(),
        isUser: false,
      };
  
      setMessages((prev) => [...prev, programNameMessage, programDetailMessage]);
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
// 가짜 추천 프로그램 API
async function fakeRecommendAPI(type: string) {
  return new Promise<{ name: string; date: string; price: number; place: string }>((resolve) => {
    setTimeout(() => {
      if (type === 'indoor') {
        resolve({ name: '요가 교실', date: '3월 20일', price: 0, place: '서울 복지관' });
      } else {
        resolve({ name: '산책 모임', date: '3월 22일', price: 0, place: '한강공원' });
      }
    }, 500);
  });
}


export default ChatbotMessageList;
