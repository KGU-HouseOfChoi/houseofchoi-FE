"use client";

import Image from "next/image";
import type { FC } from "react";

export type ScheduleItem = {
  id: number;
  period: string;
  title: string;
  time: string;
  location: string;
};

const CalendarCard: FC<{ item: ScheduleItem }> = ({ item }) => (
  <div className="w-full max-w-[329px] bg-white shadow-[0px_3px_10px_rgba(142,142,142,0.3)] rounded-2xl overflow-hidden mx-auto flex items-start justify-between p-4">
    <div className="flex-1 pr-3 space-y-1">
      <div className="text-md font-bold text-textColor-heading">
        {item.period}
      </div>
      <div className="text-xl font-bold text-textColor-heading">
        {item.title}
      </div>
      <div className="text-xl font-bold text-textColor-heading">
        {item.time}
      </div>
      <div className="text-md text-textColor-body">{item.location}</div>
    </div>
    <button>
      <Image src="/images/deleteicon.svg" alt="삭제" width={24} height={24} />
    </button>
  </div>
);

export default CalendarCard;
