"use client";

import { useState } from "react";
import MicrophoneIcon from "@/asset/icons/microphone-2.svg";

const VoiceInput = () => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    setIsListening((prev) => !prev);
    // TODO: 실제 음성 인식 API 연동 필요
   // 음성 인식 시작/중지 처리 및 결과 텍스트를 처리하는 로직 구현 필요
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
