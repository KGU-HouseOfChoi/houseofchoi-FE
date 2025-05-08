"use client";

import { FC } from "react";

interface MainButtonProps {
  text: string;
  width?: string;
  height?: string;
  onClick?: () => void;
}

const MainButton: FC<MainButtonProps> = ({
  text,
  width = "w-full",
  height = "h-[70px]",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl bg-brand-normal text-black text-xl font-bold text-center shadow-md ${width} ${height} flex items-center justify-center`}
    >
      {text}
    </button>
  );
};

export default MainButton;
