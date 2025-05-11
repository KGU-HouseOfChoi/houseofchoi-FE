import axiosMainInstance from "@/apis/common/axiosMainInstance";

export interface FamilyMember {
  name: string;
  userCode: string;
  birth: string;
  relatedUserName: string;      // ✅ undefined 제거
  relatedUserBirth: string;     // ✅ undefined 제거
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
  } catch (error: any) {
    console.error("가족 정보를 가져오는데 실패했습니다:", error.message);
    return {
      name: "",
      userCode: "",
      birth: "",
      relatedUserName: "",
      relatedUserBirth: "",
    };
  }
}
