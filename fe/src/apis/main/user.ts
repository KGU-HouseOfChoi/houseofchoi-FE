import axiosInstance from "@/apis/common/axiosMainInstance";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * @returns 사용자 이름 (string)
 */
export async function getUserName(): Promise<string> {
  const token = useAuthStore.getState().accessToken;

  if (!token) {
    throw new Error("Access token이 없습니다. 로그인이 필요합니다.");
  }

  try {
    const res = await axiosInstance.get("/v1/user/name", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const {
      success,
      data,
      message,
    }: { success: boolean; data: string; message?: string } = res.data;

    if (!success) {
      throw new Error(message || "이름 조회에 실패했습니다.");
    }

    return data;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { data?: { message?: string } } }).response
        ?.data?.message === "string"
    ) {
      throw new Error(
        (
          error as { response: { data: { message: string } } }
        ).response.data.message,
      );
    }

    console.error("사용자 이름 조회 실패:", error);
    throw new Error("사용자 이름을 불러오는 데 실패했습니다.");
  }
}
