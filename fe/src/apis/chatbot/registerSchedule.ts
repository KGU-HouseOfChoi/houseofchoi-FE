/* src/apis/chatbot/registerSchedule.ts */

import axiosAiInstance from "@/apis/common/axiosAiInstance"; // 공통 인스턴스
import { handleApiError } from "@/utils/common/handleApiError";
import { AxiosError } from "axios";

/**
 * 프로그램 ID로 일정 등록
 * 백엔드: POST /schedule  { program_id: number }
 * 성공 시 data 없음(204 or 200) → void 반환
 */
export async function registerSchedule(programId: number): Promise<void> {
  try {
    await axiosAiInstance.post("/recommend", { program_id: programId });
    /* 응답 본문이 필요 없다면 그대로 void */
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      const detail = error.response.data?.detail;
      const msg = Array.isArray(detail)
        ? detail.map((d: { msg: string }) => d.msg).join("\n")
        : detail ?? "일정 등록 요청 중 오류";
      handleApiError(error, `일정 등록 실패: ${msg}`);
    } else {
      handleApiError(
        error instanceof Error ? error : new Error("알 수 없는 오류"),
        "일정 등록 요청 중 오류",
      );
    }
    /* 실패 시 throw가 이미 handleApiError에 포함돼 있다면 여기선 return 생략 */
  }
}
