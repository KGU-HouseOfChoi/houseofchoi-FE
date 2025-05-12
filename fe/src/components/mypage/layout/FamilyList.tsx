"use client";

import FamilyCard from "@/components/mypage/card/FamilyCard";
import { FamilyMember } from "@/apis/mypage/familyList";

interface FamilyListProps {
  userInfoList: FamilyMember[];
}

const FamilyList = ({ userInfoList }: FamilyListProps) => {
  if (userInfoList.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 mt-10 items-center">
      {userInfoList.map((userInfo, index) => {
        if (!userInfo.relatedUserName || !userInfo.relatedUserBirth) {
          return null;
        }

        return (
          <FamilyCard
            key={index}
            relatedUserName={userInfo.relatedUserName}
            relatedUserBirth={userInfo.relatedUserBirth}
          />
        );
      })}
    </div>
  );
};

export default FamilyList;
