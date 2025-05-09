"use client";

import { LogOut, X } from "lucide-react";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import { useLogout } from "@/hooks/auth/useLogout";
import { useState } from "react";

interface LogoutConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  redirectPath?: string;
}

export default function LogoutConfirmPopup({
  isOpen,
  onClose,
  redirectPath = "/guest",
}: LogoutConfirmPopupProps) {
  const { logout } = useLogout();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogout = async () => {
    const { success } = await logout(redirectPath);
    if (!success) {
      setToastMessage("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
    onClose();
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
            로그아웃 하시겠어요?
          </h2>

          <p className="text-base text-textColor-sub leading-relaxed whitespace-pre-line">
            계정에서 안전하게{"\n"}로그아웃할 수 있어요.
          </p>

          <PopupButtons
            onCancel={onClose}
            onConfirm={handleLogout}
            confirmLabel="로그아웃"
            cancelLabel="취소"
          />
        </div>
      </BottomPopup>

      {toastMessage && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-danger-50 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium"
          onClick={() => setToastMessage(null)} // ✅ 클릭 시 닫기
        >
          {toastMessage}
        </div>
      )}
    </>
  );
}
