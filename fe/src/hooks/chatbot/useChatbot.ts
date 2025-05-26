"use client";

import { useState, useRef, useEffect } from "react";
import { groupMessages } from "@/lib/chatbot/groupMessages";
import type { Message, ScheduleConfirmMessage } from "@/types/chatbot";
import { fetchChatAnswer } from "@/apis/chatbot/fetchChatAnswer";
import { useActivityRecommendation } from "./useActivityRecommendation";
import { useSchedule } from "@/hooks/chatbot/useSchedule";

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_GREETING);

  const { fetchRecommendation } = useActivityRecommendation();
  const {
    saveProgramId,
    confirm: confirmSchedule,
    loading: scheduleLoading,
    popupOpen,
    closePopup,
    cancelAndAsk,
    goToCalendar,
  } = useSchedule();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const pushBotText = (content: string) =>
    setMessages((prev) => [
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

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
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

  const handleButtonClick = async (value: "실내" | "실외", label: string) => {
    setMessages((prev) => [
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
      const recMsgs = await fetchRecommendation(value);
      if (recMsgs.length === 0) {
        pushBotText(
          "조건에 맞는 프로그램이 없습니다. 다른 조건을 시도해 보세요!",
        );
        return;
      }

      const last = recMsgs.at(-1);
      if (last?.type === "activity") saveProgramId(last.programId);

      const confirmCard: ScheduleConfirmMessage = {
        id: `${Date.now()}-confirm`,
        sender: "bot",
        type: "schedule-confirm",
        timestamp: new Date().toISOString(),
        isUser: false,
      };

      setMessages((prev) => [...prev, ...recMsgs, confirmCard]);
    } catch {
      pushBotText("추천 정보를 가져오지 못했어요. 다시 시도해 주세요.");
    }
  };

  /* ─────────── 예/아니요 클릭 ─────────── */
  const handleScheduleConfirm = async (value: "yes" | "no") => {
    const replyMsgs = await confirmSchedule(value);
    setMessages((prev) => [...prev, ...replyMsgs]);
  };

  /* ─────────── 팝업 ‘대화하기’ 클릭 ─────────── */
  const handlePopupCancel = () => {
    const reply = cancelAndAsk(); // 안내 메시지 생성
    setMessages((prev) => [...prev, ...reply]); // 대화창에 push
  };

  /* ─────────── 그룹핑 후 반환 ─────────── */
  const groupedMessages = groupMessages(messages);

  return {
    messages,
    groupedMessages,
    handleSend,
    handleButtonClick,
    handleScheduleConfirm,
    handlePopupCancel,
    goToCalendar,
    bottomRef,
    scheduleLoading,
    popupOpen,
    closePopup,
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
      { label: "실내 활동", value: "실내" },
      { label: "실외 활동", value: "실외" },
    ],
  },
];
