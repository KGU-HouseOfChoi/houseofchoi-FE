"use client";

import { ReactNode } from "react";

interface BottomButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function BottomButton({
  children,
  onClick,
  disabled = false,
}: BottomButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[414px] h-[74px] z-50 text-white text-xl font-semibold font-pretendard transition
        ${
          disabled
            ? "bg-grayscale-20 cursor-not-allowed"
            : "bg-brand-normal hover:bg-brand-hover active:bg-brand-active"
        }`}
    >
      {children}
    </button>
  );
}
