"use client";

import { Info, X } from "lucide-react";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/Button/PopupButtons";

interface GuestConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Displays a modal popup prompting the user to confirm whether to continue as a guest.
 *
 * Renders a bottom-anchored popup with informational content and two actions: confirming guest access or canceling to proceed with registration.
 *
 * @param isOpen - Controls the visibility of the popup.
 * @param onClose - Callback invoked when the popup is closed or the cancel action is selected.
 * @param onConfirm - Callback invoked when the user confirms to continue as a guest.
 * @returns The guest confirmation popup component.
 */
export default function GuestConfirmPopup({
  isOpen,
  onClose,
  onConfirm,
}: GuestConfirmPopupProps) {
  return (
    <BottomPopup isOpen={isOpen} onClose={onClose}>
      <div className="relative flex flex-col items-center text-center w-full max-w-[327px] min-h-[300px] px-6 pt-5 pb-4 mx-auto justify-center gap-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-bgColor-surface"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-iconColor-sub" />
        </button>

        <Info className="w-10 h-10 text-brand-normal" />

        <h2 className="text-2xl font-semibold text-textColor-heading">
          비회원으로 이용하시겠어요?
        </h2>

        <p className="text-base text-textColor-sub leading-relaxed whitespace-pre-line">
          회원가입 없이도 둘러보실 수 있어요.
          {"\n"}비회원으로 계속하시겠습니까?
        </p>

        <PopupButtons
          onConfirm={onConfirm}
          onCancel={onClose}
          confirmLabel="네, 비회원으로 이용할게요"
          cancelLabel="아니요, 계속 가입할게요"
        />
      </div>
    </BottomPopup>
  );
}
