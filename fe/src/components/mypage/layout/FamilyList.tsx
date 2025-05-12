"use client";

import FamilyCard from "@/components/mypage/card/FamilyCard";
import { FamilyMember } from "@/apis/mypage/familyList";

interface FamilyListProps {
  userInfoList: FamilyMember[];
}

const FamilyList = ({ userInfoList }: FamilyListProps) => {
  if (!userInfoList || userInfoList.length === 0) {
    return <p className="text-gray-500">가족 정보가 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-6 mt-10 items-center">
      {userInfoList.map((userInfo, index) => (
        <FamilyCard
          key={index}
          name={userInfo.relatedUserName}
          birth={userInfo.relatedUserBirth}
          userCode={userInfo.userCode}
        />
      ))}
    </div>
  );
};

export default FamilyList;
