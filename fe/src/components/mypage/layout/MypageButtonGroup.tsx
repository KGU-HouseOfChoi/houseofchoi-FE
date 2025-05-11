"use client";

import FamilyAddButton from "@/components/mypage/button/FamilyAddButton";
import SmallButton from "@/components/mypage/button/SmallButton";
import { useRouter } from "next/navigation";
import { logoutApi, deleteAccountApi } from "@/apis/mypage/userAuth";

const MypageButtonGroup = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const success = await logoutApi();
    if (success) {
      alert("로그아웃 되었습니다.");
      router.push("/login");
    } else {
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleAccountDeletion = async () => {
    const confirmDelete = window.confirm("정말로 회원탈퇴 하시겠습니까?");
    if (confirmDelete) {
      const success = await deleteAccountApi();
      if (success) {
        alert("회원탈퇴가 완료되었습니다.");
        router.push("/login");
      } else {
        alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
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
