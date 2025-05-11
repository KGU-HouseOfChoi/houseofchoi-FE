import type { FC } from "react";
import UserCircleAddIcon from "@/asset/icons/user-cirlce-add.svg";

interface FamilyCardProps {
  name: string;
  birth: string;
  userCode: string;
}

const FamilyCard: FC<FamilyCardProps> = ({ name, birth }) => {
  return (
    <div className="w-full max-w-[90%] sm:max-w-sm md:max-w-md min-w-[329px] min-h-[180px] rounded-2xl bg-white shadow-[0px_3px_10px_rgba(142,_142,_142,_0.25)] px-6 py-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-textColor-heading">내 가족</h2>

      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center">
          <UserCircleAddIcon width={64} height={64} className="text-iconColor-sub" />
        </div>

        <div className="flex flex-col text-m text-textColor-body font-pretendard">
          <p>성명: {name}</p>                 
          <p>생년월일: {birth}</p>                
        </div>
      </div>
    </div>
  );
};

export default FamilyCard;
