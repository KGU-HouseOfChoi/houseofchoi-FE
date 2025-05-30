"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GuestConfirmPopup from "@/components/auth/popup/GuestConfirmPopup";
import SkipButton from "@/components/common/button/SkipButton";

export default function AuthHeader() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleGuestConfirm = () => {
    setIsPopupOpen(false);
    router.push("/guest");
  };

  return (
    <>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[414px] h-[60px] z-10 bg-bgColor-default shadow-header">
        <div className="w-full h-full flex items-center px-0 relative">
          <h1 className="text-xl font-bold text-textColor-heading ml-6">
            회원가입
          </h1>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-6">
            <SkipButton
              text="비회원으로 이용하기"
              onClick={() => setIsPopupOpen(true)}
              className="gap-0"
            >
              <svg
                className="w-4 h-4 -mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </SkipButton>
          </div>
        </div>
      </header>

      <GuestConfirmPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleGuestConfirm}
      />
    </>
  );
}
