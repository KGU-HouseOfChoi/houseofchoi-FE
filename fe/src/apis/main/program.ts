import axiosMainInstance from "@/apis/common/axiosMainInstance";
import axiosAiInstance from "@/apis/common/axiosAiInstance";
import { handleApiError } from "@/utils/common/handleApiError";
import type { AxiosResponse } from "axios";
import type {
  RawAiProgram,
  RawFlatProgram,
  UnifiedProgram,
} from "@/types/program";
import { normalizeToUnifiedProgram } from "@/utils/program/normalizeProgram";

export async function fetchProgramList(): Promise<UnifiedProgram[]> {
  try {
    const res: AxiosResponse<{ success: boolean; data: RawFlatProgram[] }> =
      await axiosMainInstance.get("/v1/program/all");
    if (!res.data.success) {
      throw new Error("프로그램 목록을 불러오지 못했습니다.");
    }

    return res.data.data.map(normalizeToUnifiedProgram);
  } catch (error) {
    throw handleApiError(error, "프로그램 목록 조회 중 오류가 발생했습니다.");
  }
}

export async function fetchRecommendedPrograms(
  subCategory?: string,
): Promise<UnifiedProgram[]> {
  try {
    const res: AxiosResponse<RawAiProgram[]> = await axiosAiInstance.get(
      "/recommend",
      {
        params: subCategory ? { sub_category: subCategory } : {},
      },
    );

    return res.data.map(normalizeToUnifiedProgram);
  } catch (error) {
    throw handleApiError(error, "추천 프로그램 조회 중 오류가 발생했습니다.");
  }
}

const DEFAULT_PAGE_SIZE = 10;
export async function searchPrograms(
  keyword: string,
  page = 1,
  size = DEFAULT_PAGE_SIZE,
): Promise<UnifiedProgram[]> {
  try {
    const res: AxiosResponse<{ success: boolean; data: RawFlatProgram[] }> =
      await axiosMainInstance.get("/v1/program/search", {
        params: { name: keyword, page, size },
      });

    if (!res.data.success) {
      throw new Error("검색 결과를 불러오지 못했습니다.");
    }

    return res.data.data.map(normalizeToUnifiedProgram);
  } catch (error) {
    throw handleApiError(error, "프로그램 검색 중 오류가 발생했습니다.");
  }
}
