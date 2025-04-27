interface ChatBubbleProps {
  type: 'user' | 'bot';
  text: string;
}

const ChatBubble = ({ type, text }: ChatBubbleProps) => {
  const isUser = type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-4 py-2 rounded-2xl max-w-[80%] w-fit text-[16px] font-pretendard ${
        isUser
          ? 'bg-brand-normal text-white self-end'
          : 'bg-white text-black self-start'
      }`}>
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
