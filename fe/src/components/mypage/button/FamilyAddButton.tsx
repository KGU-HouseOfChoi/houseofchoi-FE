"use client";

import { useRouter } from "next/navigation";

const FamilyAddButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/family/add");
  };

  return (
    <button
      onClick={handleClick}
      className={`h-[55px] min-w-[245px] px-6 shadow-[0px_3px_10px_rgba(142,_142,_142,_0.3)] 
      rounded-xl bg-brand-normal text-white text-2xl font-semibold font-pretendard 
      whitespace-nowrap flex items-center justify-center`}
    >
      가족 추가하기
    </button>
  );
};

export default FamilyAddButton;
