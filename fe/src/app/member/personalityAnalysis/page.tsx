"use client";

import { useState, useEffect } from "react";
import QuestionNavigator from "@/components/personalityAnalysis/Analysis/QuestionNavigator";
import PersonalityAnalysisHeader from "@/components/personalityAnalysis/PersonalityAnalysisHeader";
import PersonalityAnalysisIntroPopup from "@/components/personalityAnalysis/Popup/PersonalityAnalysisIntroPopup";

/**
 * Renders the personality analysis page with a header, question navigator, and an introductory popup.
 *
 * Displays the introductory popup automatically when the page loads. The popup can be dismissed by the user.
 */
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
