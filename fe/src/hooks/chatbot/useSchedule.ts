"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerSchedule as apiRegisterSchedule } from "@/apis/chatbot/registerSchedule";
import type { Message } from "@/types/chatbot";

export function useSchedule() {
  const [loading, setLoading] = useState(false);
  const [programId, setProgramId] = useState<number | null>(null);
  const router = useRouter();

  const saveProgramId = (id: number) => setProgramId(id);

  const confirm = async (value: "yes" | "no"): Promise<Message[]> => {
    if (value === "no") {
      return [makeBotText("다른 궁금한 사항이 있다면 질문해주세요!")];
    }

    if (programId == null) {
      return [makeBotText("등록할 프로그램 ID를 찾지 못했어요.")];
    }

    setLoading(true);
    try {
      await apiRegisterSchedule(programId);
      return [];
    } catch (e) {
      console.error(" 일정 저장 실패", e);
      const errorMessage = (e as Error).message;
      if (errorMessage.includes("이미 등록된 일정입니다")) {
        return [
          makeBotText("이미 등록된 일정이에요! 다른 궁금한 점을 입력해주세요!"),
        ];
      }
      return [makeBotText(errorMessage)];
    } finally {
      setLoading(false);
    }
  };

  const goToCalendar = (day?: string) => {
    if (day) {
      router.push(`/member/calendar?day=${encodeURIComponent(day)}`);
    } else {
      router.push("/member/calendar");
    }
  };

  const makeBotText = (content: string): Message => ({
    id: Date.now().toString(),
    sender: "bot",
    profileUrl: "/images/Chatlogo.svg",
    type: "text",
    content,
    timestamp: new Date().toISOString(),
    isUser: false,
  });

  return {
    saveProgramId,
    confirm,
    loading,
    goToCalendar,
    programId,
  };
}
