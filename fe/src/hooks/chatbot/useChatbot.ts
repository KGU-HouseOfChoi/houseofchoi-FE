"use client";

import { useState, useRef, useEffect } from "react";
import { groupMessages } from "@/lib/chatbot/groupMessages";
import { Message } from "@/types/chatbot";
import { fetchChatAnswer } from "@/apis/chatbot/fetchChatAnswer";
import { handleApiError } from "@/utils/common/handleApiError";
import { useActivityRecommendation } from "./useActivityRecommendation";

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      sender: "bot",
      profileUrl: "/images/Chatlogo.svg",
      type: "text",
      content: "어떤 활동을 찾고 계신가요?",
      timestamp: new Date().toISOString(),
      isUser: false,
    },
    {
      id: "greeting-1",
      sender: "bot",
      profileUrl: "/images/Chatlogo.svg",
      type: "text",
      content: "직접 입력하거나 버튼을 눌러 추천받아 보세요!",
      timestamp: new Date().toISOString(),
      isUser: false,
    },
    {
      id: "init-button",
      sender: "bot",
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
  const { fetchRecommendation } = useActivityRecommendation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ 1️⃣ 메시지 전송 처리
  const handleSend = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      profileUrl: "",
      type: "text",
      content: text,
      timestamp: new Date().toISOString(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const answer = await fetchChatAnswer(text);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        profileUrl: "/images/Chatlogo.svg",
        type: "text",
        content: answer,
        timestamp: new Date().toISOString(),
        isUser: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("메시지 전송 중 오류 발생:", error);
      throw error;
    }
  };

  // ✅ 2️⃣ 버튼 클릭 시 추천 프로그램 로딩
  const handleButtonClick = async (value: string, label: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      profileUrl: "",
      type: "text",
      content: label,
      timestamp: new Date().toISOString(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const recommendationMessages = await fetchRecommendation(value as "indoor" | "outdoor");

      if (recommendationMessages.length > 0) {
        setMessages((prev) => [...prev, ...recommendationMessages]);
      }
    } catch (error) {
      console.error("추천 프로그램 로딩 중 오류 발생:", error);
      throw error;
    }
  };

  // ✅ 3️⃣ 일정 확인 버튼 처리
  const handleScheduleConfirm = (value: string) => {
    const content =
      value === "yes"
        ? "일정이 등록되었습니다!"
        : "다른 궁금한 사항이 있다면 질문해주세요!";

    const message: Message = {
      id: Date.now().toString(),
      sender: "bot",
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
