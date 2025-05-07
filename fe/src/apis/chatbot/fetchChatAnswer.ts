import axiosAiInstance from "@/apis/common/axiosAiInstance";
import { handleApiError } from "@/utils/common/handleApiError";

export async function fetchChatAnswer(
  userId: string,
  message: string,
): Promise<string> {
  try {
    const res = await axiosAiInstance.post("/chat/chat", {
      message,
    });

    const { chatbot_response } = res.data;

    if (!chatbot_response || typeof chatbot_response !== "string") {
      throw new Error("GPT 응답 형식이 올바르지 않습니다.");
    }

    return chatbot_response;
  } catch (error: any) {
    const detail = error?.response?.data?.detail;

    if (detail) {
      const errorMsg = Array.isArray(detail)
        ? detail.map((d: any) => d.msg).join("\n")
        : String(detail);
      handleApiError(error, `GPT 응답 실패: ${errorMsg}`);
    } else {
      handleApiError(error, "GPT 응답 중 문제가 발생했습니다.");
    }

    throw error;
  }
}
