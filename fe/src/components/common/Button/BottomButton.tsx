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
      className={`fixed bottom-0 left-0 w-full h-[54px] z-50 text-white text-xl font-semibold font-pretendard transition
        ${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-brand-normal hover:bg-brand-hover active:bg-brand-active"}`}
    >
      {children}
    </button>
  );
}
