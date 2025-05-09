"use client";

import { useState } from "react";
import MicrophoneIcon from "@/asset/icons/microphone-2.svg";
import VoicePopup from "@/components/chatbot/popup/VoicePopup";

interface VoiceInputProps {
  handleSend: (text: string) => void;
}

const VoiceInput = ({ handleSend }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    setIsListening(true);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleVoiceClick}
        className="w-[54px] h-[54px] rounded-[23px] bg-brand-normal flex items-center justify-center p-2"
      >
        <MicrophoneIcon width={37} height={38} />
      </button>

      {/* ✅ props로 받은 handleSend 전달 */}
      <VoicePopup
        isOpen={isListening}
        onClose={() => setIsListening(false)}
        handleSend={handleSend}
      />
    </div>
  );
};

export default VoiceInput;
