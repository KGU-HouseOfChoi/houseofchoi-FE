"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Toast from "@/components/common/Toast"; // ✅ Toast 컴포넌트 (또는 Modal)

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useAuthStore((state) => state.accessToken);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const storedToken = token ?? localStorage.getItem("accessToken");
    if (!storedToken) {
      setShowWarning(true); // ✅ 경고창 표시
    }
  }, [token]);

  const handleRetry = () => {
    window.location.reload(); // ✅ 다시 시도: 페이지 새로고침
  };

  const handleExit = () => {
    router.replace("/guest"); // ✅ 나가기: 게스트 페이지 이동
  };

  return (
    <>
      {children}

      {showWarning && (
        <Toast
          message="로딩에 실패하였습니다. 다시 로그인 해주세요"
          actions={[
            { label: "다시 시도", onClick: handleRetry },
            { label: "나가기", onClick: handleExit },
          ]}
          onClose={handleExit} // ❓ 닫기 눌러도 게스트로 이동
        />
      )}
    </>
  );
}
