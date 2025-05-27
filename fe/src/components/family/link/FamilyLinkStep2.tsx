"use client";

import { useState } from "react";
import FamilyInputField from "@/components/family/common/FamilyInputField";
import FamilyCompletedMessage from "@/components/family/common/CompletedMessage";
import BottomButton from "@/components/common/button/BottomButton";
import { verifyRelation } from "@/apis/family/link";

interface FamilyLinkStep2Props {
  relation: "parent" | "child";
}

export default function FamilyLinkStep2({ relation }: FamilyLinkStep2Props) {
  const [code, setCode] = useState("");
  const [userStatus, setUserStatus] = useState<
    "NEW_USER" | "EXISTING_USER" | null
  >(null);
  const [error, setError] = useState("");
  const [active, setActive] = useState(false);

  const handleNext = async () => {
    if (!code) return;

    const targetRole = relation === "parent" ? "자녀" : "부모";

    try {
      const res = await verifyRelation(code, targetRole);

      if (res.data.success) {
        const status = res.data.userStatus;
        if (status === "NEW_USER") {
          setUserStatus("NEW_USER");
        } else {
          setUserStatus("EXISTING_USER");
        }
      } else {
        setError(res.data.message || "연동에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("서버 오류가 발생했습니다.");
    }
  };

  if (userStatus === "NEW_USER") {
    return (
      <FamilyCompletedMessage
        redirectTo="/member/personality"
        delayMs={0}
        message="연동이 완료되었어요 🎉"
        description="이제 성향 분석을 시작할게요!"
      />
    );
  }

  if (userStatus === "EXISTING_USER") {
    return (
      <FamilyCompletedMessage
        redirectTo="/member"
        delayMs={3000}
    https://github.com/KGU-HouseOfChoi/houseofchoi-FE/pulls    message="가족 연동이 완료되었습니다!"
        description="이제 가족과 함께 일정을 공유할 수 있어요.\n잠시 후 메인 페이지로 이동합니다."
      />
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen px-6 pt-4 pb-20 bg-bgColor-default">
      <div className="flex flex-col justify-center flex-1 gap-4">
        <p className="text-xl font-semibold text-textColor-heading">
          {relation === "parent" ? "자녀" : "부모"}의 고유 번호를 입력해주세요
        </p>

        <FamilyInputField
          value={code}
          onChange={setCode}
          placeholder="고유번호 입력"
          active={active}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        />

        {error && <p className="text-danger-50 text-sm text-center">{error}</p>}
      </div>

      <BottomButton onClick={handleNext} disabled={!code}>
        연동하기
      </BottomButton>
    </div>
  );
}
