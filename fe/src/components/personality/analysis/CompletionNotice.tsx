"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface CompletedMessageProps {
  version?: "completed" | "alreadyCompleted";
  redirectTo?: string;
  delayMs?: number;
}

export default function CompletedMessage({
  version = "completed",
  redirectTo = "/member",
  delayMs = 5000,
}: CompletedMessageProps) {
  const router = useRouter();

  const messages = {
    completed: {
      message: "성향 분석이 완료되었습니다!",
      description: "잠시 후 메인 페이지로 이동합니다.",
    },
    alreadyCompleted: {
      message: "이미 성향 분석을 완료한 \n 사용자입니다.",
      description: "잠시 후 메인 페이지로 이동합니다.",
    },
  };

  const { message, description } = messages[version];

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

        <p className="text-base text-textColor-sub leading-relaxed">
          {description}
        </p>
      </div>
    </main>
  );
}
