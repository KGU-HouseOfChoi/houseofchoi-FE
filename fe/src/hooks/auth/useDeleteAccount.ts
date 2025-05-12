"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import axiosMainInstance from "@/apis/common/axiosMainInstance";
import type { AxiosError } from "axios";

export function useDeleteAccount() {
  const router = useRouter();
  const { reset } = useAuthStore.getState();

  const deleteAccount = async (
    redirectPath = "/guest"
  ): Promise<{ success: boolean; error?: unknown }> => {
    try {
      const { accessToken } = useAuthStore.getState();

      // 🔥 API 호출 (accessToken 있으면 Authorization 헤더 포함)
      await axiosMainInstance.delete("/v1/user/delete", {
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("✅ 회원탈퇴 성공");

      // 🔄 상태 초기화 및 토큰 제거
      reset();
      localStorage.removeItem("accessToken");
      sessionStorage.clear();

      // 🔄 페이지 이동
      router.replace(redirectPath);

      return { success: true };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        console.error("❌ 서버 응답 에러:", axiosError.response.data);
        console.error("❌ 상태 코드:", axiosError.response.status);
      } else {
        console.error("❌ 요청 전송 에러:", axiosError.message);
      }

      return { success: false, error };
    }
  };

  return { deleteAccount };
}
