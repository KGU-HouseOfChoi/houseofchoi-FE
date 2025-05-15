import { UnifiedProgram } from "@/types/program";

export function formatProgramSchedule(program: UnifiedProgram): string {
  const daysArr = [
    program.firDay,
    program.secDay,
    program.thrDay,
    program.fouDay,
    program.fivDay,
  ].filter(Boolean);

  const days = daysArr.join(", ");

  const formatTime = (timeStr: string) => {
    const [h, m] = timeStr.split(":");
    return `${h}:${m}`;
  };

  const start = formatTime(program.startTime);
  const end = formatTime(program.endTime);

  const isValidTime = start !== "00:00" || end !== "00:00";

  if (!days && !isValidTime) return "시간 정보 없음";
  if (!days && isValidTime) return `${start}~${end}`;
  if (days && isValidTime) return `(${days}) ${start}~${end}`;
  return `(${days})`;
}
