import UserCircleAddIcon from "@/asset/icons/user-cirlce-add.svg";

interface MypageCardProps {
  name: string;
  userCode: string;
}

const MypageCard: React.FC<MypageCardProps> = ({ name, userCode }) => {
  return (
    <div className="w-full max-w-[330px] min-h-[233px] rounded-2xl bg-white shadow-[0px_3px_10px_rgba(142,_142,_142,_0.3)] flex flex-col items-center justify-center py-8 px-6 gap-6 text-center font-pretendard">
      <UserCircleAddIcon className="w-16 h-16 text-iconColor-sub" />
      <div className="mt-2 text-2xl font-semibold text-textColor-heading">
        {name}
      </div>
      <div className="text-m text-textColor-heading">고유번호: {userCode}</div>
    </div>
  );
};

export default MypageCard;
