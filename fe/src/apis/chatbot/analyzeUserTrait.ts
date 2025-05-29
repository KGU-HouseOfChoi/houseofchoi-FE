"use client";

import axiosAiInstance from "@/apis/common/axiosAiInstance";
import type { AxiosError } from "axios";

interface AnalyzeTraitResponse {
  success: boolean;
  message?: string;
  detail?: Array<{
    loc: string[];
    msg: string;
    type: string;
  }>;
}

export const analyzeUserTrait = async (
  days: number = 1,
): Promise<AnalyzeTraitResponse> => {
  try {
    const response = await axiosAiInstance.post(
      `/personality/analysis?days=${days}`,
    );
    console.log("✅ 새로운 MBTI 분석 결과:", response.data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log("❌ MBTI 분석 실패:", err.response?.data);
    throw err;
  }
};
