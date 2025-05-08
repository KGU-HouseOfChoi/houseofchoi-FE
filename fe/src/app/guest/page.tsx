"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

import MainHeader from "@/components/home/MainHeader";
import SearchBar from "@/components/home/SearchBar";
import ActivityCardList from "@/components/home/ActivityCardList";
import BottomNavBar from "@/components/common/BottomNavBar";
import LoginGuidePopup from "@/components/auth/popup/LoginGuidePopup";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const resetAuth = useAuthStore((state) => state.reset);

  useEffect(() => {
    resetAuth();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, [resetAuth]);

  return (
    <>
      <MainHeader />
      <div className="flex flex-col gap-6 px-5 pt-[122px] pb-[124px] bg-bgColor-default">
        <SearchBar />
        <ActivityCardList />
      </div>
      <BottomNavBar />
      <LoginGuidePopup
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
