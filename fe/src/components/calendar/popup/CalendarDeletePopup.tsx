"use client";

import { useEffect, useState } from "react";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import CalendarIcon from "@/asset/icons/calendar-tick.svg";
import Toast from "@/components/common/Toast";

type Step = "confirm" | "success";

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

export default function CalendarDeletePopup({
  title,
  isOpen,
  onClose,
  onDelete,
}: Props) {
  const [step, setStep] = useState<Step>("confirm");
  const [loading, setLoading] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (isOpen) setStep("confirm");
  }, [isOpen]);

  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onDelete();
      setStep("success");
    } catch {
      setToastMessage("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toastOpen && (
        <Toast
          message={toastMessage}
          onClose={() => setToastOpen(false)}
          actions={[{ label: "확인", onClick: () => setToastOpen(false) }]}
        />
      )}

      <BottomPopup isOpen={isOpen} onClose={onClose}>
        {step === "confirm" ? (
          <div className="flex flex-col items-center text-center gap-6 pb-6">
            <CalendarIcon className="w-12 h-12 text-brand-normal" />
            <p className="text-xl font-bold text-textColor-heading leading-relaxed">
              {`${title} 일정을`} <br />
              삭제하시겠습니까?
            </p>
            <p className="text-md text-textColor-body">
              삭제 후에도 다시 추가할 수 있습니다!
            </p>

            <div
              className={
                loading ? "pointer-events-none opacity-50 w-full" : "w-full"
              }
            >
              <PopupButtons
                confirmLabel="삭제"
                cancelLabel="취소"
                onConfirm={handleDelete}
                onCancel={onClose}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-6 pb-6">
            <div className="w-12 h-12 bg-brand rounded-full" />
            <p className="text-xl font-semibold text-textColor-heading">
              일정이 삭제되었습니다!
            </p>
            <PopupButtons
              confirmLabel="확인"
              cancelLabel="닫기"
              onConfirm={onClose}
              onCancel={onClose}
            />
          </div>
        )}
      </BottomPopup>
    </>
  );
}
