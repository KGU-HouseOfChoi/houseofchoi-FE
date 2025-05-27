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

  const handleTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.click();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center items-end z-50 pb-[env(safe-area-inset-bottom)] sm:pb-0">
      <div className="w-full max-w-[414px] bg-bgColor-default h-[100px] flex items-center justify-center py-6 px-4 gap-2 text-textColor-body font-pretendard shadow">
        <VoiceInput handleSend={onSend} />
        <div className="flex-1 max-w-[320px] h-[54px] rounded-2xl bg-bgColor-default border border-borderColor-default focus-within:border-brand-normal flex items-center justify-between px-3 gap-3 transition">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            onTouchStart={handleTouchStart}
            placeholder="궁금한 내용을 입력해주세요."
            className="w-full bg-transparent outline-none text-textColor-heading placeholder:text-textColor-sub touch-manipulation cursor-text select-text"
            style={{
              WebkitTapHighlightColor: "transparent",
              WebkitTouchCallout: "none",
              WebkitUserSelect: "text",
              userSelect: "text",
              WebkitAppearance: "none",
              appearance: "none",
              WebkitOverflowScrolling: "touch",
              touchAction: "manipulation",
            }}
          />
          <button onClick={handleSend}>
            <SendIcon
              width={36}
              height={36}
              className="text-textColor-disabled"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotBottom;
