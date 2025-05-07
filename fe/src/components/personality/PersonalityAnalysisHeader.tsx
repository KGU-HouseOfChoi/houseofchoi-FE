"use client";

import { useState } from "react";
import LogoutConfirmPopup from "@/components/auth/popup/LogoutConfirmPopup";

export default function PersonalityAnalysisHeader() {
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

  return (
    <>
      <div className="absolute top-0 left-0 w-full px-6 pt-6 z-10 max-w-[414px] mx-auto">
        <div className="flex justify-between items-center text-lg text-textColor-body mb-2">
          <h1 className="text-xl font-bold text-textColor-heading">
            성향 분석
          </h1>
          <button
            onClick={() => setIsLogoutPopupOpen(true)}
            className="inline-flex items-center gap-1 text-lg text-textColor-sub hover:text-brand-normal"
          >
            <span>로그아웃</span>
            <svg
              className="w-4 h-4"
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

      <LogoutConfirmPopup
        isOpen={isLogoutPopupOpen}
        onClose={() => setIsLogoutPopupOpen(false)}
      />
    </>
  );
}
