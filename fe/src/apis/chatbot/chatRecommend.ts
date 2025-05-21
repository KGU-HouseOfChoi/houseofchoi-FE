import axiosAiInstance from "@/apis/common/axiosAiInstance";
import { ChatRecommendRequest, ChatRecommendResponse } from "@/types/chatbot";
import { handleApiError } from "@/utils/common/handleApiError";
import { AxiosError } from "axios";
import { normalizeSubCategory } from "@/utils/program/normalizeSubCategory";

export async function fetchChatRecommendation(
  req: ChatRecommendRequest
): Promise<ChatRecommendResponse[]> {
  try {
    const res = await axiosAiInstance.get<ChatRecommendResponse[]>(
      "/recommend",
      { params: { sub_category: req.sub_category } },
    );

        
    console.log("🔽 서버에서 받은 전체 프로그램:");
    res.data.forEach((item, index) => {
      console.log(
        `[${index}] 원본 sub_category: "${item.sub_category}" → 정제 후: "${normalizeSubCategory(item.sub_category)}"`
      );
    });

    console.log("🎯 요청한 sub_category:", req.sub_category);

    const filtered = res.data.filter(
      (item) => normalizeSubCategory(item.sub_category) === req.sub_category
    );

    console.log("✅ 필터링된 프로그램 수:", filtered.length);

    return filtered;

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
        "추천 정보 조회 중 오류"
      );
    }

    // ✅ 에러 발생 시 빈 배열 반환
    return [];
  }
}
