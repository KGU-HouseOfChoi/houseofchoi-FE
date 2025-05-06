import axiosAiInstance from "@/apis/common/axiosAiInstance";

/**
 * 성향 질문 목록 가져오기
 */
export async function getPersonalityQuestions() {
  const res = await axiosAiInstance.get("/personality/analysis");
  return res.data;
}

/**
 * 성향 분석 결과 요청
 * @param answers A/B 배열 (길이 13)
 */
export async function postPersonalityAnalyze(answers: string[]) {
  const cleanedAnswers = answers.filter((ans) => ans === "A" || ans === "B");

  if (cleanedAnswers.length !== 13) {
    throw new Error("정확히 13개의 A/B 답변이 필요합니다.");
  }

  const res = await axiosAiInstance.post("/personality/analyze", {
    answers: cleanedAnswers,
  });

  return res.data;
}
