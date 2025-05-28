"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import debounce from "lodash/debounce";
import FormInput from "../common/input/FormInput";
import GuestConfirmPopup from "../popup/GuestConfirmPopup";
import { useRouter } from "next/navigation";

export default function Step1_Name() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
    }, 2000),
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

  const handleGuestConfirm = () => {
    setIsPopupOpen(false);
    router.push("/guest");
  };

  useEffect(() => {
    return () => {
      debouncedNextStep.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full mx-auto">
        <FormInput
          label="이름"
          value={name}
          placeholder="이름 입력"
          onChange={handleChange}
          error={errors.name}
          autoFocus
        />
      </div>

      <GuestConfirmPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleGuestConfirm}
      />
    </div>
  );
}
