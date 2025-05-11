"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuth } from "@/hooks/auth/useAuth";

import MainHeader from "@/components/home/MainHeader";
import SearchBar from "@/components/home/SearchBar";
import ActivityCardList from "@/components/home/ActivityCardList";
import BottomNavBar from "@/components/common/BottomNavBar";
import LoginGuidePopup from "@/components/auth/popup/LoginGuidePopup";

export default function GuestPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);

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
