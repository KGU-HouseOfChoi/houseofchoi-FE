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

  // 오늘 포함 5일간 목록
  const days = useMemo(
    () => Array.from({ length: 5 }, (_, i) => addDays(today, i)),
    [today],
  );

  const monthLabel = `${today.getFullYear()} . ${today.getMonth() + 1}`;

  return (
    <header className="sticky top-0 z-20 w-full bg-white shadow-[0px_3px_10px_rgba(142,142,142,0.25)]">
      <div className="mx-auto w-[325px] pt-4 pb-2">
        <div className="text-center text-2xl font-semibold text-textColor-heading">
          {monthLabel}
        </div>

        <div className="mt-2 grid grid-cols-5 gap-x-[6.25px] justify-items-center font-semibold text-textColor-heading">
          {days.map((d) => {
            const dayStr = dayNames[d.getDay()];
            const active = selectedDay === dayStr;

            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => onSelectDay(dayStr)}
                className={`flex h-[100px] w-[60px] flex-col items-center rounded-[15px] ${
                  active
                    ? "border-2 border-brand-normal bg-brand-normal/20"
                    : ""
                }`}
              >
                <span
                  className={`mt-3 text-2xl font-semibold ${
                    active ? "text-brand-normal" : ""
                  }`}
                >
                  {dayStr}
                </span>
                <span
                  className={`mt-1 text-2xl font-semibold ${
                    active ? "text-brand-normal" : ""
                  }`}
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
