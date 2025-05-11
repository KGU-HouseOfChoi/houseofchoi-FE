import axiosMainInstance from "@/apis/common/axiosMainInstance";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message?: string;
  statusCode?: number;
  code?: string;
}

export const logoutApi = async (): Promise<boolean> => {
  try {
    const response = await axiosMainInstance.post("/v1/auth/logout");

    if (response.data.success) {
      console.log("✅ 로그아웃 성공");
      return true;
    } else {
      console.error("❌ 로그아웃 실패:", response.data.message);
      return false;
    }
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      // 🔍 타입 단언 (Type Assertion)
      const errorData = axiosError.response.data as ApiResponse;
      
      console.error("❌ 서버 응답 에러:", errorData);
      console.error("❌ 상태 코드:", axiosError.response.status);

      if (errorData.message?.includes("customUserDetails is null")) {
        alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      } else {
        alert(`로그아웃에 실패했습니다. 오류: ${errorData.message}`);
      }
    } else {
      console.error("❌ 요청 전송 에러:", axiosError.message);
    }

    return false;
  }
};



export const deleteAccountApi = async (): Promise<boolean> => {
  try {
    const response = await axiosMainInstance.delete("/v1/user/delete");

    if (response.data.success) {
      console.log("✅ 회원탈퇴 성공");
      return true;
    } else {
      console.error("❌ 회원탈퇴 실패:", response.data.message);
      return false;
    }
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error("❌ 서버 응답 에러:", axiosError.response.data);
      console.error("❌ 상태 코드:", axiosError.response.status);
    } else {
      console.error("❌ 요청 전송 에러:", axiosError.message);
    }

    return false;
  }
};
