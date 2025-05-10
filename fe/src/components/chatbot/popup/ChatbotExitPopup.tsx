"use client";

import type { NextPage } from "next";

interface ChatbotExitPopupProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ChatbotExitPopup: NextPage<ChatbotExitPopupProps> = ({
  isOpen,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="w-[95vw] max-w-[320px] relative rounded-2xl bg-bgColor-default flex flex-col items-center justify-start py-5 px-6 gap-4 text-center text-[20px] text-textColor-body font-pretendard animate-slide-up">
        {/* 🔹 제목 영역 */}
        <div className="w-full flex flex-col items-center justify-start">
          <div className="relative leading-[30px] font-medium text-textColor-heading">
            채팅을 종료하시겠습니까?
          </div>
        </div>

        <div className="w-full flex flex-row gap-4 text-left text-xl">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-bgColor border border-borderColor-default h-12 flex items-center justify-center text-textColor-body hover:bg-bgColor-surface active:garyscale-50"
          >
            <span className="font-semibold leading-[24px]">예</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-brand-normal h-12 flex items-center justify-center text-textColor-white hover:bg-brand-hover active:bg-brand-active"
          >
            <span className="font-semibold leading-[24px]">아니요</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotExitPopup;
