import type { ReactNode } from "react";

interface SplitButtonProps {
  left: ReactNode;
  right: ReactNode;
  onClickLeft?: () => void;
  onClickRight?: () => void;
  rightDisabled?: boolean;
}

/**
 * Renders a split button with customizable left and right sections.
 *
 * Displays two adjacent buttons: the left button triggers {@link onClickLeft} when clicked, and the right button triggers {@link onClickRight} and can be disabled via {@link rightDisabled}. The content of each button is provided by the {@link left} and {@link right} props.
 *
 * @param left - Content to display in the left button.
 * @param right - Content to display in the right button.
 * @param onClickLeft - Optional callback for left button clicks.
 * @param onClickRight - Optional callback for right button clicks.
 * @param rightDisabled - If true, disables the right button.
 */
export default function SplitButton({
  left,
  right,
  onClickLeft,
  onClickRight,
  rightDisabled = false,
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
        disabled={rightDisabled}
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
