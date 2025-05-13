"use client";

import { useEffect, useState } from "react";
import BottomNavBar from "@/components/common/BottomNavBar";
import MypageCard from "@/components/mypage/card/MypageCard";
import FamilyList from "@/components/mypage/layout/FamilyList";
import MypageButtonGroup from "@/components/mypage/layout/MypageButtonGroup";
import { fetchFamilyList, FamilyMember } from "@/apis/mypage/familyList";
import Toast from "@/components/common/Toast";

export default function MyPage() {
  const [familyList, setFamilyList] = useState<FamilyMember[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchFamilyList();

        if (userData.length > 0) {
          setFamilyList(userData);
        } else {
          setToastMessage("가족 정보를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("네트워크 요청 실패:", error);
        setToastMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    };

    loadUserData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen pt-10 pb-[124px] justify-start bg-white">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    
      {familyList.map((member) => (
        <MypageCard
          key={member.userCode}
          name={member.name}
          userCode={member.userCode}
        />
      ))}

      <FamilyList userInfoList={familyList} />
      <MypageButtonGroup />
      <div className="flex-grow" />
      <BottomNavBar />
    </div>
  );
}
