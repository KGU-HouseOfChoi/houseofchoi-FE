'use client';

import ChatbotNav from "@/components/chatbot/ChatbotNav";
import ChatbotBottom from "@/components/chatbot/ChatbotBottom";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 상단 네비게이션 */}
      <ChatbotNav />

      {/* 채팅 메시지 및 콘텐츠 영역 */}
      <main className="flex-1 p-4 overflow-auto">
        <p>챗봇 콘텐츠 영역입니다</p>
        {/* 여기에 메시지 컴포넌트들 나열하면 됨 */}
      </main>

      {/* 하단 입력창 */}
      <ChatbotBottom />
    </div>
  );
}
