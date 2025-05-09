"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useLogout() {
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();

  const logout = async (redirectPath = "/guest") => {
    try {
      const { accessToken, reset } = useAuthStore.getState();

      // 🔥 API 호출 (accessToken 있으면 Authorization 헤더 포함)
      await fetch("/v1/auth/logout", {
        method: "POST",
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ 필요 없으면 제거
      });

      // ✅ 상태 초기화
      reset();
      localStorage.removeItem("accessToken");
      sessionStorage.clear();

      // ✅ 클라이언트 리다이렉트
      router.replace(redirectPath);
      // 또는 → window.location.replace(redirectPath);
    } catch (error) {
      console.error("로그아웃 실패:", error);
      setToastMessage("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return { logout, toastMessage };
}
