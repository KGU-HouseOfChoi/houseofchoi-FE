"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpAPI } from "@/apis/auth/auth";
import { useAuthStore } from "@/store/useAuthStore";
import type { AxiosError } from "axios";

export interface SignUpParams {
  code: string;
  onSuccess: (status: "EXISTING_USER" | "NEW_USER") => void;
  onError: (msg: string) => void;
}

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { name, birthday, phoneNumber, setIsLoggedIn, setUserInfo, reset } =
    useAuthStore();

  const handleSignUp = async ({ code, onSuccess, onError }: SignUpParams) => {
    setLoading(true);
    try {
      const res = await signUpAPI(
        {
          name,
          phone: phoneNumber,
          birth: birthday,
          code,
        },
        router,
      );

      console.log("회원가입 API 응답:", res);

      const { accessToken, isNewUser, userId, name: serverName } = res.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        setUserInfo(serverName, userId);
        reset();
        setIsLoggedIn(true);
      }

      const status = isNewUser ? "NEW_USER" : "EXISTING_USER";
      onSuccess(status);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error("handleSignUp 에러:", err);
      onError(err.response?.data?.message || "인증 실패");
    } finally {
      setLoading(false);
    }
  };

  return { handleSignUp, loading };
}
