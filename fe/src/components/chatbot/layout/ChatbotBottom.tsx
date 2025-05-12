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
    <div className="w-full bg-bgColor-default h-[85px] flex items-center justify-center py-4 px-3 gap-2 text-textColor-body font-pretendard">
      <VoiceInput handleSend={onSend} />

      <div className="w-[294px] h-[54px] rounded-2xl bg-bgColor-default border border-borderColor-default focus-within:border-brand-normal flex items-center justify-between px-3 gap-3 transition">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="궁금한 내용을 입력해주세요."
          className="w-full bg-transparent outline-none text-textColor-body placeholder:text-textColor-sub"
        />
        <button onClick={handleSend}>
          <SendIcon
            width={36}
            height={36}
            className="text-textColor.disabled"
          />
        </button>
      </div>
    </div>
  );
};

export default ChatbotBottom;
