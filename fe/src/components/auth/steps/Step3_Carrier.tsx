"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import CarrierPopup from "../popup/CarrierPopup";
import CarrierInput from "../inputs/CarrierInput";

/**
 * React component for selecting a mobile carrier during step 3 of an authentication or registration flow.
 *
 * Opens a carrier selection popup when required, validates the user's selection, manages error states, and automatically advances to the next step when a valid carrier is chosen.
 */
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
    <div className="flex flex-col gap-4 w-full max-w-[327px] mx-auto">
      <CarrierInput
        value={carrier}
        onClick={() => setOpen(!open)}
        error={errors.carrier}
        isOpen={open} // 아이콘 전환용 prop (CarrierInput에서 활용)
      />

      <CarrierPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        onSelect={handleSelect}
      />
    </div>
  );
}
