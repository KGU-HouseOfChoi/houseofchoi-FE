"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const logout = async (
    redirectPath = "/guest",
  ): Promise<{ success: boolean; error?: unknown }> => {
    try {
      const { accessToken, reset } = useAuthStore.getState();

      await fetch("/v1/auth/logout", {
        method: "POST",
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      reset();
      localStorage.removeItem("accessToken");
      sessionStorage.clear();

      router.replace(redirectPath);

      return { success: true };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("로그아웃 실패:", error.message);
      } else {
        console.error("로그아웃 실패:", error);
      }
      return { success: false, error };
    }
  };

  return { logout };
}
