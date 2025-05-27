import { useState } from "react";
import type { Message } from "@/types/chatbot";

export function useChatbotSchedule() {
  const [popupOpen, setPopupOpen] = useState(false);

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const cancelAndAsk = (): Message[] => {
    setPopupOpen(false);
    return [makeBotText("다른 궁금한 사항이 있다면 질문해주세요!")];
  };

  const makeBotText = (content: string): Message => ({
    id: Date.now().toString(),
    sender: "bot",
    profileUrl: "/images/Chatlogo.svg",
    type: "text",
    content,
    timestamp: new Date().toISOString(),
    isUser: false,
  });

  return {
    popupOpen,
    openPopup,
    closePopup,
    cancelAndAsk,
  };
} 