"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import CarrierPopup from "../popup/CarrierPopup";
import CarrierInput from "../common/input/CarrierInput";

export default function Step3_Carrier() {
  const { carrier, step, setField, setError, clearError, errors, nextStep } =
    useAuthStore();
  const [open, setOpen] = useState(false);
  const hasAdvanced = useRef(false);

  const handleSelect = (selected: string) => {
    if (!selected) {
      setError("carrier", "통신사를 선택해주세요");
    } else {
      clearError("carrier");
      setField("carrier", selected);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (step === 3 && !carrier) {
      setOpen(true);
    }

    if (step === 3 && carrier && !errors.carrier && !hasAdvanced.current) {
      hasAdvanced.current = true;
      nextStep();
    }
  }, [step, carrier, errors.carrier, nextStep]);

  return (
    <div>
      <CarrierInput
        value={carrier}
        onClick={() => setOpen(!open)}
        error={errors.carrier}
        isOpen={open}
      />

      <CarrierPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        onSelect={handleSelect}
      />
    </div>
  );
}
