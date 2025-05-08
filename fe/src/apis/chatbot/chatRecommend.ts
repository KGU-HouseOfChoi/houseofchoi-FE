import { ChatRecommendRequest, ChatRecommendResponse } from "@/types/chatbot";

export async function fetchChatRecommendation(
  req: ChatRecommendRequest,
): Promise<ChatRecommendResponse | null> {
  try {
    const response = await fetch("/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      throw new Error("API 요청 실패");
    }

    const data: ChatRecommendResponse[] = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("추천 정보 가져오기 실패:", error);
    return null;
  }
}
