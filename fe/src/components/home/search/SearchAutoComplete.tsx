"use client";

import { useEffect, useState } from "react";
import { searchProgramsForAutoComplete } from "@/apis/main/program";
import { useDebounce } from "@/hooks/search/useDebounce";

interface Props {
  keyword: string;
  onSelect: (name: string) => void;
}

export default function SearchAutoComplete({ keyword, onSelect }: Props) {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedKeyword = useDebounce(keyword.trim(), 400);

  useEffect(() => {
    if (!isValidSearchKeyword(debouncedKeyword)) {
      setResults([]);
      return;
    }

    const fetch = async () => {
      setLoading(true);
      try {
        const programs = await searchProgramsForAutoComplete(debouncedKeyword);
        const safeList = programs.map((p) => p.name);
        setResults(safeList);
      } catch (error) {
        console.error("자동완성 API 오류", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [debouncedKeyword]);

  return (
    <ul className="px-4">
      {loading && (
        <li className="py-2 text-base text-textColor-sub">검색 중...</li>
      )}
      {!loading && results.length === 0 && (
        <li className="py-2 text-base text-textColor-sub">
          검색 결과가 없습니다
        </li>
      )}
      {results.map((name, idx) => (
        <li
          key={`${name}-${idx}`}
          className="py-2 text-base text-textColor-body cursor-pointer border-b"
          onClick={() => onSelect(name)}
          role="option"
          tabIndex={0}
          aria-selected="false"
          onKeyDown={(e) => e.key === "Enter" && onSelect(name)}
        >
          {highlightKeyword(name, keyword)}
        </li>
      ))}
    </ul>
  );
}

function isValidSearchKeyword(text: string): boolean {
  const trimmed = text.trim();
  return trimmed.length >= 1 && trimmed !== "";
}

function highlightKeyword(text: string, keyword: string) {
  const parts = text.split(new RegExp(`(${keyword})`, "gi"));
  return parts.map((part, idx) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={idx} className="text-brand-normal font-semibold">
        {part}
      </span>
    ) : (
      <span key={idx}>{part}</span>
    ),
  );
}
