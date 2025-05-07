"use client";

import { useSignup } from "@/hooks/auth/useSignup";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Step5_VerificationCode from "@/components/auth/steps/Step5_VerificationCode";
import { useRouter } from "next/navigation";
import Toast from "@/components/common/Toast";

export default function VerifyPage() {
  const router = useRouter();
  const { name, birthday, carrier, phoneNumber } = useAuthStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { handleSignUp, loading } = useSignup();

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
        if (status === "EXISTING_USER") {
          router.push("/member/home");
        } else {
          router.push("/auth/complete");
        }
      },
      onError: (msg) => {
        setError(msg);
      },
    });
  };

  return (
    <div className="min-h-screen px-6 pt-[100px] pb-[150px] bg-white flex flex-col gap-10">
      <h2 className="text-2xl font-semibold text-black">
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
  );
}
