"use client";

import { useEffect, useState } from "react";
import BottomNavBar from "@/components/common/BottomNavBar";
import MypageCard from "@/components/mypage/card/MypageCard";
import FamilyList from "@/components/mypage/layout/FamilyList";
import MypageButtonGroup from "@/components/mypage/layout/MypageButtonGroup";
import { fetchFamilyList, FamilyMember } from "@/apis/mypage/familyList"

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<FamilyMember>({
    name: "",
    userCode: "",
    birth: "",
    relatedUserName: "",
    relatedUserBirth: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await fetchFamilyList();
      console.log("📌 불러온 사용자 정보:", userData);
      setUserInfo(userData);
    };
    loadUserData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen pt-10 pb-[124px] justify-start bg-white">
      <MypageCard name={userInfo.name} userCode={userInfo.userCode} />
      <FamilyList userInfo={userInfo} />
      <MypageButtonGroup />
      <div className="flex-grow" />
      <BottomNavBar />
    </div>
  );
}
