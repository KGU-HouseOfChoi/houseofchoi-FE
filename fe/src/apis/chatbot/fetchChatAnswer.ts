import axiosAiInstance from "@/apis/common/axiosAiInstance";
import { handleApiError } from "@/utils/common/handleApiError";
import { AxiosError } from "axios";

export async function fetchChatAnswer(message: string): Promise<string> {
  try {
    const res = await axiosAiInstance.post("/chat", {
      message,
    });

    const { chatbot_response } = res.data;

    if (!chatbot_response || typeof chatbot_response !== "string") {
      throw new Error("GPT 응답 형식이 올바르지 않습니다.");
    }

    return chatbot_response;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      const detail = error.response.data.detail;

      if (detail) {
        const errorMsg = Array.isArray(detail)
          ? detail.map((d: { msg: string }) => d.msg).join("\n")
          : String(detail);

        handleApiError(error, `GPT 응답 실패: ${errorMsg}`);
      } else {
        handleApiError(error, "GPT 응답 중 문제가 발생했습니다.");
      }
    } else if (error instanceof Error) {
      handleApiError(error, error.message);
    } else {
      handleApiError(
        new Error("알 수 없는 오류 발생"),
        "GPT 응답 중 문제가 발생했습니다.",
      );
    }
  }
}
