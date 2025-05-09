"use client";

import { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import { fetchProgramList, Program } from "@/apis/main/program";

export default function ActivityCardList() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProgramList();
      setPrograms(data.slice(0, 5));
    } catch (error) {
      console.error("활동 목록 불러오기 실패:", error);
      setError("활동 목록을 불러오는 데 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="flex flex-col items-center gap-5">
      {isLoading && (
        <div className="flex justify-center items-center w-full py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-normal"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-5 text-textColor-error">
          <p>{error}</p>
          <button
            onClick={loadData}
            className="mt-2 px-4 py-2 bg-brand-normal text-white rounded-lg"
          >
            다시 시도
          </button>
        </div>
      )}

      {!isLoading && !error && programs.length === 0 && (
        <div className="text-center py-10 text-textColor-sub">
          표시할 활동이 없습니다.
        </div>
      )}

      {!isLoading &&
        programs.map((program) => (
          <ActivityCard
            key={program.id}
            imageUrl={program.imageUrl || "/images/placeholder.svg"}
            title={program.name}
            location={program.centerName}
          />
        ))}

      {!isLoading && programs.length > 0 && (
        <div className="mt-8 mb-32 text-textColor-disabled text-center text-xl">
          추천 활동은 여기까지입니다!
        </div>
      )}
    </section>
  );
}
