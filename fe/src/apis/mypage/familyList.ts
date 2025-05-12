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

    return {
      name: "",
      userCode: "",
      birth: "",
      relatedUserName: "",
      relatedUserBirth: "",
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error(
        "가족 정보를 가져오는데 실패했습니다:",
        axiosError.response.data,
      );
    } else {
      console.error("가족 정보를 가져오는데 실패했습니다:", axiosError.message);
    }

    return {
      name: "",
      userCode: "",
      birth: "",
      relatedUserName: "",
      relatedUserBirth: "",
    };
  }
}
