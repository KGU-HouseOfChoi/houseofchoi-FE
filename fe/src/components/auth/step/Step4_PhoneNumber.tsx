"use client";

import { useAuthStore } from "@/store/useAuthStore";
import FormInput from "../common/input/FormInput";

export default function Step4_PhoneNumber() {
  const { phoneNumber, setField, setError, clearError, errors } =
    useAuthStore();

  const handleChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 11);
    setField("phoneNumber", clean);
    clearError("phoneNumber");

    if (clean.length !== 11) {
      setError("phoneNumber", "올바른 휴대폰 번호를 입력해주세요.");
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
    />
  );
}
