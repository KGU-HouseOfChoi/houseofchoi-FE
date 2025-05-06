"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

export function useLogout() {
  const [toastMessage, setToastMessage] = useState("");

  const logout = async (redirectPath = "/guest") => {
    try {
      await fetch("/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      useAuthStore.getState().reset();
      localStorage.clear();
      sessionStorage.clear();

      window.location.replace(redirectPath);
    } catch (error) {
      console.error("로그아웃 실패:", error);
      setToastMessage("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return { logout, toastMessage };
}
