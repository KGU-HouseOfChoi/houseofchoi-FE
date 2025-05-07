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

/**
 * Handles errors from API calls, extracting and throwing a user-friendly error message.
 *
 * If the error is an Axios error with a response, extracts the HTTP status and message. For a 401 Unauthorized status, resets authentication state and redirects to the "/guest" route if a router is provided. Throws a new error with the extracted or fallback message. Handles generic JavaScript errors and unknown error types by throwing an appropriate error message.
 *
 * @param error - The error object thrown during an API call.
 * @param fallbackMessage - The message to use if no specific error message can be extracted.
 * @param router - Optional Next.js router instance for navigation on authentication failure.
 *
 * @throws {Error} Always throws an error with a relevant message based on the error type and context.
 */
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

      if (status === 401) {
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
