"use client";

import { useChatbot } from "@/hooks/useChatbot";
import ChatbotGreeting from "@/components/chatbot/ChatbotGreeting";
import ChatbotBottom from "@/components/chatbot/ChatbotBottom";
import MessageGroup from "@/components/chatbot/MessageGroup";

const ChatbotMessageList = () => {
  const {
    groupedMessages,
    handleSend,
    handleButtonClick,
    handleScheduleConfirm,
    bottomRef,
  } = useChatbot("최서희");

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <ChatbotGreeting username="최서희" />
        {groupedMessages.map((group, idx) => (
          <MessageGroup
            key={idx}
            {...group}
            onButtonClick={(value,label) => {
              if (value === "yes" || value === "no") {
                handleScheduleConfirm(value);
              } else {
                handleButtonClick(value, label); 
              }
            }}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatbotBottom onSend={handleSend} />
    </div>
  );
};

export default ChatbotMessageList;
