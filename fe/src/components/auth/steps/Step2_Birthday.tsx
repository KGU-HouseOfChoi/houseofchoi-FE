"use client";

import { useAuthStore } from "@/store/useAuthStore";
import BirthdayInput from "../inputs/BirthdayInput";

export default function Step2_Birthday() {
  const { birthday, setField, step, setError, clearError, errors, nextStep } =
    useAuthStore();

  const validate = (val: string) => {
    const valid = /^\d{6}[1-4]$/.test(val);
    setField("birthday", val);

    if (!valid) {
      setError("birthday", "주민등록번호를 정확히 입력해주세요");
    } else {
      clearError("birthday");

      if (step === 2) {
        nextStep();
      }
    }
  };

  return (
    <BirthdayInput
      value={birthday}
      onChange={validate}
      error={errors.birthday}
      autoFocus
    />
  );
}
