"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FamilyHeader from "@/components/family/common/FamilyHeader";
import FamilyLinkStep1 from "@/components/family/link/FamilyLinkStep1";
import FamilyLinkStep2 from "@/components/family/link/FamilyLinkStep2";

export default function FamilyLinkPage() {
  const [relation, setRelation] = useState<"parent" | "child" | null>(null);
  const router = useRouter();

  const handleBack = () => {
    if (relation) {
      setRelation(null); // ✅ Step2 → Step1 전환
    } else {
      router.push("/member/complete"); // ✅ Step1 → /member/complete 이동
    }
  };

  return (
    <>
      <FamilyHeader onBack={handleBack} />

      {relation === null ? (
        <FamilyLinkStep1 onSelectRelation={setRelation} />
      ) : (
        <FamilyLinkStep2 relation={relation} />
      )}
    </>
  );
}
