import { useState, useEffect, useCallback } from "react";
import { fetchProgramList, Program } from "@/apis/main/program";
import { getScheduleByDay, deleteSchedule } from "@/apis/schedule/schedule";
import { formatTime } from "@/utils/schedule/calendar";
import { ScheduleItem, ScheduleResponse } from "@/types/schedule";

/** 선택한 요일의 일정 + 로컬 삭제를 제공하는 훅 */
export function useSchedules(day: string) {
  const [data, setData] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (d: string) => {
    setLoading(true);
    setError(null);
    try {
      const [programs, schedules] = await Promise.all([
        fetchProgramList(),
        getScheduleByDay(d),
      ]);

      const map = new Map<number, Program>();
      programs.forEach((p) => map.set(p.id, p));

      const items = (schedules as ScheduleResponse[]).map<ScheduleItem>((s) => {
        const p = map.get(s.programId);
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
    void load(day);
  }, [day, load]);

  const remove = async (scheduleId: number) => {
    await deleteSchedule(scheduleId);
    setData((prev) => prev.filter((s) => s.id !== scheduleId));
  };

  return { data, loading, error, remove };
}
