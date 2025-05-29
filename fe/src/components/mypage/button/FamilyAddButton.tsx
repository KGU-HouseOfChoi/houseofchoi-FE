"use client";

import { useState } from "react";
import FamilyLinkPopup from "@/components/family/popup/FamilyLinkPopup";

interface FamilyAddButtonProps {
  hasFamily: boolean;
}

const FamilyAddButton = ({ hasFamily }: FamilyAddButtonProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenPopup}
        className={`h-[55px] min-w-[330px] px-6 shadow-header 
        rounded-xl bg-brand-normal text-white text-2xl font-semibold font-pretendard 
        whitespace-nowrap flex items-center justify-center`}
      >
        {hasFamily ? "가족수정하기" : "가족추가하기"}
      </button>

      <FamilyLinkPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        hasFamily={hasFamily}
      />
    </>
  );
};

export default FamilyAddButton;
