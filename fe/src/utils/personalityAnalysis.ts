import axiosAiInstance from "@/apis/common/axiosAiInstance";

/**
 * 성향 질문 목록 가져오기
 */
export async function getPersonalityQuestions() {
  const res = await axiosAiInstance.get("/personality/questions");
  return res.data;
}

/**
 * 성향 분석 결과 요청
 * @param userId 사용자 ID
 * @param answers A/B 배열 (길이 13)
 */
export async function postPersonalityAnalyze(
  userId: string,
  answers: string[],
) {
  const cleanedAnswers = answers.filter((ans) => ans === "A" || ans === "B");

  if (cleanedAnswers.length !== 13) {
    throw new Error("정확히 13개의 A/B 답변이 필요합니다.");
  }

  const res = await axiosAiInstance.post("/personality/analyze", {
    user_id: userId,
    answers: cleanedAnswers,
  });

  return res.data;
}
