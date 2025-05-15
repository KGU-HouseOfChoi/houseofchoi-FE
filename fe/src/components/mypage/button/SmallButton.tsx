import type { ButtonHTMLAttributes, ReactNode } from "react";

interface SmallButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function SmallButton({ children, ...props }: SmallButtonProps) {
  return (
    <button
      {...props}
      className="relative rounded-2xl bg-white border-gainsboro border-solid border-[1px] box-border overflow-hidden flex flex-row items-center justify-center py-[5px] px-[13px] text-left text-[16px] text-darkslategray font-pretendard"
    >
      {children}
    </button>
  );
}
