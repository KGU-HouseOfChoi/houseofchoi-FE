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

/**
 * A React component for entering the birthdate portion of a Korean resident registration number.
 *
 * Renders two input fields for the 6-digit birthdate (YYMMDD) and the following single digit, with validation and optional debounced change handling. Displays an error message if provided.
 *
 * @param value - The current 7-digit input value.
 * @param onChange - Callback invoked with the combined input value when it changes.
 * @param error - Optional error message to display below the inputs.
 * @param autoFocus - If true, autofocuses the first input field.
 * @param debounceDelay - Optional debounce delay in milliseconds for the onChange callback.
 *
 * @returns The rendered birthday input component.
 */
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

  return (
    <div className="w-full max-w-[327px] flex flex-col gap-2">
      <label className="text-xl text-textColor-sub">
        주민등록번호를 입력해주세요
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
          autoFocus={autoFocus}
          className={`w-full h-[60px] px-4 rounded-xl border-2 text-base outline-none transition-colors
            ${
              error
                ? "border-danger-50"
                : front
                  ? "border-brand-normal"
                  : "border-borderColor-default"
            }`}
          placeholder="예: 700123"
        />

        <span className="mt-[14px]">-</span>

        <input
          ref={lastInputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={last}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 1);
            setLast(val);
            handleChange(front, val);
          }}
          className={`w-[60px] h-[60px] px-4 rounded-xl border-2 text-base text-center outline-none transition-colors
            ${
              error
                ? "border-danger-50"
                : last
                  ? "border-brand-normal"
                  : "border-borderColor-default"
            }`}
          placeholder="1"
        />
      </div>

      {error && <p className="text-danger-50 text-sm font-medium">{error}</p>}
    </div>
  );
}
