"use client";

import { useEffect, useState } from "react";
import { searchProgramsForAutoComplete } from "@/apis/main/program";

interface Props {
  keyword: string;
  onSelect: (name: string) => void;
}

export default function SearchAutoComplete({ keyword, onSelect }: Props) {
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!keyword.trim()) return setResults([]);
      try {
        const programs = await searchProgramsForAutoComplete(keyword);
        const safeList = programs.map((p) => p.name);
        setResults(safeList);
      } catch {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword]);

  return (
    <ul className="px-4">
      {results.map((name, idx) => (
        <li
          key={`${name}-${idx}`}
          className="py-2 text-base text-textColor-body cursor-pointer border-b"
          onClick={() => onSelect(name)}
        >
          {highlightKeyword(name, keyword)}
        </li>
      ))}
    </ul>
  );
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
