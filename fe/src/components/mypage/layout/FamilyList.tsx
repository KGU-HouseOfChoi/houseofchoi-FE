"use client";

import FamilyCard from "@/components/mypage/card/FamilyCard";
import { FamilyMember } from "@/apis/mypage/familyList";

interface FamilyListProps {
  userInfoList: FamilyMember[];
}

const FamilyList = ({ userInfoList }: FamilyListProps) => {
  const filteredList = userInfoList.filter(
    (userInfo) => userInfo.relatedUserName && userInfo.relatedUserBirth,
  );

  if (filteredList.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 mt-10 items-center">
      {filteredList.map((userInfo) => (
        <FamilyCard
          key={userInfo.userCode}
          relatedUserName={userInfo.relatedUserName}
          relatedUserBirth={userInfo.relatedUserBirth}
        />
      ))}
    </div>
  );
};

export default FamilyList;
