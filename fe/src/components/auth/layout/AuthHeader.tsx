"use client";

import { useRouter } from "next/navigation";

interface Props {
  progress: number;
}

export default function AuthHeader({ progress }: Props) {
  const router = useRouter();

  return (
    <div className="w-full px-6 pt-6 z-10 max-w-[414px] mx-auto">
      <div className="flex justify-between items-center text-lg text-textColor-sub mb-2">
        <h2 className="text-xl font-semibold font-pretendard text-textColor-heading">
          회원가입
        </h2>
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-1 text-lg text-textColor-sub hover:text-brand-hover font-pretendard"
        >
          <span>나중에 할게요</span>
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
      <div className="w-full bg-borderColor-default rounded-full h-2 overflow-hidden">
        <div
          className="bg-brand-normal h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
