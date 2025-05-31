"use client";

import { useState, useRef, useEffect } from "react";
import { groupMessages } from "@/lib/chatbot/groupMessages";
import type { Message, ScheduleConfirmMessage } from "@/types/chatbot";
import { fetchChatAnswer } from "@/apis/chatbot/fetchChatAnswer";
import { useActivityRecommendation } from "./useActivityRecommendation";
import { useSchedule } from "@/hooks/chatbot/useSchedule";
import { useChatbotSchedule } from "@/hooks/chatbot/useChatbotSchedule";
import { CONFIRM_KEYWORDS } from "@/constants/chatbot/messages";

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_GREETING);
  const [pendingProgramId, setPendingProgramId] = useState<number | null>(null);

  const { fetchRecommendation } = useActivityRecommendation();
  const {
    saveProgramId,
    confirm,
    loading: scheduleLoading,
    goToCalendar,
  } = useSchedule();

  const {
    popupOpen,
    openPopup: openChatbotPopup,
    closePopup,
    cancelAndAsk,
    selectedDay,
    setSelectedDay,
  } = useChatbotSchedule();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (
      lastMsg &&
      lastMsg.sender === "bot" &&
      lastMsg.type === "text" &&
      "content" in lastMsg &&
      typeof lastMsg.content === "string" &&
      CONFIRM_KEYWORDS.CALENDAR_KEYWORDS.some((keyword) =>
        lastMsg.content.includes(keyword),
      ) &&
      !popupOpen
    ) {
      openChatbotPopup(selectedDay);
    }
  }, [messages, openChatbotPopup, selectedDay, popupOpen]);

  function splitBySentences(text: string, groupSize = 2): string[] {
    const sentences =
      text
        .match(/[^.!?\n]+[.!?\n]?/g)
        ?.map((s) => s.trim())
        .filter(Boolean) || [];
    const grouped: string[] = [];
    for (let i = 0; i < sentences.length; i += groupSize) {
      grouped.push(sentences.slice(i, i + groupSize).join(" "));
    }
    return grouped;
  }

  const pushBotText = (content: string) =>
    setMessages((prev) => [
      ...prev,
      ...splitBySentences(content, 2).map(
        (bubble) =>
          ({
            id: Date.now().toString() + Math.random(),
            sender: "bot",
            profileUrl: "/images/Chatlogo.svg",
            type: "text",
            content: bubble,
            timestamp: new Date().toISOString(),
            isUser: false,
          }) as Message,
      ),
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

      const day = extractDayFromText(answer);
      if (typeof setSelectedDay === "function" && day) setSelectedDay(day);
      setPendingProgramId(null);

      if (
        CONFIRM_KEYWORDS.SCHEDULE_KEYWORDS.some((keyword) =>
          answer.includes(keyword),
        )
      ) {
        const confirmCard: ScheduleConfirmMessage = {
          id: `${Date.now()}-confirm`,
          sender: "bot",
          type: "schedule-confirm",
          timestamp: new Date().toISOString(),
          isUser: false,
        };
        setMessages((prev) => [...prev, confirmCard]);
      }
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
      if (last?.type === "activity") {
        saveProgramId(last.programId);
        setPendingProgramId(last.programId);
        const day = extractDayFromText(last.content);
        if (typeof setSelectedDay === "function" && day) setSelectedDay(day);
      } else {
        setPendingProgramId(null);
      }

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

  function extractDayFromText(text: string): string | undefined {
    const weeklyMatch = text.match(/매주\s+([월화수목금토일])요일/);
    if (weeklyMatch) return weeklyMatch[1];

    const scheduleMatch = text.match(/일정:\s*매주\s+([월화수목금토일]+)/);
    if (scheduleMatch) {
      const days = scheduleMatch[1].split(/[·,\s]/);
      return days[0];
    }

    const dayMatch = text.match(/([월화수목금토일])요일/);
    return dayMatch ? dayMatch[1] : undefined;
  }

  const handleScheduleConfirm = async (value: "yes" | "no") => {
    if (value === "yes") {
      if (pendingProgramId) {
        const result = await confirm("yes");
        if (result.length === 0) {
          openChatbotPopup(selectedDay ?? undefined);
        } else {
          setMessages((prev) => [...prev, ...result]);
        }
      } else {
        handleSend("예");
        openChatbotPopup(selectedDay ?? undefined);
      }
    } else {
      closePopup();
      pushBotText("다른 궁금한 사항이 있다면 질문해주세요!");
    }
  };

  const handlePopupCancel = () => {
    if (typeof setSelectedDay === "function") setSelectedDay(undefined);
    const reply = cancelAndAsk();
    setMessages((prev) => [...prev, ...reply]);
  };

  const groupedMessages = groupMessages(messages);

  return {
    messages,
    groupedMessages,
    handleSend,
    handleButtonClick,
    handleScheduleConfirm,
    handlePopupCancel,
    goToCalendar: () => {
      goToCalendar(selectedDay ?? undefined);
    },
    bottomRef,
    scheduleLoading,
    popupOpen,
    closePopup,
    pushBotText,
    pendingProgramId,
    selectedDay: selectedDay ? `${selectedDay}요일` : undefined,
  };
}

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
