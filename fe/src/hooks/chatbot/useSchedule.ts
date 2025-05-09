// hooks/chatbot/useSchedule.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerSchedule as apiRegisterSchedule } from "@/apis/chatbot/registerSchedule";
import type { Message } from "@/types/chatbot";

export function useSchedule() {
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [programId, setProgramId] = useState<number | null>(null);
  const router = useRouter();

  /* activity 메시지 안의 id 저장 */
  const saveProgramId = (id: number) => setProgramId(id);

  /* “예/아니요” 클릭 처리 */
  const confirm = async (value: "yes" | "no"): Promise<Message[]> => {
    if (value === "no") {
      return [makeBotText("다른 궁금한 사항이 있다면 질문해주세요!")];
    }

    if (programId == null) {
      return [makeBotText("등록할 프로그램 ID를 찾지 못했어요.")];
    }

    setLoading(true);
    try {
      /* 📤 요청 직전 어떤 ID를 보내는지 확인 */
      console.log("📤 registerSchedule 요청 programId =", programId);

      const res = await apiRegisterSchedule(programId); // POST /schedule

      /* ✅ 성공 시 응답·ID 로그 */
      console.log("✅ 일정 저장 완료!", { programId, res });

      setPopupOpen(true); // 팝업 열기
      return [];          // 팝업이 대신 알려 주므로 챗 메시지는 안 돌려줌
    } catch (e) {
      console.error("❌ 일정 저장 실패", e);
      return [makeBotText((e as Error).message)];
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setPopupOpen(false);
    router.push("/member/calendar"); // 팝업 닫힌 뒤 캘린더로 이동
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
    popupOpen,
    closePopup,
    programId,        // 필요하면 외부에서도 확인 가능
  };
}
