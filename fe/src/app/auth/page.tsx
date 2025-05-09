"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/auth/useSignup";
import { useAuthStore } from "@/store/useAuthStore";
import StepContainer from "@/components/auth/step/StepContainer";
import Step5_VerificationCode from "@/components/auth/step/Step5_VerificationCode";
import Toast from "@/components/common/Toast";
import AuthHeader from "@/components/auth/AuthHeader";

export default function AuthPage() {
  const router = useRouter();
  const { name, birthday, carrier, phoneNumber } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { handleSignUp, loading } = useSignup();

  const handleMoveToVerification = () => {
    setCurrentStep(2);
  };

  const handleSuccess = (verifiedCode: string) => {
    console.log("🔥 상태 확인", {
      name,
      birthday,
      phoneNumber,
      carrier,
      code: verifiedCode,
    });

    handleSignUp({
      code: verifiedCode,
      onSuccess: (status) => {
        console.log("가입 상태:", status);
        router.push("member/complete");
      },
      onError: (msg) => {
        setError(msg);
      },
    });
  };

  return (
    <div className="min-h-screen px-6 pt-[80px] bg-bgColor-default flex flex-col gap-10">
      <AuthHeader />

      {currentStep === 1 && <StepContainer onNext={handleMoveToVerification} />}

      {currentStep === 2 && (
        <div className="flex flex-col gap-10">
          <h2 className="text-2xl font-semibold text-textColor-heading">
            인증번호를 입력해주세요
          </h2>

          <Step5_VerificationCode
            code={code}
            setCode={setCode}
            error={error}
            setError={setError}
            onSuccess={handleSuccess}
            loading={loading}
          />

          {error && <Toast message={error} onClose={() => setError("")} />}
        </div>
      )}
    </div>
  );
}
