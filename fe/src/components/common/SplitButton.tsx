import type { ReactNode } from "react";

interface SplitButtonProps {
  left: ReactNode;
  right: ReactNode;
  onClickLeft?: () => void;
  onClickRight?: () => void;
}

export default function SplitButton({
  left,
  right,
  onClickLeft,
  onClickRight,
}: SplitButtonProps) {
  return (
    <div className="w-[331px] h-[58px] rounded-[16px] flex overflow-hidden">
      {/* 왼쪽: 취소 */}
      <button
        onClick={onClickLeft}
        className="w-1/3 h-full px-4 bg-grayscale-10 text-textColor-body text-2xl font-semibold font-pretendard
          flex justify-center items-center gap-2
          hover:bg-gray-200 active:bg-gray-300"
      >
        {left}
      </button>

      {/* 오른쪽: 다음 */}
      <button
        onClick={onClickRight}
        className="w-2/3 h-full px-4 bg-brand-normal text-white text-2xl font-semibold font-pretendard
          flex justify-center items-center gap-2
          hover:bg-brand-hover active:bg-brand-active
          disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {right}
      </button>
    </div>
  );
}
