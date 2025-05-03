"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/common/Toast";
import { sendSMS } from "@/apis/auth/auth";
import { useAuthStore } from "@/store/useAuthStore";
import BottomButton from "@/components/common/Button/BottomButton";
import type { AxiosError } from "axios";

interface Step5VerificationProps {
  code: string;
  setCode: (val: string) => void;
  error: string;
  setError: (msg: string) => void;
  onSuccess: (verifiedCode: string) => void;
  loading: boolean;
}

export default function Step5_VerificationCode({
  code,
  setCode,
  error,
  setError,
  onSuccess,
  loading,
}: Step5VerificationProps) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(180);
  const [canResend, setCanResend] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { phoneNumber } = useAuthStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((sec) =>
        sec <= 1 ? (clearInterval(intervalRef.current!), 0) : sec - 1,
      );
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current!);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      setCanResend(true);
      setCode("");
      setError("인증번호가 만료되었습니다. 다시 요청해주세요.");
    }
  }, [secondsLeft, setCode, setError]);

  const handleVerify = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 6);
    setCode(digits);

    if (error && digits.length < 6) {
      setError("");
    }
  };

  const handleResend = async () => {
    try {
      await sendSMS(phoneNumber, router);
      setShowToast(true);
      setCode("");
      setError("");
      setSecondsLeft(180);
      setCanResend(false);
      startTimer();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data?.message || "인증번호 전송에 실패했습니다.");
    }
  };

  const handleClickSubmit = () => {
    const currentInput = inputRef.current?.value || "";

    if (currentInput.length !== 6) {
      setError("6자리 인증번호를 입력해주세요");
      return;
    }

    onSuccess(currentInput);
  };

  const isSubmitDisabled =
    (inputRef.current?.value || "").length !== 6 || loading;

  return (
    <>
      <div className="flex flex-col gap-4 pb-[70px]">
        <div className="flex flex-col gap-2">
          <label htmlFor="verificationCode" className="text-xl text-gray-500">
            인증번호
          </label>

          <div className="relative">
            <input
              id="verificationCode"
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              value={code}
              onChange={(e) => handleVerify(e.target.value)}
              placeholder="6자리 입력"
              maxLength={6}
              className={`w-full px-4 py-4 pr-[80px] rounded-[16px] border-2 text-base outline-none transition
                ${error ? "border-red-400" : code ? "border-brand-normal" : "border-gray-300"}`}
              autoFocus
            />
            <span
              className={`absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium ${
                secondsLeft < 30
                  ? "text-red-500 animate-pulse"
                  : "text-gray-500"
              }`}
            >
              {Math.floor(secondsLeft / 60)}:
              {String(secondsLeft % 60).padStart(2, "0")}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          disabled={!canResend}
          onClick={handleResend}
          className={`px-3 py-2 border rounded-md text-sm font-semibold transition
            ${
              canResend
                ? "text-brand-normal border-brand-normal hover:bg-brand-normal hover:text-white"
                : "text-gray-400 border-gray-300 cursor-not-allowed"
            }`}
        >
          인증번호 다시 받기
        </button>

        {showToast && (
          <Toast
            message="인증번호를 다시 전송했어요"
            onClose={() => setShowToast(false)}
          />
        )}
      </div>

      <BottomButton onClick={handleClickSubmit} disabled={isSubmitDisabled}>
        {loading ? "처리 중..." : "인증 완료"}
      </BottomButton>
    </>
  );
}
