import axiosAiInstance from "@/apis/common/axiosAiInstance";

/**
 * Retrieves the list of personality analysis questions from the API.
 *
 * @returns The response data containing personality questions.
 */
export async function getPersonalityQuestions() {
  const res = await axiosAiInstance.get("/personality/analysis");
  return res.data;
}

/**
 * Submits a set of 13 "A" or "B" answers for personality analysis and returns the analysis result.
 *
 * @param answers - An array of strings representing answers, each being "A" or "B".
 * @returns The result of the personality analysis from the API.
 *
 * @throws {Error} If the filtered {@link answers} array does not contain exactly 13 "A" or "B" values.
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
