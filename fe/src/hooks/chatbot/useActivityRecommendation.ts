import { useState } from "react";
import { fetchChatRecommendation } from "@/apis/chatbot/chatRecommend";
import { Message } from "@/types/chatbot";

export function useActivityRecommendation() {
  const [loading, setLoading] = useState(false);

  // ✅ 1️⃣ 요일 조합 헬퍼 함수
  const formatWeeklyDays = (program: any) => {
    const days = [
      program?.fir_day,
      program?.sec_day,
      program?.thr_day,
      program?.fou_day,
      program?.fiv_day,
    ].filter(Boolean); // 빈 값 제거

    return days.length > 0 ? `매주 ${days.join("·")}` : "미정";
  };

  const fetchRecommendation = async (category: "indoor" | "outdoor") => {
    setLoading(true);
    try {
      const program = await fetchChatRecommendation({
        category,
      });

      // ✅ 2️⃣ 요일 정보 포맷
      const weeklySchedule = formatWeeklyDays(program);

      const responseMsgs: Message[] = [
        {
          id: (Date.now() + 1).toString(),
          content: `🏷️ 추천 프로그램: ${program?.name}`,
          type: "text",
          timestamp: new Date().toISOString(),
          isUser: false,
          profileUrl: "/images/Chatlogo.svg",
          sender: "",
        },
        {
          id: (Date.now() + 2).toString(),
          content: `일정: ${weeklySchedule}\n가격: ${program?.price}원\n장소: ${program?.main_category}`,
          type: "text",
          timestamp: new Date().toISOString(),
          isUser: false,
          profileUrl: "/images/Chatlogo.svg",
          sender: "",
        },
      ];

      setLoading(false);
      return responseMsgs;
    } catch (error) {
      console.error("추천 정보 로딩 실패:", error);
      setLoading(false);
      return [];
    }
  };

  return {
    fetchRecommendation,
    loading,
  };
}
