import type { ReactNode } from "react";

interface SplitButtonProps {
  left: ReactNode;
  right: ReactNode;
  onClickLeft?: () => void;
  onClickRight?: () => void;
}

/**
 * Renders a split button with customizable left and right sections.
 *
 * Displays two adjacent buttons within a styled container. The left and right buttons can display custom content and have independent click handlers.
 *
 * @param left - Content to display in the left button.
 * @param right - Content to display in the right button.
 * @param onClickLeft - Optional handler for left button clicks.
 * @param onClickRight - Optional handler for right button clicks.
 */
export default function SplitButton({
  left,
  right,
  onClickLeft,
  onClickRight,
}: SplitButtonProps) {
  return (
    <div className="w-[331px] h-[58px] rounded-[16px] flex overflow-hidden">
      <button
        onClick={onClickLeft}
        className="w-1/3 h-full px-4 bg-grayscale-10 text-textColor-body text-2xl font-semibold font-pretendard
          flex justify-center items-center gap-2
          hover:bg-grayscale-20 active:bg-grayscale-30"
      >
        {left}
      </button>

      <button
        onClick={onClickRight}
        className="w-2/3 h-full px-4 bg-brand-normal text-white text-2xl font-semibold font-pretendard
          flex justify-center items-center gap-2
          hover:bg-brand-hover active:bg-brand-active
          disabled:bg-grayscale-30 disabled:cursor-not-allowed"
      >
        {right}
      </button>
    </div>
  );
}
