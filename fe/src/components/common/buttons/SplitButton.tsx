import type { ReactNode } from "react";

interface SplitButtonProps {
  left: ReactNode;
  right: ReactNode;
  onClickLeft?: () => void;
  onClickRight?: () => void;
  rightDisabled?: boolean;
}

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
