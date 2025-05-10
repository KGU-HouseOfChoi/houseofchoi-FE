import axiosAiInstance from "@/apis/common/axiosAiInstance";
import { ChatRecommendRequest, ChatRecommendResponse } from "@/types/chatbot";
import { handleApiError } from "@/utils/common/handleApiError";
import { AxiosError } from "axios";


export async function fetchChatRecommendation(
  req: ChatRecommendRequest,
): Promise<ChatRecommendResponse[]> {
  try {
    
    const kor = req.category === "indoor" ? "실내" : "실외";

    const res = await axiosAiInstance.get<ChatRecommendResponse[]>(
      "/recommend",
      { params: { sub_category: kor } },
    );

    return res.data;
  } catch (error: unknown) {
    
    if (error instanceof AxiosError && error.response) {
      const detail = error.response.data?.detail;
      const msg = Array.isArray(detail)
        ? detail.map((d: { msg: string }) => d.msg).join("\n")
        : (detail ?? "추천 정보 조회 중 오류");
      handleApiError(error, `추천 정보 조회 실패: ${msg}`);
    } else {
      handleApiError(
        error instanceof Error ? error : new Error("알 수 없는 오류"),
        "추천 정보 조회 중 오류",
      );
    }
    return [];
  }
}
