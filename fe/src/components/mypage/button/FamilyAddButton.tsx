"use client";

import { useState } from "react";
import FamilyLinkPopup from "@/components/family/popup/FamilyLinkPopup";

const FamilyAddButton = () => {
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
        className={`h-[55px] min-w-[245px] px-6 shadow-[0px_3px_10px_rgba(142,_142,_142,_0.3)] 
        rounded-xl bg-brand-normal text-white text-2xl font-semibold font-pretendard 
        whitespace-nowrap flex items-center justify-center`}
      >
        가족 추가하기
      </button>

      <FamilyLinkPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </>
  );
};

export default FamilyAddButton;
