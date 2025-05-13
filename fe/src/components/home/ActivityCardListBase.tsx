"use client";

import ActivityCard from "./ActivityCard";
import CalendarAddPopup from "@/components/calendar/popup/CalendarAddPopup";
import LoginGuidePopup from "@/components/auth/popup/LoginGuidePopup";
import { Program } from "@/apis/main/program";
import { useAuth } from "@/hooks/auth/useAuth";
import { useState, useCallback } from "react";

type PopupStep = "confirm" | "success" | "duplicate";

interface Props {
  programs: Program[];
  isLoading: boolean;
  error: string | null;
  onReload: () => void;
}

export default function ActivityCardListBase({
  programs,
  isLoading,
  error,
  onReload,
}: Props) {
  const { isGuest } = useAuth();

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupStep, setPopupStep] = useState<PopupStep>("confirm");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleAddClick = useCallback(
    (program: Program) => {
      if (isGuest) {
        setShowLoginPopup(true);
        return;
      }

      setSelectedProgram(program);
      setPopupStep("confirm");
      setPopupOpen(true);
    },
    [isGuest],
  );

  const handleCalendarAdd = useCallback(async (programId: number) => {
    const { registerSchedule } = await import("@/apis/schedule/schedule");
    try {
      const success = await registerSchedule(programId);
      setPopupStep(success ? "success" : "duplicate");
    } catch {
      setPopupStep("duplicate");
    }
  }, []);

  return (
    <section className="flex flex-col items-center gap-5">
      {isLoading && (
        <div className="py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-brand-normal" />
        </div>
      )}

      {error && (
        <div className="py-5 text-center text-textColor-error">
          <p>{error}</p>
          <button onClick={onReload} className="mt-2 btn-primary">
            다시 시도
          </button>
        </div>
      )}

      {!isLoading && !error && programs.length === 0 && (
        <p className="py-10 text-textColor-sub">표시할 활동이 없습니다.</p>
      )}

      {!isLoading &&
        programs.map((p) => (
          <ActivityCard
            key={p.id}
            imageUrl={p.imageUrl || "/images/placeholder.svg"}
            title={p.name}
            location={p.centerName}
            onAddClick={() => handleAddClick(p)}
            onMoreClick={() => alert("더보기 기능은 아직 준비 중입니다!")}
          />
        ))}

      {!isLoading && programs.length > 0 && (
        <p className="mb-32 mt-8 text-center text-xl text-textColor-disabled">
          추천 활동은 여기까지입니다!
        </p>
      )}

      {selectedProgram && (
        <CalendarAddPopup
          title={selectedProgram.name}
          isOpen={popupOpen}
          step={popupStep}
          onClose={() => setPopupOpen(false)}
          onConfirm={() => handleCalendarAdd(selectedProgram.id)}
        />
      )}

      <LoginGuidePopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
    </section>
  );
}
