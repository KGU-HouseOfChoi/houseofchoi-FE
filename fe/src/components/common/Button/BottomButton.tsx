"use client";

import { ReactNode } from "react";

interface BottomButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Renders a fixed-position button centered at the bottom of the viewport.
 *
 * The button displays the provided content and supports optional click handling and disabled state styling.
 *
 * @param children - The content to display inside the button.
 * @param onClick - Optional handler for button click events.
 * @param disabled - Whether the button is disabled. Defaults to false.
 */
export default function BottomButton({
  children,
  onClick,
  disabled = false,
}: BottomButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[414px] h-[74px] z-50 text-white text-xl font-semibold font-pretendard transition
        ${
          disabled
            ? "bg-grayscale-20 cursor-not-allowed"
            : "bg-brand-normal hover:bg-brand-hover active:bg-brand-active"
        }`}
    >
      {children}
    </button>
  );
}
