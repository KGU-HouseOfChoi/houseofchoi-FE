"use client";

import { CheckCircle, Circle } from "lucide-react";
import clsx from "clsx";

interface ChoiceButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

/**
 * Renders a selectable button with a label and an icon indicating selection state.
 *
 * The button displays the provided {@link label} and shows a check circle icon when selected, or an outlined circle when not selected. Styling and icon appearance change based on the {@link selected} prop. Clicking the button triggers the {@link onClick} callback.
 *
 * @param label - The text displayed on the button.
 * @param selected - Whether the button is currently selected.
 * @param onClick - Callback invoked when the button is clicked.
 */
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
          ? "bg-grayscale-5 text-brand-normal border-brand-normal"
          : "bg-grayscale-0 text-textColor-heading border-grayscale-30 hover:bg-grayscale-10 hover:border-grayscale-40",
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
