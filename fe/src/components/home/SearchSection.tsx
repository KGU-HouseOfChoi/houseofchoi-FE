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
      <div className="relative flex items-center bg-white border-2 border-brand-normal rounded-xl px-4 h-[50px]">
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (confirmedKeyword) setConfirmedKeyword("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(inputValue)}
          placeholder="검색어를 입력하세요"
          className="flex-1 bg-transparent text-lg outline-none"
        />
      </div>
      {!confirmedKeyword && inputValue.trim() && (
        <SearchAutoComplete
          keyword={inputValue}
          onSelect={(name) => {
            setInputValue(name);
            handleSearch(name);
          }}
        />
      )}
      {confirmedKeyword && (
        <div className="mt-6">
          <SearchActivityCardList keyword={confirmedKeyword} />
        </div>
      )}
    </section>
  );
}
