"use client";

import ChatbotNav from "@/components/chatbot/layout/ChatbotHeader";
import ChatbotMessageList from "@/components/chatbot/messages/ChatbotMessageList";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-screen h-screen bg-[#F8F8F8]">
      <ChatbotNav />

      <div className="flex-1 overflow-y-auto min-h-0">
        <ChatbotMessageList />
      </div>
    </div>
  );
}
