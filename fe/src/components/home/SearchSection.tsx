"use client";

import { useState } from "react";
import SearchAutoComplete from "./SearchAutoComplete";
import SearchActivityCardList from "./SearchActivityCardList";

export default function SearchSection() {
  const [inputValue, setInputValue] = useState("");
  const [confirmedKeyword, setConfirmedKeyword] = useState("");

  const handleSearch = (kw: string) => {
    setConfirmedKeyword(kw);
  };

  return (
    <section className="w-full px-4 py-6">
      <div
        className="relative flex items-center bg-white border-2 border-brand-normal rounded-xl px-4 h-[50px]"
        role="search"
      >
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (confirmedKeyword) setConfirmedKeyword("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(inputValue)}
          placeholder="검색어를 입력하세요"
          className="flex-1 bg-transparent text-lg outline-none"
          aria-label="프로그램 검색"
          autoComplete="off"
        />
        +{" "}
        <button
          type="button"
          className="ml-2 p-2"
          onClick={() => handleSearch(inputValue)}
          aria-label="검색"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
      {!confirmedKeyword && inputValue.trim() && (
        <SearchAutoComplete
          key={inputValue}
          keyword={inputValue}
          onSelect={(name) => {
            setInputValue(name);
            handleSearch(name);
          }}
        />
      )}

      {confirmedKeyword && (
        <div className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-medium">
              {`"${confirmedKeyword}" 검색 결과`}
            </h2>
          </div>
          <SearchActivityCardList keyword={confirmedKeyword} />
        </div>
      )}
    </section>
  );
}
