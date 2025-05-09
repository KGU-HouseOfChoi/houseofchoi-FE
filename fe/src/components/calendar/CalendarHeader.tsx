// components/calendar/CalendarHeader.tsx
"use client";

import { FC, useMemo } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";

const CalendarHeader: FC = () => {
  const today = new Date();

  const days = useMemo(
    () => Array.from({ length: 5 }, (_, i) => addDays(today, i)),
    [today]
  );

  const monthLabel = format(days[0], "yyyy . M", { locale: ko });

  return (
    <header className="w-full sticky top-0 bg-white z-20 shadow-[0px_3px_10px_rgba(142,142,142,0.25)]">
      <div className="mx-auto w-[325px] pt-4 pb-2">
        {/* 연·월 */}
        <div className="text-center text-2xl font-semibold text-textColor-heading">
          {monthLabel}
        </div>

        {/* 요일+날짜 그리드 */}
        <div
          className="
            mt-2
            grid grid-cols-5
            font-semibold justify-items-center
            text-textColor-heading
            gap-x-[6.25px]  /* (325 - 5*60) / 4 = 6.25px */
          "
        >
          {days.map((d) => {
            const isToday = isSameDay(d, today);
            return (
              <div
                key={d.toISOString()}
                className={`
                  flex flex-col items-center
                  w-[60px] h-[100px]
                  rounded-[15px]
                  ${
                    isToday
                      ? "bg-brand-normal bg-opacity-20 border-2 border-brand-normal"
                      : ""
                  }
                `}
              >
                <div
                  className={`
                    mt-3
                    text-2xl font-semibold
                    ${isToday ? "text-brand-normal" : ""}
                  `}
                >
                  {format(d, "EEE", { locale: ko })}
                </div>
                <div
                  className={`
                    mt-1
                    text-2xl font-semibold
                    ${isToday ? "text-brand-normal" : ""}
                  `}
                >
                  {format(d, "d", { locale: ko })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;
