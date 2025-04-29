"use client";

import BottomNavBar from "@/components/common/BottomNavBar";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarCard, { ScheduleItem } from "@/components/calendar/CalendarCard";

const mockSchedule: ScheduleItem[] = [
  {
    id: 1,
    period: "3월 25일 (화) ~ 6월 1일 (화)",
    title: "탁구 교실",
    time: "13:00 ~ 14:00",
    location: "SK노인청솔복지관 / 3층 건강 운동실",
  },
  {
    id: 2,
    period: "4월 2일 (수) ~ 7월 10일 (수)",
    title: "요가 클래스",
    time: "10:00 ~ 11:00",
    location: "서초동 복지관 / 1층 다목적실",
  },
  {
    id: 3,
    period: "4월 9일 (월) ~ 12월 31일 (화)",
    title: "서예 교실",
    time: "15:00 ~ 16:30",
    location: "강남 문화센터 / 2층",
  },
];

export default function CalendarFlow() {
  return (
    <main className="flex flex-col items-center bg-bgColor-default">
      <CalendarHeader />

      <div className="w-full min-h-screen flex-1 px-4 pt-5 flex flex-col gap-5 overflow-auto">
        {mockSchedule.map((item) => (
          <CalendarCard key={item.id} item={item} />
        ))}
        <div className="mt-4 mb-32 text-textColor-disabled text-center text-lg">
          해당 일정은 여기까지입니다.
        </div>
      </div>

      <BottomNavBar />
    </main>
  );
}
