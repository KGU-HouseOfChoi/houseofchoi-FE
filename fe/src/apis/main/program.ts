import axiosMainInstance from "@/apis/common/axiosMainInstance";
import axiosAiInstance from "@/apis/common/axiosAiInstance";
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

interface RecommendedProgramResponse {
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
  tags: { name: string }[];
  center?: {
    id: number;
    name: string;
  };
  image_url?: string;
  imageUrl?: string;
}

export async function fetchProgramList(): Promise<Program[]> {
  try {
    const res: AxiosResponse<{ success: boolean; data: Program[] }> =
      await axiosMainInstance.get("/v1/program/all");

    if (!res.data.success)
      throw new Error("프로그램 목록을 불러오지 못했습니다.");

    return res.data.data;
  } catch (error) {
    throw handleApiError(error, "프로그램 목록 조회 중 오류가 발생했습니다.");
  }
}

export async function fetchRecommendedPrograms(
  subCategory?: string,
): Promise<Program[]> {
  try {
    const res: AxiosResponse<RecommendedProgramResponse[]> =
      await axiosAiInstance.get("/recommend", {
        params: subCategory ? { sub_category: subCategory } : {},
      });

    const converted: Program[] = res.data.map((item) => ({
      ...item,
      imageUrl: item.image_url ?? item.imageUrl ?? "",
      centerId: item.center?.id ?? 0,
      centerName: item.center?.name ?? "장소 정보 없음",
      tags: item.tags.map((t) => t.name),
    }));

    return converted;
  } catch (error: unknown) {
    throw handleApiError(error, "추천 프로그램 조회 중 오류가 발생했습니다.");
  }
}
