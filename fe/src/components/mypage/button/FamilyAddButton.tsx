"use client";

import { useState } from "react";
import FamilyLinkPopup from "@/components/family/popup/FamilyLinkPopup";
import FamilyDeleteConfirmPopup from "@/components/family/popup/FamilyDeleteConfirmPopup";

interface FamilyAddButtonProps {
  hasFamily: boolean;
}

const FamilyAddButton = ({ hasFamily }: FamilyAddButtonProps) => {
  const [isLinkPopupOpen, setIsLinkPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const handleClick = () => {
    if (hasFamily) {
      
      setIsDeletePopupOpen(true);
    } else {
     
      setIsLinkPopupOpen(true);
    }
  };

  const closeLinkPopup = () => setIsLinkPopupOpen(false);
  const closeDeletePopup = () => setIsDeletePopupOpen(false);

  return (
    <>
      <button
        onClick={handleClick}
        className={`h-[55px] min-w-[330px] px-6 shadow-header 
        rounded-xl bg-brand-normal text-white text-2xl font-semibold font-pretendard 
        whitespace-nowrap flex items-center justify-center`}
      >
        {hasFamily ? "가족 수정하기" : "가족 추가하기"}
      </button>

      
      <FamilyLinkPopup isOpen={isLinkPopupOpen} onClose={closeLinkPopup} />

      
      <FamilyDeleteConfirmPopup isOpen={isDeletePopupOpen} onClose={closeDeletePopup} />
    </>
  );
};

export default FamilyAddButton;
