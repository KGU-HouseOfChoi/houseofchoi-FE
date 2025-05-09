import { useState } from "react";
import { fetchChatRecommendation } from "@/apis/chatbot/chatRecommend";
import type { Message, ChatRecommendResponse } from "@/types/chatbot";

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

      const program = list[Math.floor(Math.random() * list.length)];

      
      const baseId = Date.now().toString();

      const msgs: Message[] = [
        {
          id: `${baseId}-title`,                     
          sender: "bot",
          profileUrl: "/images/Chatlogo.svg",
          type: "text",
          content: `프로그램명: ${program.name}`,
          timestamp: new Date().toISOString(),
          isUser: false,
        },
        {
          id: `${baseId}-info`,                      
          sender: "bot",
          profileUrl: "/images/Chatlogo.svg",
          type: "activity",
          content: [
            `일정: ${weekly(program)}`,
            `가격: ${program.price}원`,
            `장소: ${program.main_category}`,
          ].join("\n"),
          programId: program.id,                     // 일정 등록용
          timestamp: new Date().toISOString(),
          isUser: false,
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
