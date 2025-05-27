import axiosInstance from "../common/axiosMainInstance";
import { handleApiError } from "@/utils/common/handleApiError";
import { useAuthStore } from "@/store/useAuthStore";
import type { AxiosResponse } from "axios";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function sendSMS(
  phone: string,
  router?: AppRouterInstance,
): Promise<void> {
  try {
    await axiosInstance.post("/v1/auth/send-sms", { phoneNum: phone });

    if (process.env.NODE_ENV !== "production") {
      console.log("인증번호 전송 성공");
    }
  } catch (error) {
    throw handleApiError(error, "SMS 전송 중 오류가 발생했습니다.", router);
  }
}

export interface SignUpRequest {
  name: string;
  phone: string;
  birth: string;
  code: string;
}

export interface SignUpAPIResponse {
  success: boolean;
  timestamp: string;
  data: {
    isNewUser: boolean;
    name: string;
    userId: number;
    birth: string;
    gender: string;
    role: string | null;
    userCode: string;
    accessToken: string;
    refreshToken: string;
  };
}

export async function signUpAPI(
  data: SignUpRequest,
  router?: AppRouterInstance,
): Promise<SignUpAPIResponse> {
  try {
    if (process.env.NODE_ENV !== "production") {
      console.log("회원가입 요청 전송");
    }

    const res: AxiosResponse<SignUpAPIResponse> = await axiosInstance.post(
      "/v1/auth/sign-up",
      data,
    );

    const { accessToken, refreshToken } = res.data.data;
    const { setAccessToken, setRefreshToken } = useAuthStore.getState();
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    return res.data;
  } catch (error) {
    throw handleApiError(error, "회원가입 중 오류가 발생했습니다.", router);
  }
}
