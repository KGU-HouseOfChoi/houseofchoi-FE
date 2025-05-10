"use client";

import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import CalendarIcon from "@/asset/icons/calendar-tick.svg";

interface ScheduleAddedPopupProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  subtitle?: string;
}

export default function ScheduleAddedPopup({
  isOpen,
  onConfirm,
  onCancel,
  title = "일정을 캘린더에 추가했습니다.",
  subtitle = "나의 일정에서 확인해보세요!",
}: ScheduleAddedPopupProps) {
  return (
    <BottomPopup isOpen={isOpen} onClose={onCancel}>
      <div className="flex h-[330px] flex-col items-center justify-between py-6 text-center">
        <CalendarIcon className="h-12 w-12 text-brand-normal" />

        <div>
          <p className="whitespace-pre-line text-2xl font-semibold">{title}</p>
          <p className="mt-1 text-xl text-gray-500">{subtitle}</p>
        </div>

        <PopupButtons
          onConfirm={onConfirm}
          confirmLabel="일정 보러가기"
          onCancel={onCancel}
          cancelLabel="대화하기"
        />
      </div>
    </BottomPopup>
  );
}
