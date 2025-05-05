"use client";

import { useRouter } from "next/navigation";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/Button/PopupButtons";
import { LogIn, X } from "lucide-react";

interface LoginGuidePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      <div className="relative flex flex-col items-center text-center w-full min-h-[330px] px-6 pt-5 pb-4 justify-center gap-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <LogIn className="w-10 h-10 text-brand-normal" />

        <h2 className="text-2xl font-semibold font-pretendard">
          로그인하고 더 편하게
        </h2>

        <p className="text-xl text-grayscale-50 font-pretendard leading-relaxed">
          관심 있는 활동을 저장하고
          <br />
          가족과 함께 일정을 확인할 수 있어요.
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
