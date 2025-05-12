"use client";

import Image from "next/image";
import { useState, type FC } from "react";
import { deleteSchedule } from "@/apis/schedule/schedule";
import CalendarDeletePopup from "@/components/calendar/popup/CalendarDeletePopup";

export type ScheduleItem = {
  id: number;
  period: string;
  title: string;
  time: string;
  location: string;
};

interface Props {
  item: ScheduleItem;
  onDeleted: (id: number) => void;
}

const CalendarCard: FC<Props> = ({ item, onDeleted }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleDelete = async () => {
    await deleteSchedule(item.id);
    onDeleted(item.id);
  };

  return (
    <>
      <div className="w-full max-w-[329px] bg-white shadow-[0px_3px_10px_rgba(142,142,142,0.3)] rounded-2xl overflow-hidden mx-auto flex items-start justify-between p-4">
        <div className="flex-1 pr-3 space-y-1">
          <p className="text-md font-bold text-textColor-heading">
            {item.period}
          </p>
          <p className="text-xl font-bold text-textColor-heading">
            {item.title}
          </p>
          <p className="text-xl font-bold text-textColor-heading">
            {item.time}
          </p>
          <p className="text-md text-textColor-body">{item.location}</p>
        </div>
        <button onClick={() => setPopupOpen(true)} aria-label="일정 삭제">
          <Image src="/images/deleteicon.svg" alt="" width={24} height={24} />
        </button>
      </div>

      <CalendarDeletePopup
        title={item.title}
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default CalendarCard;
