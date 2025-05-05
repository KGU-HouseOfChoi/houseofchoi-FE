import { ChatRecommendRequest, ChatRecommendResponse } from "@/types/chatbot";

export async function fetchChatRecommendation(
  req: ChatRecommendRequest,
): Promise<ChatRecommendResponse> {
  const { category } = req;

  // 모의 환경에서만 사용하는 코드
  if (process.env.NODE_ENV === "development") {
    return new Promise((resolve) => {
      setTimeout(() => {
        const formatDate = (date: Date) =>
          date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

        if (category === "indoor") {
          resolve({
            name: "요가 교실",
            date: formatDate(new Date(2023, 2, 20)),
            price: 0,
            place: "서울 복지관",
          });
        } else {
          resolve({
            name: "산책 모임",
            date: formatDate(new Date(2023, 2, 22)),
            price: 0,
            place: "한강 공원",
          });
        }
      }, 500);
    });
  }

  // 실제 API 호출 로직
  try {
    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      throw new Error("API 요청 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("추천 정보 가져오기 실패:", error);
    throw error;
  }
}
