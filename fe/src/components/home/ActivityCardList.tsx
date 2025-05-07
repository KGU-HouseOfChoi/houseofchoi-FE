"use client";

import { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import { fetchProgramList, Program } from "@/apis/main/program";

export default function ActivityCardList() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProgramList();
        setPrograms(data.slice(0, 5));
      } catch (error) {
        console.error("활동 목록 불러오기 실패:", error);
      }
    }

    loadData();
  }, []);

  return (
    <section className="flex flex-col items-center gap-5">
      {programs.map((program) => (
        <ActivityCard
          key={program.id}
          imageUrl="/images/logo.svg"
          title={program.name}
          location={program.centerName}
        />
      ))}

      <div className="mt-8 mb-32 text-textColor-disabled text-center text-xl">
        추천 활동은 여기까지입니다!
      </div>
    </section>
  );
}
