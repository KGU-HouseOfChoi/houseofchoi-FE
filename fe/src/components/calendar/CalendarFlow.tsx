"use client";

import { useState, useEffect } from "react";
import BottomNavBar from "@/components/common/BottomNavBar";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarCard, { ScheduleItem } from "@/components/calendar/CalendarCard";
import { getScheduleByDay } from "@/apis/schedule/schedule";
import { fetchProgramList, Program } from "@/apis/main/program";
import { getTodayDayString, formatTime } from "@/utils/schedule/calendar";
import axios from "axios";

export default function CalendarFlow() {
  const [selectedDay, setSelectedDay] = useState(getTodayDayString());
  const [data, setData] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ─── 데이터 패칭 ─── */
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const [programs, schedules] = await Promise.all([
          fetchProgramList(),
          getScheduleByDay(selectedDay),
        ]);

        const map = new Map<number, Program>();
        programs.forEach((p) => map.set(p.id, p));

        const items = schedules.map((s: any) => {
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
      } catch (err) {
        if (!(axios.isAxiosError(err) && err.response?.status === 404)) {
          setError("일정을 불러오는 데 실패했습니다.");
        }
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [selectedDay]);

  /* ─── 로컬 삭제 ─── */
  const removeLocal = (id: number) => {
    setData((prev) => prev.filter((v) => v.id !== id));
  };

  /* ─── UI ─── */
  return (
    <main className="flex flex-col min-h-screen bg-bgColor-default">
      <CalendarHeader selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      <div className="w-full flex-1 px-4 pt-5 flex flex-col gap-5 overflow-y-auto pb-28">
        {loading && <p className="text-center">불러오는 중입니다...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && data.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-textColor-sub">일정이 없습니다.</p>
          </div>
        )}

        {data.map((item) => (
          <CalendarCard key={item.id} item={item} onDeleted={removeLocal} />
        ))}

        {!loading && !error && data.length > 0 && (
          <p className="text-center text-textColor-sub mb-4">
            오늘의 일정은 여기까지 입니다!
          </p>
        )}
      </div>

      <BottomNavBar />
    </main>
  );
}
