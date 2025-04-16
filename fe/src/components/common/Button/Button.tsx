import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  children,
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`h-[58px] px-4 bg-brand-normal text-white text-2xl font-semibold font-pretendard
        rounded-[16px] flex justify-center items-center gap-2
        hover-supported:bg-brand-hover active:bg-brand-active
        disabled:bg-gray-300 disabled:cursor-not-allowed
        ${fullWidth ? "w-full" : "w-[331px]"}`}
    >
      {children}
    </button>
  );
}
