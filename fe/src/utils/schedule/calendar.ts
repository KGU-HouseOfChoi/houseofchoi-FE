export const getTodayDayString = () =>
  ["일", "월", "화", "수", "목", "금", "토"][new Date().getDay()];

const pad = (n: number) => n.toString().padStart(2, "0");

export const formatTime = (t?: { hour?: number; minute?: number } | string) => {
  if (!t) return "-";
  if (typeof t === "string") {
    const [hh, mm] = t.split(":");
    return `${hh}:${mm}`;
  }
  if (t.hour == null || t.minute == null) return "-";
  return `${pad(t.hour)}:${pad(t.minute)}`;
};
