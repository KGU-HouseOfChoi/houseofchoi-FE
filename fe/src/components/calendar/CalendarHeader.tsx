"use client";
import { FC, useMemo } from "react";
import { addDays, isSameDay } from "date-fns";
interface CalendarHeaderProps {
  selectedDay: string;
  onSelectDay: (d: string) => void;
}
const CalendarHeader: FC<CalendarHeaderProps> = ({
  selectedDay,
  onSelectDay,
}) => {
  const today = new Date();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const days = useMemo(
    () => Array.from({ length: 5 }, (_, i) => addDays(today, i)),
    [today]
  );
  const monthLabel = `${today.getFullYear()} . ${today.getMonth() + 1}`;
  return (
    <header className="w-full sticky top-0 bg-white z-20 shadow-[0px_3px_10px_rgba(142,142,142,0.25)]">
      <div className="mx-auto w-[325px] pt-4 pb-2">
        <div className="text-center text-2xl font-semibold text-textColor-heading">
          {monthLabel}
        </div>
        <div className="mt-2 grid grid-cols-5 gap-x-[6.25px] font-semibold justify-items-center text-textColor-heading">
          {days.map((d) => {
            const dayStr = dayNames[d.getDay()];
            const active = selectedDay === dayStr;
            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => onSelectDay(dayStr)}
                className={`flex flex-col items-center w-[60px] h-[100px] rounded-[15px] ${active ? "bg-brand-normal bg-opacity-20 border-2 border-brand-normal" : ""}`}
              >
                <span
                  className={`mt-3 text-2xl font-semibold ${active ? "text-brand-normal" : ""}`}
                >
                  {dayStr}
                </span>
                <span
                  className={`mt-1 text-2xl font-semibold ${active ? "text-brand-normal" : ""}`}
                >
                  {d.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
export default CalendarHeader;
