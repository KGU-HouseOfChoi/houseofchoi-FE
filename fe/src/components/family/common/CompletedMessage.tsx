"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface FamilyCompletedMessageProps {
  redirectTo?: string;
  delayMs?: number;
  message?: string;
  description?: string;
}

export default function FamilyCompletedMessage({
  redirectTo = "/member",
  delayMs = 3000,
  message = "가족 추가가 완료되었습니다!",
  description = "이제 가족과 함께 일정을 공유할 수 있어요.\n잠시 후 메인 페이지로 이동합니다.",
}: FamilyCompletedMessageProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(redirectTo);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [redirectTo, delayMs, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bgColor-default px-6 text-center">
      <div className="flex flex-col items-center gap-4 max-w-md">
        <CheckCircle className="w-16 h-16 text-brand-normal" />

        <h2 className="text-2xl font-bold text-textColor-heading whitespace-pre-line leading-snug">
          {message}
        </h2>

        <p className="text-base text-textColor-sub whitespace-pre-line leading-relaxed">{description}</p>
      </div>
    </main>
  );
}
