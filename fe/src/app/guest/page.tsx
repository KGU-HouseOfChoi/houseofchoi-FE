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

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const resetAuth = useAuthStore((state) => state.reset);
  const router = useRouter();
  const { isGuest, hydrated } = useAuth();

  useEffect(() => {
    if (!hydrated) return;

    if (!isGuest) {
      router.replace("/member/home");
    } else {
      resetAuth();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }, [hydrated, isGuest, resetAuth, router]);

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
