interface ChatBubbleProps {
  type: 'user' | 'bot';
  text: string;
}

const ChatBubble = ({ type, text }: ChatBubbleProps) => {
  const isUser = type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          px-4 py-2 
          rounded-2xl 
          min-w-[40px] max-w-[100%] 
          text-[20px] font-pretendard
          ${isUser ? 'bg-brand-normal text-white' : 'bg-white text-black'}
        `}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
