'use client';

import { useState } from 'react';
import Image from 'next/image';

const VoiceInput = () => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    setIsListening(prev => !prev);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleVoiceClick}
        className="w-[54px] h-[54px] rounded-[23px] bg-brand-normal flex items-center justify-center p-2"
      >
        <Image
          src="/vuesax/bold/microphone-2.svg"
          width={37}
          height={38}
          alt="음성 입력"
        />
      </button>
    </div>
  );
};

export default VoiceInput;
