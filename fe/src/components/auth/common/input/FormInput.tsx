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
  style?: React.CSSProperties;
  onFocus?: () => void;
  onBlur?: () => void;
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
  style,
  onFocus,
  onBlur,
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(e.target.value);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
    e.currentTarget.focus();
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-xl text-textColor-body font-semibold">
        {label}
      </label>

      <input
        ref={inputRef}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        onChange={handleInput}
        onTouchStart={handleTouchStart}
        onFocus={() => {
          setActive(true);
          onFocus?.();
        }}
        onBlur={() => {
          setActive(false);
          onBlur?.();
        }}
        autoFocus={autoFocus}
        className={`w-full h-[60px] px-4 rounded-xl border-2 text-base outline-none transition-colors bg-bgColor-default
          ${
            error
              ? "border-danger-50"
              : active || value
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
          WebkitAppearance: "none",
          appearance: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "manipulation",
          caretColor: active ? "auto" : "transparent",
          ...style,
        }}
      />

      {error && (
        <p className="text-danger-50 text-sm font-medium mt-1">{error}</p>
      )}
    </div>
  );
}
