"use client";

import { useState, useRef, useEffect } from "react";
import { groupMessages } from "@/lib/chatbot/groupMessages";
import { Message, ScheduleConfirmMessage, } from "@/types/chatbot"; 
import { fetchChatAnswer } from "@/apis/chatbot/fetchChatAnswer";
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

  /* ───────────────────────── 스크롤 관리 ───────────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ───────────────────────── 일반 채팅 전송 ───────────────────────── */
  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      profileUrl: "",
      type: "text",
      content: text,
      timestamp: new Date().toISOString(),
      isUser: true,
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const answer = await fetchChatAnswer(text);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        profileUrl: "/images/Chatlogo.svg",
        type: "text",
        content: answer,
        timestamp: new Date().toISOString(),
        isUser: false,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      console.error("메시지 전송 오류:", e);
      throw e;
    }
  };

  /* ───────────────────────── 추천 버튼 클릭 ───────────────────────── */
  const handleButtonClick = async (value: string, label: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      profileUrl: "",
      type: "text",
      content: label,
      timestamp: new Date().toISOString(),
      isUser: true,
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const recMsgs = await fetchRecommendation(value as "indoor" | "outdoor");

      /* 일정 확인 카드 메시지 */
      const scheduleConfirm: ScheduleConfirmMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        type: "schedule-confirm",
        timestamp: new Date().toISOString(),
        isUser: false,
      };

      setMessages((prev) => [...prev, ...recMsgs, scheduleConfirm]);
    } catch (e) {
      console.error("추천 로딩 오류:", e);
      throw e;
    }
  };

  /* ───────────────────────── 일정 확인 응답 ───────────────────────── */
  const handleScheduleConfirm = (value: "yes" | "no") => {
    const content =
      value === "yes"
        ? "일정이 등록되었습니다!"
        : "다른 궁금한 사항이 있다면 질문해주세요!";

    const msg: Message = {
      id: Date.now().toString(),
      sender: "bot",
      profileUrl: "/images/Chatlogo.svg",
      type: "text",
      content,
      timestamp: new Date().toISOString(),
      isUser: false,
    };
    setMessages((prev) => [...prev, msg]);
  };

  /* ───────────────────────── 그룹핑 후 반환 ───────────────────────── */
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
