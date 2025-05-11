import axiosMainInstance from "@/apis/common/axiosMainInstance";
import type { AxiosError } from "axios";

export interface FamilyMember {
  name: string;
  userCode: string;
  birth: string;
  relatedUserName: string;
  relatedUserBirth: string;
}

export async function fetchFamilyList(): Promise<FamilyMember> {
  try {
    const response = await axiosMainInstance.get("/v1/user/mypage");

    console.log("📌 API 응답 데이터: ", response.data);

    if (response.data.success) {
      const data = response.data.data;

      return {
        name: data.name,
        userCode: data.userCode,
        birth: data.relatedUserBirth ?? "",
        relatedUserName: data.relatedUserName ?? "",
        relatedUserBirth: data.relatedUserBirth ?? "",
      };
    }

    // ✅ 빈 값으로 반환하여 undefined 방지
    return {
      name: "",
      userCode: "",
      birth: "",
      relatedUserName: "",
      relatedUserBirth: "",
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    // 에러 메시지 출력
    if (axiosError.response) {
      console.error(
        "가족 정보를 가져오는데 실패했습니다:",
        axiosError.response.data,
      );
    } else {
      console.error("가족 정보를 가져오는데 실패했습니다:", axiosError.message);
    }

    // ✅ 빈 값으로 반환하여 undefined 방지
    return {
      name: "",
      userCode: "",
      birth: "",
      relatedUserName: "",
      relatedUserBirth: "",
    };
  }
}
