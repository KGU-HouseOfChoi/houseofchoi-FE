"use client";

import Link from "next/link";
import ArrowBackIcon from "@/asset/icons/arrow_back.svg";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  className?: string;
  iconSize?: number;
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
}

export default function BackButton({
  href,
  className,
  iconSize = 40,
  onClick,
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    if (onClick) {
      onClick(e); // 🔹 외부에서 전달된 onClick 먼저 실행
    }

    // 🔄 preventDefault가 호출되지 않았으면 뒤로가기 또는 페이지 이동
    if (!e.defaultPrevented) {
      if (!href) {
        // ✅ history가 존재하면 router.back()
        if (window.history.length > 1) {
          router.back();
        }
      }
    }
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
    <Link href={href} className={className} onClick={handleClick}>
      {icon}
    </Link>
  ) : (
    <button onClick={handleClick} className={className} aria-label="뒤로 가기">
      {icon}
    </button>
  );
}
