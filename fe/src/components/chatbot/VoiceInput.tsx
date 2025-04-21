"use client";

import { useState } from "react";

import { FiMic } from "react-icons/fi";

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
        <FiMic size={28} color="white" />
      </button>
    </div>
  );
};

export default VoiceInput;
