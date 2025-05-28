"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MainHeader from "@/components/home/MainHeader";
import SearchBar from "@/components/home/search/SearchBar";
import MemberActivityCardList from "@/components/home/MemberActivityCardList";
import BottomNavBar from "@/components/common/BottomNavBar";

export default function MemberPage() {
  const router = useRouter();

  useEffect(() => {
    const isPersonalityCompleted = localStorage.getItem("personalityCompleted");
    const isSignupComplete = localStorage.getItem("signupComplete");

    // 회원가입을 하지 않은 경우
    if (!isSignupComplete) {
      router.replace("/auth");
      return;
    }

    // 성향 분석을 하지 않은 경우에만 personality 페이지로 리다이렉트
    if (!isPersonalityCompleted && !window.location.pathname.includes("/personality")) {
      router.replace("/member/personality");
      return;
    }
  }, [router]);

  return (
    <>
      <MainHeader />
      <div className="flex flex-col gap-6 px-5 pt-[122px] pb-[124px] bg-bgColor-default">
        <SearchBar />
        <MemberActivityCardList />
      </div>
      <BottomNavBar />
    </>
  );
}
