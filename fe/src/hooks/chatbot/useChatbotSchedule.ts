import { useState, useEffect } from "react";
import type { Message } from "@/types/chatbot";

export function useChatbotSchedule() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | undefined>();

  const openPopup = (day?: string) => {
    console.log("[useChatbotSchedule] openPopup called with day:", day);
    setSelectedDay(day);
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
    setSelectedDay(undefined);
  };

  const cancelAndAsk = (): Message[] => {
    setPopupOpen(false);
    setSelectedDay(undefined);
    return [makeBotText("다른 궁금한 사항이 있다면 질문해주세요!")];
  };

  const makeBotText = (content: string): Message => ({
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    sender: "bot",
    profileUrl: "/images/Chatlogo.svg",
    type: "text",
    content,
    timestamp: new Date().toISOString(),
    isUser: false,
  });

  useEffect(() => {
    console.log(
      "[useChatbotSchedule] popupOpen:",
      popupOpen,
      "selectedDay:",
      selectedDay,
    );
  }, [popupOpen, selectedDay]);

  return {
    popupOpen,
    openPopup,
    closePopup,
    cancelAndAsk,
    selectedDay,
    setSelectedDay,
  };
}
