"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import axiosMainInstance from "@/apis/common/axiosMainInstance";
import type { AxiosError } from "axios";

export function useDeleteAccount() {
  const router = useRouter();

  const deleteAccount = async (
    redirectPath = "/guest",
  ): Promise<{ success: boolean; error?: unknown }> => {
    try {
      const { accessToken, userId } = useAuthStore.getState();

      if (!userId) {
        console.error("유저 ID가 존재하지 않습니다.");
        return { success: false, error: "유저 ID가 없습니다." };
      }

      console.log(
        `📌 Authorization: ${accessToken ? `Bearer ${accessToken}` : "없음"}`,
      );

      await axiosMainInstance.delete("/v1/user/delete", {
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      useAuthStore.setState((state) => {
        if (state.userId === userId) {
          return {
            step: 1,
            name: "",
            userId: null,
            birthday: "",
            phoneNumber: "",
            carrier: "",
            verificationCode: "",
            isNewUser: false,
            isLoggedIn: false,
            accessToken: null,
            refreshToken: null,
            isAnalyzed: false,
            errors: {},
          };
        }
        return state;
      });

      localStorage.clear();
      sessionStorage.clear();

      router.replace(redirectPath);

      return { success: true };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      console.error("회원탈퇴 실패");

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
