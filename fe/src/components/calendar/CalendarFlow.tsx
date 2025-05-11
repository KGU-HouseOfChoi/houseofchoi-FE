"use client";

import { useState, useEffect, useCallback } from "react";
import BottomNavBar from "@/components/common/BottomNavBar";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarCard, { ScheduleItem } from "@/components/calendar/CalendarCard";
import { getScheduleByDay } from "@/apis/schedule/schedule";
import { fetchProgramList, Program } from "@/apis/main/program";
import axios from "axios";

/* ───── utils ───── */
const getTodayDayString = () =>
  ["일", "월", "화", "수", "목", "금", "토"][new Date().getDay()];

const pad = (n: number) => n.toString().padStart(2, "0");

/** HH:mm:ss 또는 {hour,minute} → HH:mm */
const formatTime = (
  t?: { hour?: number; minute?: number } | string
): string => {
  if (!t) return "-";

  // 문자열 "10:00:00"
  if (typeof t === "string") {
    const [hh, mm] = t.split(":");
    return `${hh}:${mm}`;
  }

  // 객체
  if (t.hour == null || t.minute == null) return "-";
  return `${pad(t.hour)}:${pad(t.minute)}`;
};

/* 요일 ↔ Program 요일필드 매핑 */
const dayField: Record<string, keyof Program> = {
  일: "firDay",
  월: "firDay",
  화: "secDay",
  수: "thrDay",
  목: "fouDay",
  금: "fivDay",
  토: "fivDay",
};

export default function CalendarFlow() {
  const [selectedDay, setSelectedDay] = useState(getTodayDayString());
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ───── fetch ───── */
  const fetchSchedules = useCallback(async (day: string) => {
    setLoading(true);
    setError(null);

    try {
      /* 1) 모든 프로그램 + 2) 내 일정 */
      const [programs, scheduleData] = await Promise.all([
        fetchProgramList(),
        getScheduleByDay(day),
      ]);

      /* id → Program 맵 */
      const programMap = new Map<number, Program>();
      programs.forEach((p) => programMap.set(p.id, p));

      const field = dayField[day];

      const formatted: ScheduleItem[] = scheduleData.map((s: any) => {
        const p = programMap.get(s.programId); // id 매핑

        const timeLabel =
          p && p[field] === day
            ? `${formatTime(p.startTime)} ~ ${formatTime(p.endTime)}`
            : "-";

        return {
          id: s.scheduleId,
          period: "2분기(4~6월)",
          title: s.name,
          time: timeLabel,
          location: p?.centerName ?? "-",
        };
      });

      setSchedules(formatted);
    } catch (err) {
      if (!(axios.isAxiosError(err) && err.response?.status === 404)) {
        setError("일정을 불러오는 데 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules(selectedDay);
  }, [selectedDay, fetchSchedules]);

  /* ───── UI ───── */
  return (
    <main className="flex flex-col items-center bg-bgColor-default">
      <CalendarHeader selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      <div className="w-full min-h-screen flex-1 px-4 pt-5 flex flex-col gap-5 overflow-auto">
        {loading && <p className="text-center">불러오는 중입니다...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && schedules.length === 0 && (
          <p className="text-center text-textColor-sub">일정이 없습니다.</p>
        )}
        {schedules.map((item) => (
          <CalendarCard key={item.id} item={item} />
        ))}
      </div>

      <BottomNavBar />
    </main>
  );
}
