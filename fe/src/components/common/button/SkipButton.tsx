import type { ButtonHTMLAttributes } from "react";

interface SkipButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export default function SkipButton({
  text = "건너뛰기",
  className = "",
  ...props
}: SkipButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center text-lg text-textColor-sub hover:text-brand-normal transition-colors duration-200 p-0 m-0 ${className}`}
      style={{ minWidth: 0, minHeight: 0 }}
    >
      <span>{text}</span>
      <svg
        className="w-4 h-4 -mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
