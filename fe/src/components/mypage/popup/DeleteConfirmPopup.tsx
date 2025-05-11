"use client";

import { Trash, X } from "lucide-react";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import { useState } from "react";

interface AccountDeleteConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AccountDeleteConfirmPopup({
  isOpen,
  onClose,
  onConfirm,
}: AccountDeleteConfirmPopupProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAccountDeletion = async () => {
    try {
      await onConfirm();
      setToastMessage("회원탈퇴가 완료되었습니다.");
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      setToastMessage("회원탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
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

          {/* 🔥 브랜드 색상으로 아이콘 변경 */}
          <Trash className="w-10 h-10 text-brand-normal" />

          <h2 className="text-2xl font-semibold text-textColor-heading">
            회원탈퇴 하시겠어요?
          </h2>

          <p className="text-base text-textColor-sub leading-relaxed whitespace-pre-line">
            계정을 완전히 삭제합니다.{"\n"}다시 복구할 수 없습니다.
          </p>

          <PopupButtons
            onCancel={onClose}
            onConfirm={handleAccountDeletion}
            confirmLabel="회원탈퇴"
            cancelLabel="취소"
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
