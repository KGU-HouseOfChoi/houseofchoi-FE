"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

interface CarrierInputProps {
  value: string;
  onClick: () => void;
  error?: string;
  isOpen?: boolean;
}

/**
 * Renders a carrier selection input with a label, button, and optional error message.
 *
 * Displays the current carrier value or a placeholder if none is selected. The button shows an icon indicating whether the dropdown is open or closed, and triggers the provided callback when clicked. If an error message is provided, it is displayed below the button.
 *
 * @param value - The currently selected carrier value.
 * @param onClick - Callback invoked when the button is clicked.
 * @param error - Optional error message to display below the input.
 * @param isOpen - Optional flag indicating if the dropdown is open. Defaults to false.
 */
export default function CarrierInput({
  value,
  onClick,
  error,
  isOpen = false,
}: CarrierInputProps) {
  return (
    <div className="w-full max-w-[327px] flex flex-col gap-2">
      <label className="text-xl text-textColor-sub">통신사</label>

      <button
        type="button"
        onClick={onClick}
        className={`relative w-full h-[60px] px-4 rounded-xl border-2 text-left transition-colors flex items-center justify-between
          ${
            error
              ? "border-danger-50 hover:bg-danger-50/10"
              : value
                ? "border-brand-normal hover:bg-brand-normal/10"
                : "border-borderColor-default hover:bg-borderColor-default/10"
          }`}
      >
        <span
          className={`text-base ${!value ? "text-textColor-disabled" : ""}`}
        >
          {value || "통신사를 선택해주세요"}
        </span>

        <span className="text-iconColor-sub">
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </span>
      </button>

      {error && <p className="text-danger-50 text-sm font-medium">{error}</p>}
    </div>
  );
}
