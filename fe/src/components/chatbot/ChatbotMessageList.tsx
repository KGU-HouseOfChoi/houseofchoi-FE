import ChatbotGreeting from '@/components/chatbot/ChatbotGreeting';
import ChatBubble from '@/components/chatbot/ChatBubble';

const ChatbotMessageList = () => {
  return (
    <div className="flex flex-col gap-3">
      <ChatbotGreeting username="최서희" /> {/* ← 하드코딩된 이름 */}   
      <ChatBubble type="bot" text="어떤 활동을 찾고 계신가요?" />
      <ChatBubble type="bot" text="직접 입력하거나 버튼을 눌러 추천받아 보세요!" />
    </div>
  );
};

export default ChatbotMessageList;
