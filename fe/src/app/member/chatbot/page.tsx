"use client";

import ChatbotNav from "@/components/chatbot/layout/ChatbotNav";
import ChatbotMessageList from "@/components/chatbot/messages/ChatbotMessageList";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-screen h-screen bg-[#F8F8F8]">
      <ChatbotNav />

      {/* 채팅 영역 */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <ChatbotMessageList /> {/* <- 여기 안에서 ChatbotBottom까지 관리 */}
      </div>
    </div>
  );
}
