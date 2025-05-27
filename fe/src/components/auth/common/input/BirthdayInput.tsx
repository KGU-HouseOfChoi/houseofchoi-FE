"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";
import type { DebouncedFunc } from "lodash";

interface BirthdayInputProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  autoFocus?: boolean;
  debounceDelay?: number;
}

export default function BirthdayInput({
  value,
  onChange,
  error,
  autoFocus = false,
  debounceDelay = 0,
}: BirthdayInputProps) {
  const [front, setFront] = useState("");
  const [last, setLast] = useState("");
  const lastInputRef = useRef<HTMLInputElement>(null);

  const debouncedOnChange:
    | ((val: string) => void)
    | DebouncedFunc<(val: string) => void> = useMemo(() => {
    return debounceDelay > 0 ? debounce(onChange, debounceDelay) : onChange;
  }, [onChange, debounceDelay]);

  useEffect(() => {
    if (value.length === 7) {
      setFront(value.slice(0, 6));
      setLast(value.slice(6, 7));
    }
    return () => {
      if (debounceDelay > 0 && "cancel" in debouncedOnChange) {
        (debouncedOnChange as DebouncedFunc<(val: string) => void>).cancel?.();
      }
    };
  }, [value, debouncedOnChange, debounceDelay]);

  const handleChange = (f: string, l: string) => {
    debouncedOnChange(f + l);
  };

  const isValidDate = (yymmdd: string) => {
    if (yymmdd.length !== 6) return false;
    const year = parseInt(`19${yymmdd.slice(0, 2)}`);
    const month = parseInt(yymmdd.slice(2, 4));
    const day = parseInt(yymmdd.slice(4, 6));

    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const handleLastDigitChange = (val: string) => {
    setLast(val);
    handleChange(front, val);

    if (val.length === 1) {
      lastInputRef.current?.blur();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget) {
      e.currentTarget.focus();
      e.currentTarget.click();
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 mx-auto">
      <label className="text-xl text-textColor-body font-semibold">
        주민번호
      </label>

      <div className="flex gap-2 w-full">
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={front}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 6);
            setFront(val);

            if (e.target.value.includes("-") && val.length > 0) {
              lastInputRef.current?.focus();
              return;
            }

            handleChange(val, last);

            if (val.length === 6) {
              if (!isValidDate(val)) {
                console.error("❌ 유효하지 않은 날짜입니다.");
                return;
              }
              lastInputRef.current?.focus();
            }
          }}
          onTouchStart={handleTouchStart}
          autoFocus={autoFocus}
          className={`w-[calc(100%-80px)] h-[60px] px-4 rounded-xl border-2 text-base outline-none transition-colors bg-bgColor-default
            ${
              error
                ? "border-danger-50"
                : front || value
                  ? "border-brand-normal"
                  : "border-borderColor-default"
            }
            focus:border-brand-normal focus:outline-none
            placeholder:text-textColor-disabled
            touch-manipulation
            cursor-text
            select-text`}
          style={{
            WebkitTapHighlightColor: "transparent",
            WebkitTouchCallout: "none",
            WebkitUserSelect: "text",
            userSelect: "text",
          }}
          placeholder="예: 700123"
        />

        <span className="mt-[14px] text-textColor-heading">-</span>

        <input
          ref={lastInputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={last}
          onChange={(e) =>
            handleLastDigitChange(e.target.value.replace(/\D/g, "").slice(0, 1))
          }
          onTouchStart={handleTouchStart}
          className={`w-[60px] h-[60px] px-4 rounded-xl border-2 text-base text-center outline-none transition-colors bg-bgColor-default
            ${
              error
                ? "border-danger-50"
                : last || value
                  ? "border-brand-normal"
                  : "border-borderColor-default"
            }
            focus:border-brand-normal focus:outline-none
            placeholder:text-textColor-disabled
            touch-manipulation
            cursor-text
            select-text`}
          style={{
            WebkitTapHighlightColor: "transparent",
            WebkitTouchCallout: "none",
            WebkitUserSelect: "text",
            userSelect: "text",
          }}
          placeholder="1"
        />
      </div>

      {error && (
        <p className="text-danger-50 text-sm font-medium mt-1">{error}</p>
      )}
    </div>
  );
}
