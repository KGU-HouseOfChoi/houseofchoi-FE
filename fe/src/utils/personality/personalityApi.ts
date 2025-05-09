import axiosAiInstance from "@/apis/common/axiosAiInstance";

export interface QuestionItem {
  id: number;
  question: string;
  choices: string[];
}

/**
 * 성향 질문 목록 가져오기
 */
export async function getPersonalityQuestions(): Promise<QuestionItem[]> {
  const { data } = await axiosAiInstance.get<{ data: QuestionItem[] }>(
    "/personality/questions",
  );
  if (!Array.isArray(data.data)) {
    throw new Error("서버 응답 형식이 올바르지 않습니다.");
  }
  return data.data;
}

/**
 * 성향 분석 결과 요청
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
