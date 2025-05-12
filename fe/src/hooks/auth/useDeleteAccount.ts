"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import axiosMainInstance from "@/apis/common/axiosMainInstance";
import type { AxiosError } from "axios";

export function useDeleteAccount() {
  const router = useRouter();
  const { reset } = useAuthStore.getState();

  const deleteAccount = async (
    redirectPath = "/guest",
  ): Promise<{ success: boolean; error?: unknown }> => {
    try {
      const { accessToken } = useAuthStore.getState();

      await axiosMainInstance.delete("/v1/user/delete", {
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("회원탈퇴 성공");

      reset();
      localStorage.removeItem("accessToken");
      sessionStorage.clear();

      router.replace(redirectPath);

      return { success: true };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        console.error("서버 응답 에러:", axiosError.response.data);
        console.error("상태 코드:", axiosError.response.status);
      } else {
        console.error("요청 전송 에러:", axiosError.message);
      }

      return { success: false, error };
    }
  };

  return { deleteAccount };
}
