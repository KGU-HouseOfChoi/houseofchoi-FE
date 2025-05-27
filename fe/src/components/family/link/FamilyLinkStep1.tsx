"use client";

import { useState } from "react";
import FamilyOptionButton from "@/components/family/common/FamilyOptionButton";
import BottomButton from "@/components/common/button/BottomButton";

interface FamilyLinkStep1Props {
  onSelectRelation: (relation: "parent" | "child") => void;
}

export default function FamilyLinkStep1({
  onSelectRelation,
}: FamilyLinkStep1Props) {
  const [relation, setRelation] = useState<"parent" | "child" | null>(null);

  return (
    <div className="relative flex flex-col min-h-screen px-6 pt-4 pb-20 bg-bgColor-default">
      <div className="flex flex-col items-start justify-center flex-1 gap-8">
        <p className="text-xl font-semibold text-textColor-heading text-left">
          당신은?
        </p>

        <div className="flex gap-4 w-full max-w-xs">
          <FamilyOptionButton
            label="부모"
            selected={relation === "parent"}
            onClick={() => setRelation("parent")}
          />
          <FamilyOptionButton
            label="자녀"
            selected={relation === "child"}
            onClick={() => setRelation("child")}
          />
        </div>
      </div>

      <BottomButton
        onClick={() => relation && onSelectRelation(relation)}
        disabled={!relation}
      >
        다음
      </BottomButton>
    </div>
  );
}
