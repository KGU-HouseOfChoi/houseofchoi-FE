"use client";

import { useAuthStore } from "@/store/useAuthStore";
import BirthdayInput from "../common/input/BirthdayInput";

export default function Step2_Birthday() {
  const { birthday, setField, step, setError, clearError, errors, nextStep } =
    useAuthStore();

  const validate = (val: string) => {
    if (!/^\d{6}[1-4]$/.test(val)) {
      setError("birthday", "올바른 주민등록번호 형식이 아닙니다");
      setField("birthday", val);
      return;
    }

    const month = parseInt(val.substring(2, 4), 10);
    const day = parseInt(val.substring(4, 6), 10);

    if (month < 1 || month > 12) {
      setError("birthday", "존재하지 않는 월입니다");
      setField("birthday", val);
      return;
    }

    const maxDays = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > maxDays[month]) {
      setError("birthday", "존재하지 않는 일자입니다");
      setField("birthday", val);
      return;
    }

    setField("birthday", val);
    clearError("birthday");

    if (step === 2) {
      nextStep();
    }
  };

  return (
    <div className="flex flex-col w-full mx-auto">
      <BirthdayInput
        value={birthday}
        onChange={validate}
        error={errors.birthday}
        autoFocus
      />
    </div>
  );
}
