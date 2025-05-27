"use client";

import { useAuthStore } from "@/store/useAuthStore";
import FormInput from "../common/input/FormInput";
import { useState } from "react";

export default function Step4_PhoneNumber() {
  const { phoneNumber, setField, setError, clearError, errors } =
    useAuthStore();
  const [active, setActive] = useState(false);

  const handleChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 11);
    setField("phoneNumber", clean);

    if (clean.length < 10 || !/^01[016789]\d{7,8}$/.test(clean)) {
      setError("phoneNumber", "휴대폰 번호 형식이 올바르지 않아요");
    } else {
      clearError("phoneNumber");
    }
  };

  return (
    <FormInput
      label="휴대폰 번호"
      value={phoneNumber}
      onChange={handleChange}
      error={errors.phoneNumber}
      type="tel"
      inputMode="numeric"
      pattern="[0-9]*"
      placeholder="숫자만 입력 (예: 01012345678)"
      autoFocus
      maxLength={11}
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
      }}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    />
  );
}
