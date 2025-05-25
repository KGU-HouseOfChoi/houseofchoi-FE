"use client";

import { FC, useMemo } from "react";
import { addDays } from "date-fns";

interface CalendarHeaderProps {
  selectedDay: string;
  onSelectDay: (d: string) => void;
}

const CalendarHeader: FC<CalendarHeaderProps> = ({
  selectedDay,
  onSelectDay,
}) => {
  const today = useMemo(() => new Date(), []);
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const days = useMemo(() => {
    const result: Date[] = [];
    let i = 0;
    while (result.length < 6) {
      const d = addDays(today, i++);
      if (d.getDay() !== 0) {
        result.push(d);
      }
    }
    return result;
  }, [today]);

  const monthLabel = `${today.getFullYear()} . ${today.getMonth() + 1}`;

  return (
    <header className="sticky top-0 z-20 w-full bg-white shadow-[0px_3px_10px_rgba(142,142,142,0.25)]">
      <div className="mx-auto w-[340px] pt-4 pb-2">
        <div className="text-center text-2xl font-semibold text-textColor-heading">
          {monthLabel}
        </div>

        <div className="mt-6 grid grid-cols-6 gap-x-[10px] justify-items-center mb-2">
          {days.map((d) => {
            const dayStr = dayNames[d.getDay()];
            const active = selectedDay === dayStr;

            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => onSelectDay(dayStr)}
                className={`flex flex-col items-center justify-center w-14 h-18 rounded-xl transition-all ${
                  active
                    ? "border-2 border-brand-normal text-brand-normal font-extrabold"
                    : "text-textColor-heading"
                }`}
                aria-label={`${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${dayStr}요일`}
              >
                <span className="text-[20px]">{dayStr}</span>
                <span className="text-[24px]">{d.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;
