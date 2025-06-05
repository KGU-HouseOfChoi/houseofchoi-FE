"use client";

import { Suspense } from "react";
import CalenderFlow from "@/components/calendar/CalendarFlow";

export default function CalenderPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <CalenderFlow />
    </Suspense>
  );
}
