"use client";

import { useEffect, useState, useCallback } from "react";
import ActivityCardListBase from "./ActivityCardListBase";
import { fetchProgramList, Program } from "@/apis/main/program";
import { useAuth } from "@/hooks/auth/useAuth";

export default function GuestActivityCardList() {
  const { hydrated } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProgramList();
      setPrograms(data.slice(0, 5));
    } catch {
      setError("활동 목록을 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hydrated) void loadData();
  }, [hydrated, loadData]);

  return (
    <ActivityCardListBase
      programs={programs}
      isLoading={isLoading}
      error={error}
      onReload={loadData}
    />
  );
}
