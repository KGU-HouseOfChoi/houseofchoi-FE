import axiosMainInstance from "@/apis/common/axiosMainInstance";

export const verifyRelation = (code: string, role: string) =>
  axiosMainInstance.post("/v1/user/relation/verify", { code, role });
