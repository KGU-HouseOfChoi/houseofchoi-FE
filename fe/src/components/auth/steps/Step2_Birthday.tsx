"use client";

import { useAuthStore } from "@/store/useAuthStore";
import BirthdayInput from "../inputs/BirthdayInput";

export default function Step2_Birthday() {
  const { birthday, setField, step, setError, clearError, errors, nextStep } =
    useAuthStore();

  const validate = (val: string) => {
    // 기본 형식 검사
    if (!/^\d{6}[1-4]$/.test(val)) {
      setError("birthday", "올바른 주민등록번호 형식이 아닙니다");
      setField("birthday", val);
      return;
    }

    // 생년월일 유효성 검사
    const year = parseInt(val.substring(0, 2));
    const month = parseInt(val.substring(2, 4));
    const day = parseInt(val.substring(4, 6));
    const genderCode = parseInt(val.substring(6, 7));

    // 월 검사
    if (month < 1 || month > 12) {
      setError("birthday", "존재하지 않는 월입니다");
      setField("birthday", val);
      return;
    }

    // 일 검사 (간단한 구현, 윤년 등 상세 검사는 추가 구현 필요)
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
    <BirthdayInput
      value={birthday}
      onChange={validate}
      error={errors.birthday}
      autoFocus
    />
  );
}
