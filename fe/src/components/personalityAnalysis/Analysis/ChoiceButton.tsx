"use client";

import { CheckCircle, Circle } from "lucide-react";
import clsx from "clsx";

interface ChoiceButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function ChoiceButton({
  label,
  selected,
  onClick,
}: ChoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full h-20 px-4 rounded-xl border-2 flex justify-between items-center text-xl font-semibold font-pretendard transition duration-200",
        selected
          ? "bg-[#FFF5E6] text-brand-normal border-brand-normal"
          : "bg-grayscale-0 text-grayscale-80 border-grayscale-30 hover:bg-grayscale-10 hover:border-grayscale-40"
      )}
      style={{ minHeight: "80px", maxHeight: "80px" }}
    >
      <span className="flex-1 text-left">{label}</span>
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
        {selected ? (
          <CheckCircle className="w-8 h-8 text-brand-normal" />
        ) : (
          <Circle className="w-8 h-8 text-grayscale-30" />
        )}
      </div>
    </button>
  );
}
