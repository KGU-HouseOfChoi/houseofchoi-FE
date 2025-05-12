"use client";

import Image from "next/image";
import { useState } from "react";
import CalendarDeletePopup from "@/components/calendar/popup/CalendarDeletePopup";
import { ScheduleItem } from "@/types/schedule";

interface Props {
  item: ScheduleItem;
  onDeleted: (id: number) => Promise<void>;
}

export default function CalendarCard({ item, onDeleted }: Props) {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleDelete = async () => {
    await onDeleted(item.id);
  };

  return (
    <>
      <div className="w-full max-w-[329px] bg-white shadow-md rounded-2xl mx-auto flex items-start justify-between p-4">
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
}
