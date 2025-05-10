"use client";

import Link from "next/link";
import ArrowBackIcon from "@/asset/icons/arrow_back.svg";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  className?: string;
  iconSize?: number;
  onClick?: () => void;
}

export default function BackButton({
  href,
  className,
  iconSize = 40,
  onClick,
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (!href) {
      router.back();
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
    <Link href={href} className={className}>
      {icon}
    </Link>
  ) : (
    <button onClick={handleClick} className={className} aria-label="뒤로 가기">
      {icon}
    </button>
  );
}
