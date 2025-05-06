"use client";

import { LogOut, X } from "lucide-react";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/Button/PopupButtons";
import { useLogout } from "@/hooks/auth/useLogout";

interface LogoutConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  redirectPath?: string;
}

export default function LogoutConfirmPopup({
  isOpen,
  onClose,
}: LogoutConfirmPopupProps) {
  const { logout, toastMessage } = useLogout();

  if (!isOpen) return null;

  return (
    <>
      <BottomPopup isOpen={isOpen} onClose={onClose}>
        <div className="relative flex flex-col items-center text-center w-full min-h-[330px] px-6 pt-5 pb-4 justify-center gap-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1"
            aria-label="닫기"
            type="button"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>

          <LogOut className="w-10 h-10 text-brand-normal" />

          <h2 className="text-2xl font-semibold font-pretendard">
            로그아웃 하시겠어요?
          </h2>

          <p className="text-xl text-grayscale-50 font-pretendard leading-relaxed">
            계정에서 안전하게
            <br />
            로그아웃할 수 있어요.
          </p>

          <PopupButtons
            onCancel={onClose}
            onConfirm={async () => {
              onClose();
              await logout("/guest"); // 무조건 guest로 이동
            }}
            confirmLabel="로그아웃"
            cancelLabel="취소"
          />
        </div>
      </BottomPopup>

      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow">
          {toastMessage}
        </div>
      )}
    </>
  );
}
