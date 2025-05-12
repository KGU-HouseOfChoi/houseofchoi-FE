/* ──────────────────────────────  ActivityCardList.tsx  ───────────────────────────── */

"use client";

import { useEffect, useState, useCallback } from "react";
import ActivityCard from "./ActivityCard";
import CalendarPopup from "@/components/calendar/popup/CalendarAddPopup";
import LoginGuidePopup from "@/components/auth/popup/LoginGuidePopup";
import { fetchProgramList, Program } from "@/apis/main/program";
import { registerSchedule } from "@/apis/schedule/schedule";
import { useAuth } from "@/hooks/auth/useAuth";

type PopupStep = "confirm" | "success" | "duplicate";

export default function ActivityCardList() {
  const { hydrated, isGuest } = useAuth();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupStep, setPopupStep] = useState<PopupStep>("confirm");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchProgramList();
      setPrograms(data.slice(0, 5));
    } catch {
      setError("활동 목록을 불러오는 데 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hydrated) void loadData();
  }, [hydrated, loadData]);

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
    [isGuest]
  );

  const handleCalendarAdd = useCallback(async (programId: number) => {
    try {
      const success = await registerSchedule(programId);
      setPopupStep(success ? "success" : "duplicate");
    } catch (e: any) {
      setPopupStep(e?.response?.status === 409 ? "duplicate" : "duplicate");
    }
  }, []);

  if (!hydrated) {
    return (
      <section className="flex flex-col items-center gap-5 py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-normal" />
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center gap-5">
      {isLoading && (
        <div className="flex justify-center items-center w-full py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-normal" />
        </div>
      )}

      {error && (
        <div className="text-center py-5 text-textColor-error">
          <p>{error}</p>
          <button
            onClick={loadData}
            className="mt-2 px-4 py-2 bg-brand-normal text-white rounded-lg"
          >
            다시 시도
          </button>
        </div>
      )}

      {!isLoading && !error && programs.length === 0 && (
        <div className="text-center py-10 text-textColor-sub">
          표시할 활동이 없습니다.
        </div>
      )}

      {!isLoading &&
        programs.map((program) => (
          <ActivityCard
            key={program.id}
            imageUrl={program.imageUrl || "/images/placeholder.svg"}
            title={program.name}
            location={program.centerName}
            onAddClick={() => handleAddClick(program)}
            onMoreClick={() => alert("더보기 기능은 아직 준비 중입니다!")}
          />
        ))}

      {!isLoading && programs.length > 0 && (
        <div className="mt-8 mb-32 text-textColor-disabled text-center text-xl">
          추천 활동은 여기까지입니다!
        </div>
      )}

      {selectedProgram && (
        <CalendarPopup
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
