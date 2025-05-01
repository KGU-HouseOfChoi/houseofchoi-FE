"use client";

import { useState, useRef, useEffect } from "react";
import { groupMessages } from "@/lib/groupMessages";
import { Message } from "@/types/chatbot";
import { fetchChatRecommendation } from "@/lib/api/chatRecommend";

export function useChatbot(username: string) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      sender: "",
      profileUrl: "/images/Chatlogo.svg",
      type: "text",
      content: "어떤 활동을 찾고 계신가요?",
      timestamp: new Date().toISOString(),
      isUser: false,
    },
    {
      id: "greeting-1",
      sender: "",
      profileUrl: "/images/Chatlogo.svg",
      type: "text",
      content: "직접 입력하거나 버튼을 눌러 추천받아 보세요!",
      timestamp: new Date().toISOString(),
      isUser: false,
    },
    {
      id: "init-button",
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "",
      profileUrl: "",
      type: "text",
      content: text,
      timestamp: new Date().toISOString(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    // 여기에 GPT 채팅 API 호출
  };

  const handleButtonClick = async (value: string, label: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "",
      profileUrl: "",
      type: "text",
      content: label,
      timestamp: new Date().toISOString(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    const program = await fetchChatRecommendation({
      requestType: "activity",
      category: value as "indoor" | "outdoor",
    });
    
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
        type: "schedule-confirm",
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

  const handleScheduleConfirm = (value: string) => {
    const content =
      value === "yes"
        ? "일정이 등록되었습니다!"
        : "다른 궁금한 사항이 있다면 질문해주세요!";

    const message: Message = {
      id: Date.now().toString(),
      sender: "",
      profileUrl: "/images/Chatlogo.svg",
      type: "text",
      content,
      timestamp: new Date().toISOString(),
      isUser: false,
    };

    setMessages((prev) => [...prev, message]);
  };

  const groupedMessages = groupMessages(messages);

  return {
    messages,
    groupedMessages,
    handleSend,
    handleButtonClick,
    handleScheduleConfirm,
    bottomRef,
  };
}
