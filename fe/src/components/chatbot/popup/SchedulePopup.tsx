// components/chatbot/ScheduleAddedPopup.tsx
"use client";

import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import CalendarIcon from "@/asset/icons/calendar-tick.svg";

interface ScheduleAddedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;                          
  subtitle?: string;
}

export default function ScheduleAddedPopup({
  isOpen,
  onClose,
  title = "일정을 캘린더에 추가했습니다.", 
  subtitle = "나의 일정에서 확인해보세요!",
}: ScheduleAddedPopupProps) {
  return (
    <BottomPopup isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        {/* 아이콘 */}
        <CalendarIcon className="w-10 h-10 text-brand-normal" />

        {/* 메시지 */}
        <p className="text-xl font-semibold whitespace-pre-line">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>

        {/* 확인 + 취소 버튼 */}
        <PopupButtons
          onConfirm={onClose}
          confirmLabel="확인"
          onCancel={onClose}
          cancelLabel="취소"
        />
      </div>
    </BottomPopup>
  );
}
