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

  const handleAccountDeletion = async () => {
    try {
      
      
      alert("회원탈퇴가 완료되었습니다.");
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <div className="mt-8">
        <FamilyAddButton />
      </div>

      <div className="flex gap-4 mt-16">
        <SmallButton onClick={handleLogoutClick}>로그아웃</SmallButton>
        <SmallButton onClick={handleAccountDeleteClick}>회원탈퇴</SmallButton>
      </div>

      
      <LogoutConfirmPopup
        isOpen={isLogoutPopupOpen}
        onClose={handleCloseLogoutPopup}
      />

      
      <AccountDeleteConfirmPopup
        isOpen={isAccountDeletePopupOpen}
        onClose={handleCloseAccountDeletePopup}
        onConfirm={handleAccountDeletion}
      />
    </div>
  );
};

export default MypageButtonGroup;
