"use client";

import { useEffect, useState, useMemo } from "react";
import BottomNavBar from "@/components/common/BottomNavBar";
import MypageCard from "@/components/mypage/card/MypageCard";
import FamilyList from "@/components/mypage/layout/FamilyList";
import MypageButtonGroup from "@/components/mypage/layout/MypageButtonGroup";
import FamilyAddButton from "@/components/mypage/button/FamilyAddButton";
import { fetchFamilyList, FamilyMember } from "@/apis/mypage/familyList";
import Toast from "@/components/common/Toast";

export default function MyPage() {
  const [familyList, setFamilyList] = useState<FamilyMember[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFamilyList();
        if (data.length) setFamilyList(data);
        else setToastMessage("가족 정보를 불러오지 못했습니다.");
      } catch (e) {
        console.error("가족 정보 불러오기 오류:", e);
        setToastMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    })();
  }, []);

  const filteredFamilyList = useMemo(
    () =>
      familyList.filter(
        (userInfo) => userInfo.relatedUserName && userInfo.relatedUserBirth,
      ),
    [familyList],
  );

  return (
    <>
      <div className="flex flex-col items-center min-h-screen pt-10 pb-[124px] bg-white">
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}

        {familyList.map((m) => (
          <MypageCard key={m.userCode} name={m.name} userCode={m.userCode} />
        ))}

        <FamilyList userInfoList={familyList} />

        <div className="mt-20 mb-8">
          <FamilyAddButton hasFamily={filteredFamilyList.length > 0} />
        </div>

        <div className="flex-grow" />

        <MypageButtonGroup />
      </div>

      <BottomNavBar />
    </>
  );
}
