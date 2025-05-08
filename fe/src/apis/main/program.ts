import axiosInstance from "@/apis/common/axiosMainInstance";
import { handleApiError } from "@/utils/common/handleApiError";
import type { AxiosResponse } from "axios";

export interface Program {
  id: number;
  name: string;
  firDay: string;
  secDay: string;
  thrDay: string;
  fouDay: string;
  fivDay: string;
  startTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  endTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  price: number;
  mainCategory: string;
  subCategory: string;
  headcount: string;
  tags: string[];
  centerId: number;
  centerName: string;
  imageUrl: string;
}

export async function fetchProgramList(): Promise<Program[]> {
  try {
    const res: AxiosResponse<{ success: boolean; data: Program[] }> =
      await axiosInstance.get("/v1/program/all");

    if (!res.data.success) {
      throw new Error("프로그램 목록을 불러오지 못했습니다.");
    }

    return res.data.data;
  } catch (error) {
    throw handleApiError(error, "프로그램 목록 조회 중 오류가 발생했습니다.");
  }
}
