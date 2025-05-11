import axiosMainInstance from "@/apis/common/axiosMainInstance";
import type { AxiosError } from "axios";


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
