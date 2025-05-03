import axiosInstance from "./axios";
import { handleApiError } from "@/utils/common/handleApiError";
import type { AxiosResponse } from "axios";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function sendSMS(
  phone: string,
  router: AppRouterInstance,
): Promise<void> {
  try {
    const res = await axiosInstance.post("/v1/auth/send-sms", {
      phoneNum: phone,
    });
    console.log("✅ 인증번호 전송 성공:", res.data);
  } catch (error) {
    handleApiError(error, "SMS 전송 중 오류가 발생했습니다.", router);
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
    accessToken: string;
    isNewUser: boolean;
    name: string;
    userId: number;
    birth: string;
    gender: string;
    role: string | null;
    userCode: string;
  };
}

export async function signUpAPI(
  data: SignUpRequest,
  router: AppRouterInstance,
): Promise<SignUpAPIResponse> {
  try {
    console.log("📦 보낼 데이터:", JSON.stringify(data, null, 2));
    const res: AxiosResponse<SignUpAPIResponse> = await axiosInstance.post(
      "/v1/auth/sign-up",
      data,
    );
    return res.data;
  } catch (error) {
    handleApiError(error, "회원가입 중 오류가 발생했습니다.", router);
  }
}
