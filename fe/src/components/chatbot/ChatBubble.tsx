import type { FC } from "react";
import Image from "next/image";

interface ChatBubbleProps {
  type: "user" | "bot";
  text: string;
}

const ChatBubble: FC<ChatBubbleProps> = ({ type, text }) => {
  const isUser = type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mr-2">
          <Image
            src="/images/Chatlogo.svg"
            width={36}
            height={36}
            alt="Chatbot Icon"
            className="rounded-full"
          />
        </div>
      )}

      <div
        className={`px-4 py-2 rounded-2xl w-fit max-w-[80%] text-[16px] font-pretendard ${
          isUser
            ? "bg-brand-normal text-white self-end"
            : "bg-white text-black self-start"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
