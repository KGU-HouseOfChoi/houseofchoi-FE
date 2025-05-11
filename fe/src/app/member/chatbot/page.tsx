"use client";

import ChatbotHeader from "@/components/chatbot/layout/ChatbotHeader";
import ChatbotMessageList from "@/components/chatbot/messages/ChatbotMessageList";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-screen">
      <ChatbotHeader />

      <div className="flex-1 overflow-y-auto min-h-0 bg-bgColor-light">
        <ChatbotMessageList />
      </div>
    </div>
  );
}
