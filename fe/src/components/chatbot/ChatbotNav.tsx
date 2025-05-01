import type { NextPage } from "next";
import Link from "next/link";
import ArrowBackIcon from "@/asset/icons/arrow_back.svg";

const ChatbotNav: NextPage = () => {
  return (
    <div className="w-full relative bg-white h-14 md:h-16 flex items-center px-4 md:px-6 text-gray font-pretendard">
      {/* ← 뒤로가기 버튼 */}
      <Link href="/">
        <ArrowBackIcon
          width={40}
          height={40}
          className="text-gray-800 cursor-pointer"
          aria-label="뒤로 가기"
        />
      </Link>

      {/* 챗봇 제목 - 가운데 정렬 */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-xl md:text-2xl">
       어르심
      </div>
    </div>
  );
};

export default ChatbotNav;
