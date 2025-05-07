import type { FC, ReactNode } from "react";

interface FamilyAddButtonProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

const FamilyAddButton: FC<FamilyAddButtonProps> = ({
  onClick,
  className = "",
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`h-[55px] min-w-[245px] px-6 shadow-[0px_3px_10px_rgba(142,_142,_142,_0.3)] 
      rounded-xl bg-brand-normal text-white text-2xl font-semibold font-pretendard 
      whitespace-nowrap flex items-center justify-center
      ${className}`}
    >
      {children}
    </button>
  );
};

export default FamilyAddButton;
