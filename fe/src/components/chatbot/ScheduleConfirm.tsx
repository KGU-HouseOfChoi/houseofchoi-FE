import type { FC } from "react";

interface ScheduleConfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ScheduleConfirm: FC<ScheduleConfirmProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="w-full relative h-[170px] flex flex-col items-center justify-start pt-[13px] px-[27px] pb-3 box-border gap-[19px] text-left text-xl text-black font-pretendard">
      <div className="absolute inset-0 rounded-2xl bg-white z-0" />
      <div className="relative z-10">일정을 추가하시겠습니까?</div>
      <div className="w-[186px] flex flex-col items-start gap-2.5 z-10 text-darkslategray">
        <button
          onClick={onConfirm}
         className="w-full relative rounded-lg bg-brand-normal overflow-hidden flex flex-row items-center justify-center w-[186px] py-[7px]  box-border text-left text-[20px] text-darkslategray font-pretendard"
         >
          예
        </button>
        <button
          onClick={onCancel}
          className="w-full relative rounded-lg bg-grayscale-20 overflow-hidden flex flex-row items-center justify-center w-[186px] py-[7px] box-border text-left text-[20px] text-darkslategray font-pretendard">
        
          아니요
        </button>
      </div>
    </div>
  );
};

export default ScheduleConfirm;
