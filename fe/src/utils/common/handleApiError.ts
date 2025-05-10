import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

function extractErrorMessage(
  errorData: { message?: string } | string | undefined,
  fallbackMessage: string,
): string {
  if (typeof errorData === "string") return errorData;
  if (typeof errorData?.message === "string") return errorData.message;
  return fallbackMessage;
}

export function handleApiError(
  error: unknown,
  fallbackMessage: string,
  router?: AppRouterInstance,
): never {
  if (axios.isAxiosError(error)) {
    const { response, request } = error;

    if (process.env.NODE_ENV === "development") {
      console.error("API 에러:", error);
    }

    if (response) {
      const status = response.status;
      const extractedMessage = extractErrorMessage(
        response.data,
        fallbackMessage,
      );

      if (status === 401 || status === 403) {
        console.warn("토큰 만료 → 로그아웃 처리");
        const { reset } = useAuthStore.getState();
        reset();

        if (router && typeof router.push === "function") {
          router.push("/guest");
        }
      }

      throw new Error(extractedMessage);
    } else if (request) {
      throw new Error("서버로부터 응답이 없습니다.");
    } else {
      throw new Error(fallbackMessage);
    }
  } else if (error instanceof Error) {
    if (process.env.NODE_ENV === "development") {
      console.error("일반 에러:", error.message);
    }
    throw new Error(error.message);
  } else {
    if (process.env.NODE_ENV === "development") {
      console.error("알 수 없는 에러:", error);
    }
    throw new Error("예상치 못한 오류가 발생했습니다.");
  }
}
