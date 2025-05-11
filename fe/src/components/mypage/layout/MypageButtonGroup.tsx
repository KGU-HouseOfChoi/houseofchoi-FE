"use client";

import FamilyAddButton from "@/components/mypage/button/FamilyAddButton";
import SmallButton from "@/components/mypage/button/SmallButton";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/mypage/logout";

const MypageButtonGroup = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const openInquiryModal = () => {
    alert("문의하기 기능은 준비 중입니다.");
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <div className="mt-8">
        <FamilyAddButton />
      </div>

      <div className="flex gap-4 mt-8">
        <SmallButton onClick={handleLogout}>로그아웃</SmallButton>
        <SmallButton onClick={openInquiryModal}>회원탈퇴</SmallButton>
      </div>
    </div>
  );
};

export default MypageButtonGroup;
