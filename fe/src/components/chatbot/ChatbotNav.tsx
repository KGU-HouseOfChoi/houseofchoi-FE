import type { NextPage } from "next";
import { FiArrowLeft } from "react-icons/fi"; // ← 아이콘 import

const ChatbotNav: NextPage = () => {
  return (
    <div className="w-full relative bg-white h-16 overflow-hidden flex flex-row items-center justify-start py-3 pl-[9px] pr-2.5 box-border text-center text-[24px] text-gray font-pretendard">
      <div className="w-[196px] flex flex-row items-center justify-start gap-[114px]">
        <FiArrowLeft size={40} className="text-gray-800" /> {/* ← 아이콘 대체 */}
        <div className="w-[42px] h-[29px] font-medium flex items-center justify-center shrink-0">
          챗봇
        </div>
      </div>
    </div>
  );
};

export default ChatbotNav;
