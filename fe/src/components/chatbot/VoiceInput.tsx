"use client";

import { useState } from "react";
import MicrophoneIcon from "@/asset/icons/microphone-2.svg";

const VoiceInput = () => {
  const [, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    setIsListening((prev) => !prev);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleVoiceClick}
        className="w-[54px] h-[54px] rounded-[23px] bg-brand-normal flex items-center justify-center p-2"
      >
        <MicrophoneIcon width={37} height={38} />
      </button>
    </div>
  );
};

export default VoiceInput;
