"use client";

import { useState, useCallback, useEffect } from "react";
import { fetchProgramList, Program } from "@/apis/main/program";
import { getScheduleByDay, deleteSchedule } from "@/apis/schedule/schedule";
import { formatTime } from "@/utils/schedule/calendar";

export interface ScheduleItem {
  id: number;
  period: string;
  title: string;
  time: string;
  location: string;
}

const dayField: Record<string, keyof Program> = {
  월: "firDay",
  화: "secDay",
  수: "thrDay",
  목: "fouDay",
  금: "fivDay",
  토: "fivDay",
  일: "firDay",
};

/** 일정 조회 + 로컬 삭제 로직을 제공하는 커스텀 훅 */
export function useSchedules(selectedDay: string) {
  const [data, setData] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* 서버에서 일정 가져오기 */
  const fetchSchedules = useCallback(async (day: string) => {
    setLoading(true);
    setError(null);
    try {
      const [programs, scheduleData] = await Promise.all([
        fetchProgramList(),
        getScheduleByDay(day),
      ]);

      const programMap = new Map<number, Program>();
      programs.forEach((p) => programMap.set(p.id, p));

      const items: ScheduleItem[] = scheduleData.map((s: any) => {
        const p = programMap.get(s.programId);
        return {
          id: s.scheduleId,
          period: "2분기(4~6월)",
          title: s.name,
          time: p
            ? `${formatTime(p.startTime)} ~ ${formatTime(p.endTime)}`
            : "-",
          location: p?.centerName ?? "-",
        };
      });

      setData(items);
    } catch {
      setError("일정을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules(selectedDay);
  }, [selectedDay, fetchSchedules]);

  const remove = async (scheduleId: number) => {
    await deleteSchedule(scheduleId);
    setData((prev) => prev.filter((s) => s.id !== scheduleId));
  };

  return { data, loading, error, remove };
}
