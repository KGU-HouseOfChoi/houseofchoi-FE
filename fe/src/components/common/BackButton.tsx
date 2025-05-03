"use client";

import Link from "next/link";
import ArrowBackIcon from "@/asset/icons/arrow_back.svg";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  className?: string;
  iconSize?: number;
}

export default function BackButton({
  href,
  className,
  iconSize = 40,
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) return; 
    router.back(); //단순히 브라우저 뒤로가기
  };

  const icon = (
    <ArrowBackIcon
      width={iconSize}
      height={iconSize}
      className="text-gray-800 cursor-pointer"
      aria-label="뒤로 가기"
    />
  );

  return href ? (
    <Link href={href} className={className}>
      {icon}
    </Link>
  ) : (
    <button onClick={handleClick} className={className} aria-label="뒤로 가기">
      {icon}
    </button>
  );
}
