"use client";

import { useState } from "react";
import MainHeader from "@/components/home/MainHeader";
import SearchBar from "@/components/home/search/SearchBar";
import GuestActivityCardList from "@/components/home/GuestActivityCardList";
import BottomNavBar from "@/components/common/BottomNavBar";
import LoginGuidePopup from "@/components/auth/popup/LoginGuidePopup";

export default function GuestPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <MainHeader />
      <div className="flex flex-col gap-6 px-5 pt-[122px] pb-[124px] bg-bgColor-default">
        <SearchBar />
        <GuestActivityCardList />
      </div>
      <BottomNavBar />
      <LoginGuidePopup
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
