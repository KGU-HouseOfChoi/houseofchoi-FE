import type { FC } from 'react';

interface ChatBubbleProps {
  type: 'user' | 'bot';
  text: string;
}

const ChatBubble: FC<ChatBubbleProps> = ({ type, text }) => {
  const isUser = type === 'user';

  return (
    <div
      className={`px-5 py-2.5 rounded-2xl w-fit max-w-[80%] text-[16px] font-pretendard ${
        isUser
          ? 'bg-brand-normal text-white self-end'
          : 'bg-white text-black self-start'
      }`}
    >
      {text}
    </div>
  );
};

export default ChatBubble;
