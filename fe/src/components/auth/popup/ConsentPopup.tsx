"use client";

import { useEffect, useRef, useState } from "react";
import { consentClauses } from "@/data/consents";
import { X } from "lucide-react";

interface ConsentPopupProps {
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function ConsentPopup({
  onCancel,
  onConfirm,
  loading = false,
}: ConsentPopupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    if (isBottom) setScrolledToBottom(true);
  };

  useEffect(() => {
    setScrolledToBottom(false);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end"
      onClick={onCancel} // ✅ 배경 클릭 시 닫기
    >
      <div
        className="w-full max-w-md bg-white rounded-t-2xl p-6 space-y-4 max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()} // ✅ 내부 클릭은 이벤트 막기
      >
        {/* X 버튼 */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <p className="text-black text-2xl font-medium font-['Pretendard'] text-left">
          서비스 이용을 위해
          <br />꼭 필요한 약관만 추렸어요!
        </p>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-[240px] overflow-y-scroll rounded-xl border border-gray-200 p-4 space-y-4"
        >
          <p className="text-zinc-800 text-2xl font-normal font-['Pretendard']">
            KG모빌리언스 약관
          </p>

          {consentClauses.map((item, idx) => (
            <div key={idx}>
              <p className="text-neutral-500 text-xl font-normal font-['ABeeZee']">
                {item.title}
              </p>
              <p className="text-neutral-500 text-xl font-normal font-['ABeeZee'] mt-1">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-gray-200 text-black font-semibold"
            disabled={loading}
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            disabled={!scrolledToBottom || loading}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              !scrolledToBottom || loading
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-brand-normal text-white"
            }`}
          >
            {loading ? "전송 중..." : "동의하고 진행"}
          </button>
        </div>
      </div>
    </div>
  );
}
