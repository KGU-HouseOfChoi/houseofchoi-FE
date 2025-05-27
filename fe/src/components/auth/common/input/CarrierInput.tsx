"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

interface CarrierInputProps {
  value: string;
  onClick: () => void;
  error?: string;
  isOpen?: boolean;
}

export default function CarrierInput({
  value,
  onClick,
  error,
  isOpen = false,
}: CarrierInputProps) {
  return (
    <div className="w-full max-w-[364px] flex flex-col gap-2 mx-auto">
      <label className="text-xl text-textColor-body font-semibold">
        통신사
      </label>
      <button
        type="button"
        onClick={onClick}
        className={`relative w-full h-[60px] rounded-xl border-2 text-left flex items-center px-4 pr-12 transition-colors bg-bgColor-default
          ${
            error
              ? "border-danger-50 hover:bg-danger-50/10"
              : value || isOpen
                ? "border-brand-normal hover:bg-brand-normal/10"
                : "border-borderColor-default hover:bg-borderColor-default/10"
          }
          focus:border-brand-normal focus:outline-none`}
      >
        <span
          className={`text-base ${!value ? "text-textColor-disabled" : "text-textColor-heading"}`}
        >
          {value || "통신사를 선택해주세요"}
        </span>

        <span className="absolute right-4 text-iconColor-sub">
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </span>
      </button>

      {error && (
        <p className="text-danger-50 text-sm font-medium mt-1">{error}</p>
      )}
    </div>
  );
}
