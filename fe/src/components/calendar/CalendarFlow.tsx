"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BottomNavBar from "@/components/common/BottomNavBar";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarCard from "@/components/calendar/CalendarCard";
import { useSchedules } from "@/hooks/schedule/useSchedules";
import { getTodayDayString } from "@/utils/schedule/calendar";
import { getUserName } from "@/apis/main/user";
import { useAuth } from "@/hooks/auth/useAuth";

export default function CalendarFlow() {
  const searchParams = useSearchParams();
  const dayParam = searchParams.get("day");
  const dateParam = searchParams.get("date");
  const initialDay = dayParam || dateParam || getTodayDayString();
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const { data, loading, error, remove } = useSchedules(selectedDay);

  const { isGuest, hydrated } = useAuth();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (dayParam || dateParam) {
      setSelectedDay(dayParam || dateParam || getTodayDayString());
    }
  }, [dayParam, dateParam]);

  useEffect(() => {
    if (!hydrated || isGuest) return;

    const fetchUserName = async () => {
      try {
        const name = await getUserName();
        setUserName(name);
      } catch (err) {
        console.error("이름 조회 실패:", err);
        setUserName(null);
      }
    };

    fetchUserName();
  }, [isGuest, hydrated]);

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
          <p className="text-center text-textColor-sub mb-6">
            {isGuest
              ? "일정은 여기까지 입니다!"
              : userName
                ? `${userName} 님의 일정은 여기까지 입니다!`
                : "일정은 여기까지 입니다!"}
          </p>
        )}
      </div>

      <BottomNavBar />
    </main>
  );
}
