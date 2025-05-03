import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function handleApiError(
  error: unknown,
  fallbackMessage: string,
  router: AppRouterInstance,
): never {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Axios 응답 에러:", error.response.data);
      const status = error.response.status;
      const message =
        (typeof error.response.data === "string"
          ? error.response.data
          : error.response.data?.message) || fallbackMessage;

      if (status === 401 || status === 403) {
        console.warn("토큰 만료 → 로그아웃 처리");
        const { reset } = useAuthStore.getState();
        reset();
        router.push("/login");
      }

      throw new Error(message);
    } else if (error.request) {
      console.error("Axios 요청은 갔지만 응답 없음:", error.request);
      throw new Error("서버로부터 응답이 없습니다.");
    } else {
      console.error("Axios 요청 설정 중 에러:", error.message);
      throw new Error(fallbackMessage);
    }
  } else if (error instanceof Error) {
    console.error("일반 에러:", error.message);
    throw new Error(error.message);
  } else {
    console.error("알 수 없는 에러:", error);
    throw new Error("예상치 못한 오류가 발생했습니다.");
  }
}
