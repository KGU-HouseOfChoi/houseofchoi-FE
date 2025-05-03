"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Step1_Name from "./steps/Step1_Name";
import Step2_Birthday from "./steps/Step2_Birthday";
import Step3_Carrier from "./steps/Step3_Carrier";
import Step4_PhoneNumber from "./steps/Step4_PhoneNumber";
import Step5_VerificationCode from "./steps/Step5_VerificationCode";
import ConsentPopup from "./popup/ConsentPopup";
import BottomButton from "../common/Button/BottomButton";
import { sendSMS } from "@/apis/auth/auth";

export default function StepContainer() {
  const { step, phoneNumber } = useAuthStore();
  const router = useRouter();
  const [showConsent, setShowConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const isValidPhone = /^01[016789][0-9]{7,8}$/.test(phoneNumber);

  const handleBottomClick = () => {
    if (step === 4) {
      if (!isValidPhone) {
        alert("유효한 전화번호를 입력해주세요");
        return;
      }
      setShowConsent(true);
    }
  };

  const handleConsentAgree = async () => {
    setLoading(true);
    try {
      await sendSMS(phoneNumber, router);
      setShowConsent(false);
      router.push("/auth/verify");
    } catch (error) {
      console.error("인증번호 전송 실패:", error);
      alert("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (verifiedCode: string) => {
    console.log("✅ 인증 성공:", verifiedCode);
  };

  const renderTitle = () => {
    switch (step) {
      case 1:
        return "이름을 입력해주세요";
      case 2:
        return "주민등록번호 앞 7자리를 입력해주세요";
      case 3:
        return "통신사를 선택해주세요";
      case 4:
        return "휴대폰 번호를 입력해주세요";
      case 5:
        return "인증번호를 입력해주세요";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen w-full bg-white px-6 pt-[100px] pb-[150px] flex flex-col gap-10">
      <h2 className="text-2xl font-semibold text-black">{renderTitle()}</h2>

      {step === 5 ? (
        <Step5_VerificationCode
          code={code}
          setCode={setCode}
          error={error}
          setError={setError}
          onSuccess={handleSuccess}
          loading={loading}
        />
      ) : (
        <>
          {step >= 4 && <Step4_PhoneNumber />}
          {step >= 3 && <Step3_Carrier />}
          {step >= 2 && <Step2_Birthday />}
          {step >= 1 && <Step1_Name />}

          <BottomButton
            onClick={handleBottomClick}
            disabled={step < 4 || !isValidPhone || loading}
          >
            {loading ? "처리 중..." : "인증번호 받기"}
          </BottomButton>

          {showConsent && (
            <ConsentPopup
              onCancel={() => setShowConsent(false)}
              onConfirm={handleConsentAgree}
              loading={loading}
            />
          )}
        </>
      )}
    </div>
  );
}
