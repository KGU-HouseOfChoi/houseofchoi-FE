"use client";

import { useRouter } from "next/navigation";

interface Props {
  current: number;
  total: number;
}

export default function OnboardingHeader({ current, total }: Props) {
  const router = useRouter();
  const progress = (current / total) * 100;

  return (
    <div className="absolute top-0 left-0 w-full px-6 pt-6 z-10 max-w-[414px] mx-auto">
      <div className="flex justify-between items-center text-lg text-gray-500 mb-2">
        <span>
          {current} / {total}
        </span>
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-1 text-lg text-gray-400 hover:text-brand-normal"
        >
          <span>건너뛰기</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-brand-normal h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
