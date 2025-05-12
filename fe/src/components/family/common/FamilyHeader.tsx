"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import BackButton from "@/components/common/button/BackButton";

interface FamilyHeaderProps {
  onBack?: () => void;
}

const FamilyHeader: NextPage<FamilyHeaderProps> = ({ onBack }) => {
  const router = useRouter();

  const handleBack = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="w-full relative bg-white h-14 md:h-16 flex items-center px-2 md:px-4 text-gray font-pretendard">
      <BackButton onClick={handleBack} className="mr-1" />

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-[21px] md:text-2xl">
        가족연동
      </div>
    </div>
  );
};

export default FamilyHeader;
