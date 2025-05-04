"use client";

import { useState } from "react";
import MicrophoneIcon from "@/asset/icons/microphone-2.svg";
import VoicePopup from "@/components/chatbot/VoicePopup"; // STT 팝업 컴포넌트

const VoiceInput = () => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    setIsListening(true); // 팝업 열기
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleVoiceClick}
        className="w-[54px] h-[54px] rounded-[23px] bg-brand-normal flex items-center justify-center p-2"
      >
        <MicrophoneIcon width={37} height={38} />
      </button>

      {isListening && (
        <VoicePopup onClose={() => setIsListening(false)} />
      )}
    </div>
  );
};

export default VoiceInput;
