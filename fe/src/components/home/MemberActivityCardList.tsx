"use client";

import { useEffect, useState, useCallback } from "react";
import ActivityCardListBase from "./ActivityCardListBase";
import { fetchRecommendedPrograms, Program } from "@/apis/main/program";
import { useAuth } from "@/hooks/auth/useAuth";

export default function MemberActivityCardList() {
  const { hydrated } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!hydrated) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchRecommendedPrograms();
      setPrograms(data);

      if (data.length === 0) {
        setError("추천 가능한 활동이 없습니다.");
      }
    } catch {
      setError("추천 활동을 불러오는 데 실패했습니다.");
      setPrograms([]);
    } finally {
      setIsLoading(false);
    }
  }, [hydrated]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return (
    <ActivityCardListBase
      programs={programs}
      isLoading={isLoading}
      error={error}
      onReload={loadData}
    />
  );
}
