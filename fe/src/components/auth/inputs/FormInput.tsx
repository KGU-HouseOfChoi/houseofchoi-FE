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

/**
 * Renders a customizable input field with label, optional error display, and support for debounced change handling.
 *
 * The input can be auto-focused on mount and dynamically styles its border based on error or active state. Change events can be debounced by specifying a delay.
 *
 * @param label - The label text displayed above the input field.
 * @param value - The current value of the input.
 * @param placeholder - Placeholder text shown when the input is empty.
 * @param onChange - Callback invoked with the new value when the input changes.
 * @param error - Optional error message displayed below the input.
 * @param type - Input type (e.g., "text", "password"). Defaults to "text".
 * @param inputMode - Optional input mode for virtual keyboards.
 * @param pattern - Optional regex pattern for input validation.
 * @param maxLength - Optional maximum character length.
 * @param autoFocus - If true, the input is focused on mount.
 * @param debounceDelay - Optional delay in milliseconds to debounce the onChange callback.
 *
 * @returns A React element representing the input field with label and error message.
 */
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
    <div className="w-full max-w-[327px] flex flex-col gap-2">
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
