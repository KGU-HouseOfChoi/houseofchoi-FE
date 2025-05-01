"use client";

import type { FC } from "react";
import { ButtonOption } from "@/types/chatbot";

interface ButtonGroupProps {
  buttons: ButtonOption[];
  onClick: (value: string, label: string) => void;
}

const ButtonGroup: FC<ButtonGroupProps> = ({ buttons, onClick }) => {
  return (
    <div className="flex gap-4 mt-2">
      {buttons.map((btn) => (
        <button
          key={btn.value}
          onClick={() => onClick(btn.value, btn.label)}
          className="w-full relative shadow-[0px_2px_4px_rgba(0,_0,_0,_0.15)] rounded-xl bg-brand-normal border-bg-brand-normal border-solid border-[1px] box-border h-[52px] flex flex-row items-center justify-center py-3.5 px-[23px] text-left text-[20px] text-gray font-pretendard"
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
