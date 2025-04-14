import type { FC } from 'react';

interface ChatbotGreetingProps {
  username: string;
}

const ChatbotGreeting: FC<ChatbotGreetingProps> = ({ username }) => {
  return (
    <div className="w-fit font-medium font-pretendard text-gray text-center leading-tight text-[18px] self-center">
      <p className="m-0 text-[19px] whitespace-pre-wrap">{username}님, 안녕하세요</p>
      <p className="m-0 text-[19px] whitespace-pre-wrap">반가워요, 노락노락이에요!!</p>
    </div>
  );
};

export default ChatbotGreeting;
