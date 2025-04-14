'use client';

import ChatbotNav from "@/components/chatbot/ChatbotNav";
import ChatbotBottom from "@/components/chatbot/ChatbotBottom";
import ChatbotMessageList from "@/components/chatbot/ChatbotMessageList";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 상단 네비게이션 */}
      <ChatbotNav />

      {/* 채팅 메시지 및 콘텐츠 영역 */}
      <main className="flex-1 p-4 overflow-auto">
        <ChatbotMessageList />
      </main>

      {/* 하단 입력창 */}
      <ChatbotBottom />
    </div>
  );
}
