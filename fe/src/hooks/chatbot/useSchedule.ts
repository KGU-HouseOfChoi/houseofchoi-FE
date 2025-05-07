import { useState } from "react";
import { useRouter } from "next/navigation";

export function useSchedule() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const registerSchedule = async (scheduleData: {
    name: string;
    date: string;
    place: string;
  }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleData),
      });

      if (!res.ok) throw new Error("등록 실패");

      router.push("/calendar");
    } catch (err) {
      console.error("❌ 일정 등록 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  return { registerSchedule, loading };
}
