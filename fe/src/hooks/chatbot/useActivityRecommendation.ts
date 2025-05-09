import { useState } from "react";
import { fetchChatRecommendation } from "@/apis/chatbot/chatRecommend";
import { Message, ChatRecommendResponse } from "@/types/chatbot";

export function useActivityRecommendation() {
  const [loading, setLoading] = useState(false);

  const weekly = (p: ChatRecommendResponse) => {
    const days = [p.fir_day, p.sec_day, p.thr_day, p.fou_day, p.fiv_day].filter(
      Boolean,
    );
    return days.length ? `매주 ${days.join("·")}` : "미정";
  };

  const fetchRecommendation = async (category: "indoor" | "outdoor") => {
    setLoading(true);
    try {
      const list = await fetchChatRecommendation({ category });
      if (!list.length) throw new Error("조건에 맞는 프로그램이 없습니다.");

      const program = list[Math.floor(Math.random() * list.length)]; //프로그램 랜덤 추천

      const msgs: Message[] = [
        {
          id: (Date.now() + 1).toString(),
          content: `프로그램명: ${program.name}`,
          type: "text",
          timestamp: new Date().toISOString(),
          isUser: false,
          profileUrl: "/images/Chatlogo.svg",
          sender: "",
        },
        {
          id: (Date.now() + 2).toString(),
          content: `일정: ${weekly(program)}\n가격: ${program.price}원\n장소: ${program.main_category}`,
          type: "text",
          timestamp: new Date().toISOString(),
          isUser: false,
          profileUrl: "/images/Chatlogo.svg",
          sender: "",
        },
      ];
      return msgs;
    } catch (e) {
      console.error("추천 정보 로딩 실패:", e);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { fetchRecommendation, loading };
}
