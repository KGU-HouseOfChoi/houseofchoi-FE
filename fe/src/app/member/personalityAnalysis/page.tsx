"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getPersonalityQuestions,
  QuestionItem,
} from "@/utils/personality/personalityApi";
import QuestionNavigator from "@/components/personality/analysis/QuestionNavigator";
import CompletedMessage from "@/components/personality/analysis/CompletionNotice";
import PersonalityAnalysisHeader from "@/components/personality/PersonalityAnalysisHeader";
import PersonalityAnalysisIntroPopup from "@/components/personality/popup/PersonalityAnalysisIntroPopup";
import Toast from "@/components/common/Toast";
import axios from "axios";

export default function PersonalityAnalysisPage() {
  const router = useRouter();
  const [showIntroPopup, setShowIntroPopup] = useState(false);
  const [completedVersion, setCompletedVersion] = useState<
    "alreadyCompleted" | "completed" | null
  >(null);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    async function checkIfCompleted() {
      try {
        const data = await getPersonalityQuestions();
        console.log("✅ getPersonalityQuestions 응답:", data);

        if (!data || !Array.isArray(data)) {
          throw new Error("질문 데이터 형식이 올바르지 않습니다.");
        }

        setQuestions(data);
        setShowIntroPopup(true);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          console.log("✅ 409 Conflict → alreadyCompleted 메시지 표시");
          setCompletedVersion("alreadyCompleted");
        } else {
          console.error("질문 불러오기 에러:", error);
          setShowError(true);
        }
      }
    }

    checkIfCompleted();
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleExit = () => {
    router.replace("/guest");
  };

  return (
    <main className="relative min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      {!completedVersion && <PersonalityAnalysisHeader />}

      <div className="w-full max-w-[327px] flex flex-col items-center justify-center flex-1">
        {completedVersion ? (
          <CompletedMessage version={completedVersion} />
        ) : (
          questions.length > 0 && (
            <QuestionNavigator
              questions={questions}
              setIsCompleted={() => setCompletedVersion("completed")}
            />
          )
        )}
      </div>

      {!completedVersion && (
        <PersonalityAnalysisIntroPopup
          isOpen={showIntroPopup}
          onClose={() => setShowIntroPopup(false)}
        />
      )}

      {showError && (
        <Toast
          message="질문을 불러오는 중 오류가 발생했습니다. 다시 시도하거나 게스트로 이동하세요."
          actions={[
            { label: "다시 시도", onClick: handleRetry },
            { label: "나가기", onClick: handleExit },
          ]}
          onClose={handleExit}
        />
      )}
    </main>
  );
}
