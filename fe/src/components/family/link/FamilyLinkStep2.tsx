"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FamilyInputField from "@/components/family/common/FamilyInputField";
import FamilyCompletedMessage from "@/components/family/common/CompletedMessage";
import BottomButton from "@/components/common/button/BottomButton";
import { verifyRelation } from "@/apis/family/link";

interface FamilyLinkStep2Props {
  relation: "parent" | "child";
}

export default function FamilyLinkStep2({ relation }: FamilyLinkStep2Props) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [error, setError] = useState("");

  const handleNext = async () => {
    if (!code) return;

     const koreanRole = relation === "parent" ? "부모" : "자녀";
     const targetRole = relation === "parent" ? "자녀" : "부모";

    try {
      const res = await verifyRelation(code, koreanRole);
      console.log("✅ API 응답:", res.data);

      if (res.data.success) {
        setShowCompleted(true);
      } else {
        setError(res.data.message || "연동에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("서버 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (showCompleted) {
      const timer = setTimeout(() => {
        router.replace("/member");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCompleted, router]);

  return showCompleted ? (
    <FamilyCompletedMessage />
  ) : (
    <div className="relative flex flex-col min-h-screen px-6 pt-4 pb-20 bg-bgColor-default">
      <div className="flex flex-col justify-center flex-1 gap-8">
        <p className="text-xl font-semibold text-textColor-heading">
          {relation === "parent" ? "자녀" : "부모"}의 고유 번호를 입력해주세요
        </p>

        <FamilyInputField
          value={code}
          onChange={setCode}
          placeholder="고유번호 입력"
        />

        {error && <p className="text-danger-50 text-sm text-center">{error}</p>}
      </div>

      <BottomButton onClick={handleNext} disabled={!code}>
        연동하기
      </BottomButton>
    </div>
  );
}
