"use client";

import { CheckCircle } from "lucide-react";
import Button from "@/components/common/button/Button";
import FamilyLinkPopup from "@/components/family/popup/FamilyLinkPopup";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompletePage() {
  const router = useRouter();
  const [showFamilyPopup, setShowFamilyPopup] = useState(true);

  return (
    <main className="relative min-h-screen bg-white px-6 pt-[100px] pb-[150px] flex flex-col items-center justify-center gap-6 text-center">
      <CheckCircle size={72} className="text-brand-normal mb-2" />

      <h2 className="text-2xl font-bold text-black">
        회원가입이 완료되었어요 🎉
      </h2>
      <p className="text-base text-gray-600 leading-relaxed">
        이제 다양한 서비스를 자유롭게 이용하실 수 있어요.
        <br />
        어르심과 함께 건강한 활동을 시작해보세요!
      </p>

      <div className="absolute bottom-[54px] left-0 right-0 px-6 z-10">
        <Button
          fullWidth
          onClick={() => router.replace("/member/personality/Analysis")}
        >
          어르심 시작하기
        </Button>
      </div>

      <FamilyLinkPopup
        isOpen={showFamilyPopup}
        onClose={() => setShowFamilyPopup(false)}
      />
    </main>
  );
}
