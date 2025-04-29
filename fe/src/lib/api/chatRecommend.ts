// lib/api/chatRecommend.ts
import { ChatRecommendRequest, ChatRecommendResponse } from "@/types/chatbot";

export async function fetchChatRecommendation(
  req: ChatRecommendRequest
): Promise<ChatRecommendResponse> {
  const { type } = req;

 
  return new Promise((resolve) => {
    setTimeout(() => {
      if (type === "indoor") {
        resolve({
          name: "요가 교실",
          date: "3월 20일",
          price: 0,
          place: "서울 복지관",
        });
      } else {
        resolve({
          name: "산책 모임",
          date: "3월 22일",
          price: 0,
          place: "한강 공원",
        });
      }
    }, 500); // 약간의 delay (선택사항)
  });
}
