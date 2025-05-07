// utils/personalityAnalysis.ts
import axiosAiInstance from "@/apis/common/axiosAiInstance";

/**
 * 성향 질문 목록 또는 분석 완료 결과 가져오기
 */
export async function getPersonalityQuestions() {
  const res = await axiosAiInstance.get("/personality/analysis");
  console.log("✅ getPersonalityQuestions 응답:", res.data);

  if (res.data && "mbti" in res.data) {
    return res.data; // { mbti: string, personality_tags: string[] }
  }

  if (res.data && Array.isArray(res.data.data)) {
    return res.data.data; // QuestionItem[]
  }

  return [];
}

/**
 * 성향 분석 결과 요청
 * @param answers A/B 배열 (길이 13)
 */
export async function postPersonalityAnalyze(answers: string[]) {
  const isValid =
    answers.length === 13 && answers.every((ans) => ans === "A" || ans === "B");

  if (!isValid) {
    throw new Error("정확히 13개의 A/B 답변이 필요합니다.");
  }

  const res = await axiosAiInstance.post("/personality/analyze", { answers });

  return res.data; // { mbti: string, personality_tags: string[] }
}
