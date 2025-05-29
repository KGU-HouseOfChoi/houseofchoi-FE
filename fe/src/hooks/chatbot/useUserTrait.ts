"use client";

import { useState, useCallback } from "react";
import axiosAiInstance from "@/apis/common/axiosAiInstance";

export function useUserTrait() {
  const [loading, setLoading] = useState(false);

  const getCurrentTrait = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosAiInstance.get("/personality/analysis");
      return response.data;
    } catch (error) {
      throw error as Error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    getCurrentTrait,
  };
}
