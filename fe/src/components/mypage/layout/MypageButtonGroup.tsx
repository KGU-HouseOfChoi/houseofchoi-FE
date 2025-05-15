"use client";

import FamilyAddButton from "@/components/mypage/button/FamilyAddButton";
import SmallButton from "@/components/mypage/button/SmallButton";
import LogoutConfirmPopup from "@/components/auth/popup/LogoutConfirmPopup";
import AccountDeleteConfirmPopup from "@/components/mypage/popup/DeleteConfirmPopup";
import { useState } from "react";

const MypageButtonGroup = () => {
  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [isAccountDeletePopupOpen, setAccountDeletePopupOpen] = useState(false);

  const handleLogoutClick = () => {
    setLogoutPopupOpen(true);
  };

  const handleAccountDeleteClick = () => {
    setAccountDeletePopupOpen(true);
  };

  const handleCloseLogoutPopup = () => {
    setLogoutPopupOpen(false);
  };

  const handleCloseAccountDeletePopup = () => {
    setAccountDeletePopupOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <div className="mt-8">
        <FamilyAddButton />
      </div>

         
    <div className="flex-grow" />

        
    <div className="w-full max-w-md px-4 mb-4">
      <div className="flex justify-center gap-3">
        <SmallButton
          className="w-[120px] text-center"
          onClick={handleLogoutClick}
        >
          로그아웃
        </SmallButton>
        <SmallButton
          className="w-[120px] text-center"
          onClick={handleAccountDeleteClick}
        >
          회원탈퇴
        </SmallButton>
      </div>
    </div>

      <LogoutConfirmPopup
        isOpen={isLogoutPopupOpen}
        onClose={handleCloseLogoutPopup}
      />

      
      <AccountDeleteConfirmPopup
        isOpen={isAccountDeletePopupOpen}
        onClose={handleCloseAccountDeletePopup}
      />
    </div>
    
  );
};

export default MypageButtonGroup;
