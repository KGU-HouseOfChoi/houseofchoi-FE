"use client";

import { useState } from "react";
import BottomNavBar from "@/components/common/BottomNavBar";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarCard from "@/components/calendar/CalendarCard";
import { useSchedules } from "@/hooks/schedule/useSchedules";
import { getTodayDayString } from "@/utils/schedule/calendar";

export default function CalendarFlow() {
  const [selectedDay, setSelectedDay] = useState(getTodayDayString());

  const { data, loading, error, remove } = useSchedules(selectedDay);

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
          <CalendarCard
            key={item.id}
            item={item}
            onDeleted={() => remove(item.id)}
          />
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
