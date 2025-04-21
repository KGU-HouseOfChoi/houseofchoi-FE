import type { NextPage } from "next";

const ChatbotNav: NextPage = () => {
  return (
    <div className="w-full h-16 bg-white flex items-center justify-between px-4 shadow-sm">
      {/* 왼쪽 뒤로가기 텍스트 or 아이콘 대체 */}
      <button className="text-xl text-gray-800">{"←"}</button>

      <div className="text-xl font-semibold text-gray-900">챗봇</div>

      <div className="w-6" />
    </div>
  );
};

export default ChatbotNav;
