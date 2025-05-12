"use client";

import { LogOut, X } from "lucide-react";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import { useState } from "react";

interface ChatbotExitConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ChatbotExitConfirmPopup({
  isOpen,
  onClose,
  onConfirm,
}: ChatbotExitConfirmPopupProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChatExit = async () => {
    try {
      await onConfirm();
      setToastMessage("채팅이 종료되었습니다.");
    } catch (error) {
      console.error("채팅 종료 실패:", error);
      setToastMessage("채팅 종료 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      onClose();
    }
  };

  return (
    <>
      <BottomPopup isOpen={isOpen} onClose={onClose}>
        <div className="relative flex flex-col items-center text-center w-full max-w-[327px] min-h-[330px] px-6 pt-5 pb-4 mx-auto justify-center gap-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded hover:bg-bgColor-surface"
            aria-label="닫기"
            type="button"
          >
            <X className="w-6 h-6 text-iconColor-sub" />
          </button>

          <LogOut className="w-10 h-10 text-brand-normal" />

          <h2 className="text-2xl font-semibold text-textColor-heading">
            대화를 종료하시겠어요?
          </h2>

          <p className="text-base text-textColor-sub leading-relaxed whitespace-pre-line">
            대화 중인 내용을 종료합니다.{"\n"}다시 되돌릴 수 없습니다.
          </p>

          <PopupButtons
            onCancel={onClose}
            onConfirm={handleChatExit}
            confirmLabel="종료"
            cancelLabel="대화하기"
          />
        </div>
      </BottomPopup>

      {toastMessage && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-danger-50 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium"
          onClick={() => setToastMessage(null)}
        >
          {toastMessage}
        </div>
      )}
    </>
  );
}
