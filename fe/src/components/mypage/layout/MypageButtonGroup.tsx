"use client";

import FamilyAddButton from "@/components/mypage/button/FamilyAddButton";
import SmallButton from "@/components/mypage/button/SmallButton";
import { useLogout } from "@/hooks/auth/useLogout";

const MypageButtonGroup = () => {
  const { logout } = useLogout();

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      alert("로그아웃 되었습니다.");
    } else {
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleAccountDeletion = async () => {
    const confirmDelete = window.confirm("정말로 회원탈퇴 하시겠습니까?");
    if (confirmDelete) {
      // 회원탈퇴 로직 처리
      alert("회원탈퇴가 완료되었습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <div className="mt-8">
        <FamilyAddButton />
      </div>

      <div className="flex gap-4 mt-16">
        <SmallButton onClick={handleLogout}>로그아웃</SmallButton>
        <SmallButton onClick={handleAccountDeletion}>회원탈퇴</SmallButton>
      </div>
    </div>
  );
};

export default MypageButtonGroup;
