"use client";

import { useState, useEffect } from "react";
import QuestionNavigator from "@/components/personalityAnalysis/Analysis/QuestionNavigator";
import PersonalityAnalysisHeader from "@/components/personalityAnalysis/PersonalityAnalysisHeader";
import PersonalityAnalysisIntroPopup from "@/components/personalityAnalysis/Popup/PersonalityAnalysisIntroPopup";

export default function PersonalityAnalysisPage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-bgColor-default flex flex-col items-center px-4 text-center">
      <PersonalityAnalysisHeader />

      <div className="w-full max-w-[327px] pt-20 pb-28 flex flex-col items-center">
        <QuestionNavigator />
      </div>

      <PersonalityAnalysisIntroPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </main>
  );
}
