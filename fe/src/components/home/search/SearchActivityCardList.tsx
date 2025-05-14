"use client";

import { useEffect, useState } from "react";
import { searchPrograms } from "@/apis/main/program";
import ActivityCardListBase from "@/components/home/ActivityCardListBase";
import { Program } from "@/types/program";

interface Props {
  keyword: string;
}

export default function SearchActivityCardList({ keyword }: Props) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 10;

  useEffect(() => {
    setPrograms([]);
    setPage(1);
    setHasMore(true);
  }, [keyword]);

  useEffect(() => {
    const fetch = async () => {
      if (!hasMore || !keyword) return;
      setLoading(true);
      try {
        const data = await searchPrograms(keyword, page);
        setPrograms((prev) => [...prev, ...data]);
        if (data.length < PAGE_SIZE) setHasMore(false);
      } catch {
        setPrograms([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [keyword, page, hasMore]);

  return (
    <>
      <ActivityCardListBase
        programs={programs}
        isLoading={loading && page === 1}
        onReload={() => {
          if (page === 1) {
            setPrograms([]);
            setHasMore(true);
          } else {
            setPage(1);
          }
        }}
        error={null}
      />
      {!loading && programs.length === 0 && keyword && (
        <div className="text-center py-8 text-textColor-sub">
          {`'${keyword}'에 대한 검색 결과가 없습니다.`}
        </div>
      )}
    </>
  );
}
