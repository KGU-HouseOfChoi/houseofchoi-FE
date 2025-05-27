"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface FamilyCompletedMessageProps {
  redirectTo: string;
  delayMs: number;
  message: string;
  description: string;
}

export default function FamilyCompletedMessage({
  redirectTo,
  delayMs,
  message,
  description
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

        <p className="text-base text-textColor-sub leading-relaxed whitespace-pre-line">
          {description?.replace(/<br\s*\/?>/gi, "\n")}
        </p>
      </div>
    </main>
  );
}
