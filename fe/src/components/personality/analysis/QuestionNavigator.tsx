"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postPersonalityAnalyze, QuestionItem } from "@/utils/personalityApi";
import Question from "./Question";
import ProgressIndicator from "./ProgressIndicator";
import SplitButton from "@/components/common/button/SplitButton";
import { handleApiError } from "@/utils/common/handleApiError";

interface QuestionNavigatorProps {
  questions: QuestionItem[];
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AnalysisResult {
  mbti: string;
  personality_tags: string[];
}

export default function QuestionNavigator({
  questions,
  setIsCompleted,
}: QuestionNavigatorProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setAnswers(Array(questions.length).fill(null));
    }
  }, [questions]);

  const handleSelect = (choice: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = choice;
    setAnswers(updatedAnswers);
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    try {
      const cleanedAnswers = answers.map(
        (ans) => ans?.match(/\(([AB])\)/)?.[1] ?? ans ?? "",
      );

      console.log("✅ 제출 answers (A/B만):", cleanedAnswers);

      if (cleanedAnswers.includes("")) {
        throw new Error("⚠️ 모든 질문에 답변해주세요.");
      }

      const result: AnalysisResult =
        await postPersonalityAnalyze(cleanedAnswers);
      console.log("✅ 분석 결과:", result);

      setIsCompleted(true); // ✅ 질문 다 풀고 제출하면 완료 상태 true로 변경
      router.push("/member");
    } catch (error) {
      handleApiError(error, "분석 요청에 실패했습니다.", router);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentAnswer = answers[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-textColor-heading">
        질문을 불러오는 중...
      </div>
    );
  }

  return (
    <>
      <ProgressIndicator current={currentIndex + 1} total={questions.length} />

      <Question
        question={questions[currentIndex].question}
        choices={questions[currentIndex].choices}
        selected={currentAnswer}
        onSelect={handleSelect}
      />

      <div className="absolute bottom-[54px] left-0 right-0 flex justify-center z-10 w-full">
        <div className="w-[331px]">
          {isFirst ? (
            <button
              onClick={handleNext}
              disabled={!currentAnswer}
              className={`w-full h-[58px] rounded-[16px] text-2xl font-semibold font-pretendard transition ${
                currentAnswer
                  ? "bg-brand-normal text-white hover:bg-brand-hover active:bg-brand-active"
                  : "bg-grayscale-20 text-textColor-body cursor-not-allowed"
              }`}
            >
              다음
            </button>
          ) : (
            <SplitButton
              left="이전"
              right={isLast ? "제출하기" : "다음"}
              onClickLeft={handlePrevious}
              onClickRight={handleNext}
              rightDisabled={!currentAnswer}
            />
          )}
        </div>
      </div>
    </>
  );
}
