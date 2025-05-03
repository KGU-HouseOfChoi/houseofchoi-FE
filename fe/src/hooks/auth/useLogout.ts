"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      // 여기서 필요하면 서버에 로그아웃 요청 보내고
      // 예: await api.post('/logout');

      // localStorage 토큰 삭제
      localStorage.removeItem("access_token");

      // zustand 상태 초기화
      useAuthStore.getState().reset();

      router.push("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return { logout };
}
