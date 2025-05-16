"use client";

import { useState } from "react";
import SmallButton from "@/components/mypage/button/SmallButton";
import LogoutConfirmPopup from "@/components/auth/popup/LogoutConfirmPopup";
import AccountDeleteConfirmPopup from "@/components/mypage/popup/DeleteConfirmPopup";

export default function MypageButtonGroup() {
  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [isAccountDeletePopupOpen, setAccountDeletePopupOpen] = useState(false);

  return (
    <>
      
       <div className="w-full max-w-md px-4 mb-6">
        <div className="flex flex-row justify-center gap-3">
          <SmallButton
            className="w-full sm:w-[120px] text-center"
            onClick={() => setLogoutPopupOpen(true)}
          >
            로그아웃
          </SmallButton>
          <SmallButton
            className="w-full sm:w-[120px] text-center"
            onClick={() => setAccountDeletePopupOpen(true)}
          >
            회원탈퇴
          </SmallButton>
        </div>
      </div>

      
      <LogoutConfirmPopup
        isOpen={isLogoutPopupOpen}
        onClose={() => setLogoutPopupOpen(false)}
      />
      <AccountDeleteConfirmPopup
        isOpen={isAccountDeletePopupOpen}
        onClose={() => setAccountDeletePopupOpen(false)}
      />
    </>
  );
}
