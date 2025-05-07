"use client";

import Link from "next/link";
import ArrowBackIcon from "@/asset/icons/arrow_back.svg";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  className?: string;
  iconSize?: number;
}

/**
 * Renders a back navigation button that either navigates to a specified URL or goes back in browser history.
 *
 * If the {@link href} prop is provided, the button renders as a link to that URL. Otherwise, it renders as a button that navigates back in the browser history when clicked.
 *
 * @param href - Optional URL to navigate to when the button is clicked.
 * @param className - Optional CSS class names to apply to the button or link.
 * @param iconSize - Optional size for the back arrow icon. Defaults to 40.
 *
 * @returns A React element representing the back button.
 */
export default function BackButton({
  href,
  className,
  iconSize = 40,
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) return;
    router.back();
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
