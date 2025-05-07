"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MainHeader from "@/components/home/MainHeader";
import SearchBar from "@/components/home/SearchBar";
import ActivityCardList from "@/components/home/ActivityCardList";
import BottomNavBar from "@/components/common/BottomNavBar";
import LoginGuidePopup from "@/components/auth/popup/LoginGuidePopup";
import { useAuthStore } from "@/store/useAuthStore";

export default function Home() {
  const [isGuest, setIsGuest] = useState(true); // 기본값 true
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const resetAuth = useAuthStore((state) => state.reset);

  useEffect(() => {
    // ✅ 진입 시 상태 초기화 (의도적으로 비회원 상태)
    resetAuth();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsGuest(true);
  }, []);

  const handleProtectedClick = () => {
    if (isGuest) {
      setShowLoginModal(true);
    } else {
      router.push("/member/schedule");
    }
  };

  return (
    <>
      <MainHeader />
      <div className="flex flex-col gap-6 px-5 pt-[122px] pb-[124px] bg-bgColor-default">
        <SearchBar />
        <ActivityCardList />
      </div>
      <BottomNavBar />

      {/* ✅ 로그인 유도 팝업 */}
      <LoginGuidePopup
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
