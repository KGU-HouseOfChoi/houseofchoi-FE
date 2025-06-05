import type { UnifiedProgram } from "@/types/program";

export function getFirstProgramDay(
  program: UnifiedProgram,
): string | undefined {
  return [
    program.firDay,
    program.secDay,
    program.thrDay,
    program.fouDay,
    program.fivDay,
  ].find(Boolean);
}
