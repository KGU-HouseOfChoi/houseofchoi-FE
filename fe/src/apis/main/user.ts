import axiosInstance from "@/apis/common/axiosMainInstance";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * 로그인된 사용자의 이름을 조회하는 API
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

    return res.data.data; // 백엔드 응답 형태에 따라 조정 필요
  } catch (error) {
    console.error("사용자 이름 조회 실패:", error);
    throw new Error("사용자 이름을 불러오는 데 실패했습니다.");
  }
}
