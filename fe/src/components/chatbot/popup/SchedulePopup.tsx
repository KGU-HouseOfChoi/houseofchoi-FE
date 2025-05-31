"use client";

import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import CalendarIcon from "@/asset/icons/calendar-tick.svg";
import { X } from "lucide-react";

interface ScheduleAddedPopupProps {
  isOpen: boolean;
  onConfirm: (day?: string) => void;
  onCancel: () => void;
  title?: string;
  subtitle?: string;
  day?: string;
}

export default function ScheduleAddedPopup({
  isOpen,
  onConfirm,
  onCancel,
  title = "일정을 캘린더에 추가했습니다.",
  subtitle = "나의 일정에서 확인해보세요!",
  day,
}: ScheduleAddedPopupProps) {
  return (
    <BottomPopup isOpen={isOpen} onClose={onCancel}>
      <div className="relative flex h-[330px] flex-col items-center justify-between py-6 text-center font-pretendard">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded hover:bg-bgColor-surface"
          aria-label="닫기"
          type="button"
        >
          <X className="w-6 h-6 text-iconColor-default" />
        </button>

        <CalendarIcon className="w-12 h-12 text-brand-normal" />

        <div>
          <p className="whitespace-pre-line text-2xl font-semibold text-textColor-heading">
            {title}
          </p>
          <p className="mt-1 text-xl text-textColor-sub">{subtitle}</p>
        </div>

        <PopupButtons
          onConfirm={() => onConfirm(day)}
          confirmLabel="일정 보러가기"
          onCancel={onCancel}
          cancelLabel="대화하기"
        />
      </div>
    </BottomPopup>
  );
}
