"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import BottomPopup from "@/components/common/popup/BottomPopup";
import { consentClauses } from "@/data/consents";

interface ConsentPopupProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function ConsentPopup({
  isOpen,
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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  return (
    <BottomPopup isOpen={isOpen} onClose={onCancel}>
      <div className="relative max-w-[412px] bg-bgColor-default rounded-t-2xl p-6 space-y-4 max-h-[90vh]">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-bgColor-surface transition-colors"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-iconColor-sub" />
        </button>

        <div className="space-y-2">
          <p className="text-2xl font-semibold text-textColor-heading">
            서비스 이용을 위해
            <br />꼭 필요한 약관만 추렸어요!
          </p>
          <p className="text-base text-textColor-sub">
            아래 약관에 동의하시면
            <br />
            서비스를 이용하실 수 있습니다.
          </p>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-[240px] overflow-y-scroll rounded-xl border border-borderColor-default p-4 space-y-4 bg-bgColor-light"
        >
          <p className="text-xl font-semibold text-textColor-heading">
            KG모빌리언스 약관
          </p>

          {consentClauses.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-base font-semibold text-textColor-heading">
                {item.title}
              </p>
              <p className="text-sm text-textColor-sub leading-relaxed whitespace-pre-line">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-bgColor-surface text-textColor-heading font-semibold transition-colors hover:bg-bgColor-light"
            disabled={false}
          >
            취소
          </button>
          <button
            onClick={() => {
              if (!scrolledToBottom && scrollRef.current) {
                scrollRef.current.scrollTo({
                  top: scrollRef.current.scrollHeight,
                  behavior: "smooth",
                });
              } else {
                onConfirm();
              }
            }}
            disabled={loading}
            className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
              (!scrolledToBottom && loading) || loading
                ? "bg-borderColor-strong text-textColor-white cursor-not-allowed"
                : "bg-brand-normal text-textColor-white hover:bg-brand-hover active:bg-brand-active"
            }`}
          >
            {loading
              ? "전송 중..."
              : !scrolledToBottom
                ? "맨 아래로 이동"
                : "동의하고 진행"}
          </button>
        </div>
      </div>
    </BottomPopup>
  );
}
