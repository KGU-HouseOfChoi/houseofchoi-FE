"use client";

import { useEffect, useRef, useState } from "react";
import { consentClauses } from "@/data/consents";
import { X } from "lucide-react";

interface ConsentPopupProps {
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

/**
 * Displays a modal popup requiring users to review and consent to service terms before proceeding.
 *
 * The popup presents a scrollable list of consent clauses and enforces that users scroll to the bottom before allowing confirmation. Includes cancel and confirm actions, with dynamic button states and labels based on scroll and loading status.
 *
 * @param onCancel - Callback invoked when the popup is closed or canceled.
 * @param onConfirm - Callback invoked when the user confirms consent after scrolling to the bottom.
 * @param loading - Optional. Indicates if a loading state is active, disabling actions and updating button labels.
 *
 * @remark The confirm button scrolls to the bottom of the consent text if clicked before the user has reached the end, and only triggers confirmation once the bottom has been reached.
 */
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
      onClick={onCancel}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onCancel();
        }
      }}
      tabIndex={-1}
    >
      <div
        className="w-full bg-bgColor-default rounded-t-2xl p-6 space-y-4 max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded hover:bg-bgColor-surface"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-iconColor-sub" />
        </button>

        <p className="text-2xl font-medium text-textColor-heading text-left">
          서비스 이용을 위해
          <br />꼭 필요한 약관만 추렸어요!
        </p>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-[240px] overflow-y-scroll rounded-xl border border-borderColor-default p-4 space-y-4"
        >
          <p className="text-xl font-semibold text-textColor-heading">
            KG모빌리언스 약관
          </p>

          {consentClauses.map((item, idx) => (
            <div key={idx}>
              <p className="text-base font-medium text-textColor-sub">
                {item.title}
              </p>
              <p className="text-base text-textColor-sub mt-1">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-brand-normal text-white font-semibold transition-colors"
            disabled={loading}
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
                ? "bg-borderColor-strong text-white cursor-not-allowed"
                : "bg-brand-normal text-white hover:bg-brand-hover active:bg-brand-active"
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
    </div>
  );
}
