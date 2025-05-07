"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNavBar from "@/components/common/BottomNavBar";
import MypageCard from "@/components/mypage/card/MypageCard";
import FamilyAddButton from "@/components/mypage/button/FamilyAddButton";
import SmallButton from "@/components/mypage/button/SmallButton";
import FamilyCard from "@/components/mypage/card/FamilyCard";
import { logout } from "@/lib/mypage/logout";

interface FamilyMember {
  name: string;
  birth: string;
}

export default function MyPage() {
  const router = useRouter();
  const [familyList, setFamilyList] = useState<FamilyMember[]>([]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const openInquiryModal = () => {
    alert("문의하기 기능은 준비 중입니다.");
  };

  const handleAddFamily = () => {
    const newMember: FamilyMember = {
      name: `가족 ${familyList.length + 1}님`,
      birth: "2000.07.11", // 예시 생년월일
    };
    setFamilyList([...familyList, newMember]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-10 pb-[124px] justify-start bg-white">
      <MypageCard name="최서희님" />

      <div className="flex flex-col gap-6 mt-10 items-center">
        {familyList.map((member, idx) => (
          <FamilyCard key={idx} name={member.name} birth={member.birth} />
        ))}
      </div>

      <div className={`${familyList.length === 0 ? "mt-20" : "mt-8"}`}>
        <FamilyAddButton onClick={handleAddFamily}>
          가족 추가하기
        </FamilyAddButton>
      </div>

      <div className="flex-grow" />

      <div className="flex gap-4 mt-8">
        <SmallButton onClick={handleLogout}>로그아웃</SmallButton>
        <SmallButton onClick={openInquiryModal}>문의하기</SmallButton>
      </div>

      <BottomNavBar />
    </div>
  );
}
