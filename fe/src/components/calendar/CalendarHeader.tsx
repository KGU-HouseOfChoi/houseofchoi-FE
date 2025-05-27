"use client";

import { FC, useMemo } from "react";
import { addDays } from "date-fns";
import BackButton from "@/components/common/button/BackButton";
import { useAuth } from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";

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
  const { isGuest } = useAuth();
  const router = useRouter();

  const days = useMemo(() => {
    const result: Date[] = [];
    let i = 0;
    while (result.length < 7) {
      const d = addDays(today, i++);
      result.push(d);
    }
    return result;
  }, [today]);

  const monthLabel = `${today.getFullYear()} . ${today.getMonth() + 1}`;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(isGuest ? "/guest" : "/member");
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-white shadow-[0px_3px_10px_rgba(142,142,142,0.25)]">
      <div className="w-full max-w-[400px] mx-auto pt-4 pb-2 flex items-center px-4 relative">
        <BackButton
          onClick={handleBack}
          className="mr-4 flex-shrink-0 z-10"
          iconSize={40}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl font-bold text-textColor-heading w-max pointer-events-none select-none">
          {monthLabel}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-x-2 sm:gap-x-4 justify-items-center mb-2 font-bold px-2">
        {days.map((d) => {
          const dayStr = dayNames[d.getDay()];
          const active = selectedDay === dayStr;
          const isSunday = d.getDay() === 0;
          const isSaturday = d.getDay() === 6;

          return (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => onSelectDay(dayStr)}
              className={`flex flex-col items-center justify-center w-14 h-16 sm:w-16 sm:h-20 rounded-xl transition-all
                ${
                  active
                    ? "border-2 border-brand-normal font-extrabold text-brand-normal bg-brand-normal/10"
                    : isSunday
                      ? "text-red-500"
                      : isSaturday
                        ? "text-blue-500"
                        : "text-textColor-heading"
                }
              `}
              aria-label={`${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${dayStr}요일`}
              style={{ fontSize: "1.125rem", minHeight: 56 }}
            >
              <span className="text-lg sm:text-xl font-bold">{dayStr}</span>
              <span className="text-lg sm:text-xl font-bold">
                {d.getDate()}
              </span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

export default CalendarHeader;
