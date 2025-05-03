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
  inputMode?: string;
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
    <div className="w-full flex flex-col gap-2">
      <label className="text-xl text-gray-500">{label}</label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => debouncedOnChange(e.target.value)}
        autoFocus={autoFocus}
        className={`px-4 py-4 rounded-2xl border-2 w-full text-base outline-none transition
          ${error ? "border-red-400" : active ? "border-brand-normal" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
