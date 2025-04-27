import type { NextPage } from "next";
import Link from "next/link";
import ArrowBackIcon from "@/asset/icons/arrow_back.svg";

const ChatbotNav: NextPage = () => {
  return (
    <div className="w-full relative bg-white h-16 overflow-hidden flex flex-row items-center justify-start py-3 pl-[9px] pr-2.5 box-border text-center text-[24px] text-gray font-pretendard">
      <div className="w-[196px] flex flex-row items-center justify-start gap-[114px]">
        <Link href="/">
          <ArrowBackIcon
            width={40}
            height={40}
            className="text-gray-800 cursor-pointer"
          />
        </Link>

        <div className="w-[42px] h-[29px] font-medium flex items-center justify-center shrink-0">
          챗봇
        </div>
      </div>
    </div>
  );
};

export default ChatbotNav;
