"use client";

import { useState, useEffect } from "react";
import QuestionNavigator from "@/components/personalityAnalysis/Analysis/QuestionNavigator";
import PersonalityAnalysisHeader from "@/components/personalityAnalysis/PersonalityAnalysisHeader";
import PersonalityAnalysisIntroPopup from "@/components/personalityAnalysis/Popup/PersonalityAnalysisIntroPopup";
import CompletedMessage from "@/components/personalityAnalysis/Analysis/CompletionNotice";
import { getPersonalityQuestions } from "@/utils/personalityAnalysis";

export default function PersonalityAnalysisPage() {
  const [showIntroPopup, setShowIntroPopup] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    async function checkIfCompleted() {
      try {
        const data = await getPersonalityQuestions();
        console.log("✅ getPersonalityQuestions 응답:", data);

        if (!Array.isArray(data)) {
          setIsCompleted(true);
        }
      } catch (error) {
        console.error("질문 불러오기 에러:", error);
      } finally {
        setShowIntroPopup(true);
      }
    }

    checkIfCompleted();
  }, []);

  return (
    <main className="relative min-h-screen bg-white flex flex-col items-center px-4 text-center">
      {!isCompleted && <PersonalityAnalysisHeader />}

      <div className="w-full max-w-[327px] flex flex-col items-center">
        {isCompleted ? (
          <CompletedMessage version="alreadyCompleted" />
        ) : (
          <QuestionNavigator setIsCompleted={setIsCompleted} />
        )}
      </div>

      {!isCompleted && (
        <PersonalityAnalysisIntroPopup
          isOpen={showIntroPopup}
          onClose={() => setShowIntroPopup(false)}
        />
      )}
    </main>
  );
}
