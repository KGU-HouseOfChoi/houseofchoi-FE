import type { FC } from "react";

interface ChatbotGreetingProps {
  username: string;
}

const ChatbotGreeting: FC<ChatbotGreetingProps> = ({ username }) => {
  return (
    <div className="w-full flex flex-col items-center mb-6">
      <div className="font-medium font-pretendard text-gray text-center leading-tight text-[18px]">
        <p className="m-0 text-[18px] whitespace-pre-wrap">
          {username}님, 안녕하세요
        </p>
        <p className="m-0 text-[18px] whitespace-pre-wrap">
          반가워요, 어르심이에요!!
        </p>
      </div>
    </div>
  );
};

export default ChatbotGreeting;
