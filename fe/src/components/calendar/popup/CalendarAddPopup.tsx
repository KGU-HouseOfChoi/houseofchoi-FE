"use client";

import { useRouter } from "next/navigation";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import CalendarIcon from "@/asset/icons/calendar-tick.svg";

export type PopupStep = "confirm" | "success" | "duplicate";

interface CalendarPopupProps {
  title: string;
  isOpen: boolean;
  step: PopupStep;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CalendarPopup({
  title,
  isOpen,
  step,
  onClose,
  onConfirm,
}: CalendarPopupProps) {
  const router = useRouter();

  const goCalendar = () => {
    onClose();
    router.push("/member/calendar"); // 페이지 전환
  };

  return (
    <BottomPopup isOpen={isOpen} onClose={onClose}>
      {step === "confirm" ? (
        <div className="flex flex-col items-center text-center gap-6 pb-6">
          <CalendarIcon className="w-12 h-12 text-textColor-sub" />
          <p className="text-xl font-bold text-textColor-heading">
            {`${title} 일정을`} <br />
            추가하시겠습니까?
          </p>
          <p className="text-md text-textColor-body">
            추가 후 일정에서 확인해보세요!
          </p>
          <PopupButtons
            onConfirm={onConfirm}
            onCancel={onClose}
            confirmLabel="네, 좋아요"
            cancelLabel="아뇨, 더 둘러볼래요"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center text-center gap-6 pb-6">
          <div className="w-12 h-12 bg-brand rounded-full" />
          <p className="text-xl font-semibold text-textColor-heading">
            {step === "success"
              ? "일정이 추가되었습니다!"
              : "이미 등록된 일정입니다!"}
          </p>
          <p className="text-sm text-textColor-sub">
            다른 활동도 일정에 추가해보세요!
          </p>
          <PopupButtons
            onConfirm={goCalendar}
            onCancel={onClose}
            confirmLabel="내 일정 보러가기"
            cancelLabel="닫기"
          />
        </div>
      )}
    </BottomPopup>
  );
}
