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
    e.stopPropagation();
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[414px] h-14 md:h-16 z-10 bg-white flex items-center px-4 text-gray font-pretendard shadow-header">
      <BackButton onClick={handleBack} className="mr-1" />

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-[21px] md:text-2xl">
        가족연동
      </div>
    </header>
  );
};

export default FamilyHeader;
