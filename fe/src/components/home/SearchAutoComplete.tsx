"use client";

import { useEffect, useState } from "react";
import { searchProgramsForAutoComplete } from "@/apis/main/program";

interface Props {
  keyword: string;
  onSelect: (name: string) => void;
}

export default function SearchAutoComplete({ keyword, onSelect }: Props) {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(async () => {
      const trimmed = keyword.trim();

      if (!isValidSearchKeyword(trimmed)) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const programs = await searchProgramsForAutoComplete(trimmed);
        const safeList = programs.map((p) => p.name);
        setResults(safeList);
      } catch (error) {
        console.error("자동완성 API 오류", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [keyword]);

  return (
    <ul className="px-4">
      {loading && <li className="py-2 text-base text-gray-500">검색 중...</li>}
      {!loading && results.length === 0 && (
        <li className="py-2 text-base text-gray-500">검색 결과가 없습니다</li>
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
  if (!text) return false;
  const isCompleteKor = text.length === 1 && isCompleteKorean(text[0]);
  const isLongEnglishOrNumber = /^[a-zA-Z0-9]{3,}$/.test(text);
  return isCompleteKor || isLongEnglishOrNumber;
}

function isCompleteKorean(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0xac00 && code <= 0xd7a3;
}

function highlightKeyword(text: string, keyword: string) {
  const parts = text.split(new RegExp(`(${keyword})`, "gi"));
  return parts.map((part, idx) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={idx} className="text-brand font-semibold">
        {part}
      </span>
    ) : (
      <span key={idx}>{part}</span>
    ),
  );
}
