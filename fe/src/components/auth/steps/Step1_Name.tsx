"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import debounce from "lodash/debounce";
import FormInput from "../inputs/FormInput";

export default function Step1_Name() {
  const { name, setField, errors, setError, clearError, step, nextStep } =
    useAuthStore();
  const hasAdvanced = useRef(false);

  const debouncedNextStep = useRef(
    debounce((val: string) => {
      if (
        val.trim().length >= 2 &&
        !errors.name &&
        step === 1 &&
        !hasAdvanced.current
      ) {
        hasAdvanced.current = true;
        nextStep();
      }
    }, 400),
  ).current;

  const handleChange = (value: string) => {
    setField("name", value);

    if (value.trim().length < 2) {
      setError("name", "이름은 2자 이상 입력해주세요");
    } else {
      clearError("name");
    }

    debouncedNextStep(value);
  };

  useEffect(() => {
    return () => {
      debouncedNextStep.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormInput
      label="이름"
      value={name}
      placeholder="이름 입력"
      onChange={handleChange}
      error={errors.name}
      autoFocus
    />
  );
}
