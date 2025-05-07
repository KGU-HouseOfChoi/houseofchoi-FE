"use client";

import type { NextPage } from "next";
import BackButton from "@/components/common/BackButton";

const ChatbotNav: NextPage = () => {
  return (
    <div className="w-full relative bg-white h-14 md:h-16 flex items-center px-2 md:px-4 text-gray font-pretendard">
      <BackButton href="/member/" className="mr-1" />

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-[21px] md:text-2xl">
        어르심
      </div>
    </div>
  );
};

export default ChatbotNav;
