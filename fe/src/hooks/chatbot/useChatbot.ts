"use client";

import { useState, useRef, useEffect } from "react";
import { groupMessages } from "@/lib/chatbot/groupMessages";
import type { Message, ScheduleConfirmMessage } from "@/types/chatbot";
import { fetchChatAnswer } from "@/apis/chatbot/fetchChatAnswer";
import { useActivityRecommendation } from "./useActivityRecommendation";
import { useSchedule } from "@/hooks/chatbot/useSchedule"; // 일정·팝업 전담

export function useChatbot() {
  /* ─────────── 초기 메시지 ─────────── */
  const [messages, setMessages] = useState<Message[]>(INITIAL_GREETING);

  /* ─────────── 의존 훅 ─────────── */
  const { fetchRecommendation } = useActivityRecommendation();
  const {
    saveProgramId,
    confirm: confirmSchedule,
    loading: scheduleLoading,
    popupOpen,          // ✅ 팝업 열림 상태
    closePopup,         // ✅ 팝업 닫기 (+ /calendar 이동)
  } = useSchedule();

  const bottomRef = useRef<HTMLDivElement>(null);

  /* ─────────── 스크롤 유지 ─────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ─────────── 유틸: 봇 텍스트 push ─────────── */
  const pushBotText = (content: string) =>
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "bot",
        profileUrl: "/images/Chatlogo.svg",
        type: "text",
        content,
        timestamp: new Date().toISOString(),
        isUser: false,
      },
    ]);

  /* ─────────── 일반 채팅 전송 ─────────── */
  const handleSend = async (text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "user",
        type: "text",
        content: text,
        timestamp: new Date().toISOString(),
        isUser: true,
      },
    ]);

    try {
      const answer = await fetchChatAnswer(text);
      pushBotText(answer);
    } catch {
      pushBotText("답변을 가져오지 못했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  /* ─────────── 추천 버튼 클릭 ─────────── */
  const handleButtonClick = async (value: string, label: string) => {
    // 1) 사용자 선택 메시지
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "user",
        type: "text",
        content: label,
        timestamp: new Date().toISOString(),
        isUser: true,
      },
    ]);

    try {
      // 2) 추천 메시지
      const recMsgs = await fetchRecommendation(value as "indoor" | "outdoor");

      // 3) 마지막 activity 메시지의 programId 저장
      const last = recMsgs.at(-1);
      if (last?.type === "activity") saveProgramId(last.programId);

      // 4) 일정 확인 카드
      const confirmCard: ScheduleConfirmMessage = {
        id: `${Date.now()}-confirm`,
        sender: "bot",
        type: "schedule-confirm",
        timestamp: new Date().toISOString(),
        isUser: false,
      };

      setMessages(prev => [...prev, ...recMsgs, confirmCard]);
    } catch {
      pushBotText("추천 정보를 가져오지 못했어요. 다시 시도해 주세요.");
    }
  };

  /* ─────────── 예/아니요 클릭 ─────────── */
  const handleScheduleConfirm = async (value: "yes" | "no") => {
  const replyMsgs = await confirmSchedule(value);   
  setMessages(prev => [...prev, ...replyMsgs]);     
};

  /* ─────────── 그룹핑 후 반환 ─────────── */
  const groupedMessages = groupMessages(messages);

  return {
    messages,
    groupedMessages,
    handleSend,
    handleButtonClick,
    handleScheduleConfirm,
    bottomRef,
    scheduleLoading,   // "예" 버튼 disabled
    popupOpen,         // 팝업 열기 상태
    closePopup,        // 팝업 닫기 핸들러
  };
}

/* ─────────── 인트로 메시지 상수 ─────────── */
const INITIAL_GREETING: Message[] = [
  {
    id: "greet-1",
    sender: "bot",
    profileUrl: "/images/Chatlogo.svg",
    type: "text",
    content: "어떤 활동을 찾고 계신가요?",
    timestamp: new Date().toISOString(),
    isUser: false,
  },
  {
    id: "greet-2",
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
];
