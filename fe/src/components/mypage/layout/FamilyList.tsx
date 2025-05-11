"use client";

import FamilyCard from "@/components/mypage/card/FamilyCard";

interface FamilyListProps {
  userInfo: {
    relatedUserName: string;
    relatedUserBirth: string;
    userCode: string;
  };
}

const FamilyList = ({ userInfo }: FamilyListProps) => {
  if (!userInfo.relatedUserName || !userInfo.relatedUserBirth) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 mt-10 items-center">
      <FamilyCard
        name={userInfo.relatedUserName}
        birth={userInfo.relatedUserBirth}
        userCode={userInfo.userCode}
      />
    </div>
  );
};

export default FamilyList;
