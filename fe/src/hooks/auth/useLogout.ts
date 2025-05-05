"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function useLogout() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");

  const logout = async () => {
    try {
      // TODO: 서버 로그아웃 API 연결
      // await authApi.post('/logout');

      localStorage.removeItem("access_token");
      // localStorage.removeItem("refresh_token");

      useAuthStore.getState().reset();
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      setToastMessage("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return { logout, toastMessage, setToastMessage };
}
