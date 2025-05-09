"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import debounce from "lodash/debounce";
import type { DebouncedFunc } from "lodash";

interface Props {
  label: string;
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  error?: string;
  type?: string;
  inputMode?:
    | "text"
    | "search"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  pattern?: string;
  autoFocus?: boolean;
  debounceDelay?: number;
  maxLength?: number;
}

export default function FormInput({
  label,
  value,
  placeholder,
  onChange,
  error,
  type = "text",
  inputMode,
  pattern,
  maxLength,
  autoFocus = false,
  debounceDelay = 0,
}: Props) {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedOnChange:
    | ((val: string) => void)
    | DebouncedFunc<(val: string) => void> = useMemo(() => {
    return debounceDelay > 0 ? debounce(onChange, debounceDelay) : onChange;
  }, [onChange, debounceDelay]);

  useEffect(() => {
    setActive(!!value);
    return () => {
      if (debounceDelay > 0 && "cancel" in debouncedOnChange) {
        (debouncedOnChange as DebouncedFunc<(val: string) => void>).cancel?.();
      }
    };
  }, [value, debounceDelay, debouncedOnChange]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="w-full max-w-[364px] flex flex-col gap-2">
      <label className="text-xl text-textColor-sub">{label}</label>

      <input
        ref={inputRef}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        onChange={(e) => debouncedOnChange(e.target.value)}
        autoFocus={autoFocus}
        className={`w-full h-[60px] px-4 rounded-xl border-2 text-base outline-none transition-colors
          ${
            error
              ? "border-danger-50"
              : active
                ? "border-brand-normal"
                : "border-borderColor-default"
          }`}
      />

      {error && <p className="text-danger-50 text-sm font-medium">{error}</p>}
    </div>
  );
}
