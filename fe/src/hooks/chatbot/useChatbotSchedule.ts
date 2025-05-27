import { useState } from "react";

export function useChatbotSchedule() {
  const [popupOpen, setPopupOpen] = useState(false);

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  return {
    popupOpen,
    openPopup,
    closePopup,
  };
} 