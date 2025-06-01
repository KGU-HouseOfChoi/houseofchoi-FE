"use client";

import { useRef, useState } from "react";
import VoiceInput from "@/components/chatbot/VoiceInput";
import SendIcon from "@/asset/icons/send-2.svg";

interface ChatbotBottomProps {
  onSend: (text: string) => void;
  pushBotText: (text: string) => void;
}

const ChatbotBottom: React.FC<ChatbotBottomProps> = ({
  onSend,
  pushBotText,
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
    if (inputRef.current) {
      inputRef.current.style.height = "54px"; 
    }
    inputRef.current?.focus();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center items-end z-50 pb-[env(safe-area-inset-bottom)] sm:pb-0">
      <div className="w-full max-w-[414px] bg-bgColor-default min-h-[100px] flex items-center justify-center py-4 px-4 text-textColor-body font-pretendard shadow transition-all">
        <div className="flex w-full items-end gap-2">
          
          <VoiceInput handleSend={onSend} pushBotText={pushBotText} />

         
          <div className="flex-1 max-w-[320px] rounded-2xl bg-bgColor-default border border-borderColor-default focus-within:border-brand-normal flex items-end justify-between px-3 gap-3 transition">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = target.scrollHeight + "px";
              }}
              placeholder="궁금한 내용을 입력해주세요."
              rows={1}
              className="w-full min-h-[54px] bg-transparent outline-none text-textColor-heading placeholder:text-textColor-sub touch-manipulation cursor-text select-text resize-none overflow-hidden py-[14px] leading-[1.5]"
              style={{
                WebkitTapHighlightColor: "transparent",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "text",
                userSelect: "text",
                WebkitAppearance: "none",
                appearance: "none",
                WebkitOverflowScrolling: "touch",
                touchAction: "manipulation",
                caretColor: "auto",
                height: input ? "auto" : "54px",
                maxHeight: "120px",
              }}
            />
            
            <button onClick={handleSend} className="-translate-y-2" >
              <SendIcon
                width={36}
                height={36}
                className="text-textColor-disabled"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotBottom;
