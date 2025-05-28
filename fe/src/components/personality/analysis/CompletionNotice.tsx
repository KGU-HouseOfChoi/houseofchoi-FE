"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface PersonalityCompletedMessageProps {
  version?: "completed" | "alreadyCompleted" | "familyLinked";
  redirectTo?: string;
  delayMs?: number;
}

export default function CompletedMessage({
  version = "completed",
  redirectTo = "/member",
  delayMs = 3000,
}: PersonalityCompletedMessageProps) {
  const router = useRouter();

  const messages = {
    completed: {
      message: "성향 분석이 완료되었습니다!",
      description: "잠시 후 메인 페이지로 이동합니다.",
    },
    alreadyCompleted: {
      message: "인증을 완료했습니다!",
      description: "잠시 후 메인 페이지로 이동합니다.",
    },
    familyLinked: {
      message: "가족 연동이 완료되었습니다!",
      description: "잠시 후 메인 페이지로 이동합니다.",
    },
  };

  const { message, description } = messages[version];

  useEffect(() => {
    if (version === "completed") {
      localStorage.setItem("personalityCompleted", "true");
    }
    const timer = setTimeout(() => {
      router.replace(redirectTo);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [redirectTo, delayMs, router, version]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bgColor-default px-6 text-center pt-0">
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
