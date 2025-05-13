"use client";

import { useEffect, useState } from "react";
import { searchPrograms } from "@/apis/main/program";
import ActivityCardListBase from "./ActivityCardListBase";
import { Program } from "@/types/program";

interface Props {
  keyword: string;
}

export default function SearchActivityCardList({ keyword }: Props) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPrograms([]);
    setPage(1);
    setHasMore(true);
  }, [keyword]);

  useEffect(() => {
    const fetch = async () => {
      if (!hasMore || !keyword) return;
      setLoading(true);
      const data = await searchPrograms(keyword, page);
      setPrograms((prev) => [...prev, ...data]);
      if (data.length < 10) setHasMore(false);
      setLoading(false);
    };
    fetch();
  }, [keyword, page]);

  return (
    <>
      <ActivityCardListBase
        programs={programs}
        isLoading={loading && page === 1}
        error={null}
        onReload={() => setPage((prev) => prev)}
      />
      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-100 rounded"
            disabled={loading}
          >
            {loading ? "불러오는 중..." : "더보기"}
          </button>
        </div>
      )}
    </>
  );
}
