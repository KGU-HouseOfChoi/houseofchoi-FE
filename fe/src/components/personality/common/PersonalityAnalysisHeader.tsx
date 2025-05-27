"use client";

import { useState } from "react";
import LogoutConfirmPopup from "@/components/auth/popup/LogoutConfirmPopup";

export default function PersonalityAnalysisHeader() {
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[414px] h-[60px] z-10 bg-bgColor-default shadow-header">
        <div className="w-full h-full flex items-center px-0 relative">
          <h1 className="text-xl font-bold text-textColor-heading ml-6">
            성향 분석
          </h1>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-6">
            <button
              onClick={() => setIsLogoutPopupOpen(true)}
              className="inline-flex items-center gap-0 text-lg text-textColor-sub hover:text-brand-normal"
            >
              <span>로그아웃</span>
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
            </button>
          </div>
        </div>
      </header>

      <LogoutConfirmPopup
        isOpen={isLogoutPopupOpen}
        onClose={() => setIsLogoutPopupOpen(false)}
      />
    </>
  );
}
