"use client";

import { FC } from "react";

interface CardButtonProps {
  text: string;
  width?: string;
  height?: string;
  onClick?: () => void;
}

const CardButton: FC<CardButtonProps> = ({
  text,
  width = "w-full",
  height = "h-[70px]",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl bg-brand-normal text-textColor-heading text-lg sm:text-xl font-bold text-center shadow-md ${width} ${height} flex items-center justify-center px-2`}
    >
      {text}
    </button>
  );
};

export default CardButton;
