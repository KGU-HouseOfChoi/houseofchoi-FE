"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpAPI } from "@/apis/auth/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { handleApiError } from "@/utils/common/handleApiError";

export interface SignUpParams {
  code: string;
  onSuccess: (status: "EXISTING_USER" | "NEW_USER") => void;
  onError: (msg: string) => void;
}

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    name,
    birthday,
    phoneNumber,
    setIsLoggedIn,
    setUserInfo,
    setAccessToken, // ✅ 추가
    resetSignupState,
  } = useAuthStore();

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

      const { isNewUser, userId, name: serverName, accessToken } = res.data;

      setUserInfo(serverName, userId);
      resetSignupState();
      setIsLoggedIn(true);

      if (accessToken) {
        setAccessToken(accessToken);
      } else {
        console.warn("⚠️ accessToken이 응답에 없습니다.");
      }

      const status = isNewUser ? "NEW_USER" : "EXISTING_USER";
      onSuccess(status);
    } catch (error) {
      try {
        handleApiError(error, "회원가입 중 오류가 발생했습니다.", router);
      } catch (handledError) {
        if (handledError instanceof Error) {
          onError(handledError.message);
        } else {
          onError("예상치 못한 오류가 발생했습니다.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSignUp, loading };
}
