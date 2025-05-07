"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getPersonalityQuestions,
  postPersonalityAnalyze,
} from "@/utils/personalityAnalysis";
import Question from "./Question";
import ProgressIndicator from "./ProgressIndicator";
import SplitButton from "@/components/common/Button/SplitButton";
import { handleApiError } from "@/utils/common/handleApiError";

interface QuestionItem {
  question: string;
  choices: string[];
}

export default function QuestionNavigator() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        const data = await getPersonalityQuestions();
        console.log("✅ 질문 개수:", data.length);
        setQuestions(data);
        setAnswers(Array(data.length).fill(null));
      } catch (error) {
        handleApiError(error, "질문을 불러오는 데 실패했습니다.", router);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [router]);

  const handleSelect = (choice: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = choice;
    setAnswers(updatedAnswers);
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      try {
        const cleanedAnswers = answers.map((ans) => {
          if (!ans) return "";
          const match = ans.match(/\(([AB])\)/);
          return match ? match[1] : "";
        });

        console.log("✅ 최종 제출 answers (A/B만):", cleanedAnswers);

        if (cleanedAnswers.includes("")) {
          throw new Error("⚠️ 제출 오류: 모든 질문에 답변해주세요.");
        }

        await postPersonalityAnalyze(cleanedAnswers);
        router.push("/member");
      } catch (error) {
        handleApiError(error, "분석 요청에 실패했습니다.", router);
      }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        질문을 불러오는 중...
      </div>
    );
  }

  if (!questions[currentIndex]) {
    return (
      <div className="flex justify-center items-center h-full">
        질문 데이터가 없습니다.
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
