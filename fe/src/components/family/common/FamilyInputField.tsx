"use client";

import { useRef } from "react";
import { X } from "lucide-react";

interface FamilyInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  active: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function FamilyInputField({
  value,
  onChange,
  placeholder,
  active,
  onFocus,
  onBlur,
}: FamilyInputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onTouchStart={handleTouchStart}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode="text"
        className="w-full border-b-2 border-brand-normal py-3 pr-10 text-lg focus:outline-none text-textColor-body touch-manipulation cursor-text select-text"
        style={{
          WebkitTapHighlightColor: "transparent",
          WebkitTouchCallout: "none",
          WebkitUserSelect: "text",
          userSelect: "text",
          WebkitAppearance: "none",
          appearance: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "manipulation",
          caretColor: active ? "auto" : "transparent",
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute top-1/2 right-2 -translate-y-1/2"
        >
          <X className="w-5 h-5 text-iconColor-sub" />
        </button>
      )}
    </div>
  );
}
