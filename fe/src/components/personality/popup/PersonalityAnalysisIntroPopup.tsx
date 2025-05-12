"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import LogoutConfirmPopup from "@/components/auth/popup/LogoutConfirmPopup";

interface PersonalityAnalysisIntroPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PersonalityAnalysisIntroPopup({
  isOpen,
  onClose,
}: PersonalityAnalysisIntroPopupProps) {
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

  const handleGuestMode = () => {
    onClose();
    setIsLogoutPopupOpen(true);
  };

  return (
    <>
      <BottomPopup isOpen={isOpen} onClose={onClose}>
        <div className="relative flex flex-col items-center text-center w-full min-h-[300px] px-6 pt-5 pb-4 justify-center gap-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1"
            aria-label="닫기"
          >
            <X className="w-6 h-6 text-textColor-sub" />
          </button>

          <Info className="w-10 h-10 text-brand-normal" />

          <h2 className="text-2xl font-semibold font-pretendard">
            부모님의 성향을 먼저 알아볼게요
          </h2>

          <p className="text-lg text-textColor-sub font-pretendard leading-relaxed whitespace-pre-line">
            부모님께 맞는 활동을 추천해드리기 위해{"\n"}
            간단한 질문 몇 가지를 먼저 여쭤볼게요.{"\n\n"}
            자녀이신 경우에도{"\n"}
            부모님을 대신해 성향을 알려주세요.{"\n\n"}
            비회원으로 둘러보면 로그인이 해제돼요.
          </p>

          <PopupButtons
            onConfirm={onClose}
            onCancel={handleGuestMode}
            confirmLabel="네, 시작할게요"
            cancelLabel="비회원으로 둘러볼게요"
          />
        </div>
      </BottomPopup>

      <LogoutConfirmPopup
        isOpen={isLogoutPopupOpen}
        onClose={() => setIsLogoutPopupOpen(false)}
        redirectPath="/guest"
      />
    </>
  );
}
