"use client";

import { useRouter } from "next/navigation";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/Button/PopupButtons";
import { LogIn, X } from "lucide-react";

interface LoginGuidePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Displays a modal popup guiding users to log in, with options to proceed to authentication or dismiss the popup.
 *
 * @param isOpen - Controls whether the popup is visible.
 * @param onClose - Callback invoked to close the popup.
 *
 * @returns The rendered login guide popup component.
 */
export default function LoginGuidePopup({
  isOpen,
  onClose,
}: LoginGuidePopupProps) {
  const router = useRouter();

  const handleJoin = () => {
    onClose();
    router.push("/auth");
  };

  return (
    <BottomPopup isOpen={isOpen} onClose={onClose}>
      <div className="relative flex flex-col items-center text-center w-full max-w-[327px] min-h-[330px] px-6 pt-5 pb-4 mx-auto justify-center gap-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-bgColor-surface"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-iconColor-sub" />
        </button>

        <LogIn className="w-10 h-10 text-brand-normal" />

        <h2 className="text-2xl font-semibold text-textColor-heading">
          로그인하고 더 편하게
        </h2>

        <p className="text-base text-textColor-sub leading-relaxed whitespace-pre-line">
          관심 있는 활동을 저장하고
          {"\n"}가족과 함께 일정을 확인할 수 있어요.
        </p>

        <PopupButtons
          onConfirm={handleJoin}
          onCancel={onClose}
          confirmLabel="전화번호로 시작하기"
          cancelLabel="나중에 할게요"
        />
      </div>
    </BottomPopup>
  );
}
