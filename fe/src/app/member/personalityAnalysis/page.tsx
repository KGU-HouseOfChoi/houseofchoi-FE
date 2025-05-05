"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import QuestionNavigator from "@/components/personalityAnalysis/Analysis/QuestionNavigator";
import PersonalityAnalysisHeader from "@/components/personalityAnalysis/PersonalityAnalysisHeader";
import PersonalityAnalysisIntroPopup from "@/components/personalityAnalysis/Popup/PersonalityAnalysisIntroPopup";

export default function PersonalityAnalysisPage() {
  const { userId } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-grayscale-0 flex flex-col items-center justify-center px-6 text-center">
      <PersonalityAnalysisHeader />

      <div className="w-full max-w-md pt-[72px] pb-[108px] flex flex-col items-center justify-center">
        <QuestionNavigator userId={userId} />
      </div>

      <PersonalityAnalysisIntroPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </main>
  );
}
