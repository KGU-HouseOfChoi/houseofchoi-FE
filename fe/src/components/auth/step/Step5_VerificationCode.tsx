"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Toast from "@/components/common/Toast";
import { sendSMS } from "@/apis/auth/auth";
import { useAuthStore } from "@/store/useAuthStore";
import BottomButton from "@/components/common/button/BottomButton";

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
      setError("인증번호가 만료되었습니다. 다시 요청해주세요.");
    }
  }, [secondsLeft, setError]);

  const handleVerify = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 6);
    setCode(clean);
    setError("");
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget) {
      e.currentTarget.focus();
      e.currentTarget.click();
    }
  };

  const handleResend = async () => {
    try {
      await sendSMS(phoneNumber, router);
      setShowToast(true);
      setCode("");
      setError("");
      setSecondsLeft(180);
      startTimer();

      // 3초 후 토스트 자동으로 닫기
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ message: string }>;
        setError(
          err.response?.data?.message || "인증번호 전송에 실패했습니다.",
        );
      } else {
        setError("인증번호 전송에 실패했습니다.");
        console.error("SMS 전송 중 예상치 못한 오류:", error);
      }
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="verificationCode"
            className="text-xl text-textColor-body font-semibold"
          >
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
              onTouchStart={handleTouchStart}
              placeholder="6자리 입력"
              maxLength={6}
              className={`w-full h-[60px] px-4 rounded-xl border-2 text-base outline-none transition-colors bg-bgColor-default
                ${
                  error
                    ? "border-danger-50"
                    : code
                      ? "border-brand-normal"
                      : "border-borderColor-default"
                }
                focus:border-brand-normal focus:outline-none
                placeholder:text-textColor-disabled
                touch-manipulation
                cursor-text
                select-text`}
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'text',
                userSelect: 'text',
                caretColor: '#000000',
                WebkitAppearance: 'none',
                appearance: 'none'
              }}
              autoFocus
            />
            <span
              className={`absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium ${
                secondsLeft < 30
                  ? "text-danger-50 animate-pulse"
                  : "text-iconColor-default"
              }`}
            >
              {Math.floor(secondsLeft / 60)}:
              {String(secondsLeft % 60).padStart(2, "0")}
            </span>
          </div>

          {error && (
            <p className="text-danger-50 text-sm font-medium mt-1">{error}</p>
          )}
        </div>

        <button
          onClick={handleResend}
          className="px-3 py-2 border rounded-lg text-sm font-semibold transition-colors bg-brand-normal text-white border-brand-normal hover:bg-brand-hover active:bg-brand-active"
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
