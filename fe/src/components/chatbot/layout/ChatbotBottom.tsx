"use client";

import { useRef, useState } from "react";
import VoiceInput from "@/components/chatbot/VoiceInput";
import SendIcon from "@/asset/icons/send-2.svg";

interface ChatbotBottomProps {
  onSend: (text: string) => void;
}

const ChatbotBottom: React.FC<ChatbotBottomProps> = ({ onSend }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full bg-white h-[85px] flex items-center justify-center py-[15px] px-[9px] gap-[9px] text-[19px] text-gray font-pretendard">
      <VoiceInput handleSend={onSend} />

      <div className="w-[294px] h-[54px] rounded-2xl bg-whitesmoke border border-gainsboro focus-within:border-brand-normal flex items-center justify-between py-[7px] px-3 gap-3.5 box-border transition">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="궁금한 내용을 입력해주세요."
          className="w-full bg-transparent outline-none text-[16px] placeholder-gray-400"
        />
        <button onClick={handleSend}>
          <SendIcon width={36} height={36} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotBottom;
