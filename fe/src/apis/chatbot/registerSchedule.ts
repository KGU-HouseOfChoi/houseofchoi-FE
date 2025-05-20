import axiosAiInstance from "@/apis/common/axiosAiInstance";
import { handleApiError } from "@/utils/common/handleApiError";
import { AxiosError } from "axios";

export async function registerSchedule(programId: number): Promise<void> {
  try {
    await axiosAiInstance.post("/recommend", { program_id: programId });
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      const detail = error.response.data?.detail;
      const msg = Array.isArray(detail)
        ? detail.map((d: { msg: string }) => d.msg).join("\n")
        : (detail ?? "일정 등록 요청 중 오류");
      handleApiError(error, `일정 등록 실패: ${msg}`);
    } else {
      handleApiError(
        error instanceof Error ? error : new Error("알 수 없는 오류"),
        "일정 등록 요청 중 오류",
      );
    }
  }
}
