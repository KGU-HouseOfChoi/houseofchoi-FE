"use client";

import { useState } from "react";
import BottomButton from "@/components/common/button/BottomButton";

interface FamilyLinkStep1Props {
  onSelectRelation: (relation: "parent" | "child") => void;
}

export default function FamilyLinkStep1({
  onSelectRelation,
}: FamilyLinkStep1Props) {
  const [relation, setRelation] = useState<"parent" | "child" | null>(null);

  const handleSelectRelation = (selectedRelation: "parent" | "child") => {
    setRelation(selectedRelation);
    localStorage.setItem("familyRelation", selectedRelation);
  };

  return (
    <div className="relative flex flex-col min-h-screen px-6 pt-4 pb-20 bg-bgColor-default">
      <div className="flex flex-col justify-center flex-1 gap-8 mt-16">
        <p className="text-xl font-semibold text-textColor-heading text-left">
          당신은?
        </p>

        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <button
              onClick={() => handleSelectRelation("parent")}
              className={`flex-1 py-4 px-6 rounded-xl text-lg font-semibold transition-colors ${
                relation === "parent"
                  ? "bg-brand-normal text-textColor-white"
                  : "bg-bgColor-surface text-textColor-heading"
              }`}
            >
              부모
            </button>
            <button
              onClick={() => handleSelectRelation("child")}
              className={`flex-1 py-4 px-6 rounded-xl text-lg font-semibold transition-colors ${
                relation === "child"
                  ? "bg-brand-normal text-textColor-white"
                  : "bg-bgColor-surface text-textColor-heading"
              }`}
            >
              자녀
            </button>
          </div>
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
