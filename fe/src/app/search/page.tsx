"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import SearchAutoComplete from "@/components/home/SearchAutoComplete";
import SearchActivityCardList from "@/components/home/SearchActivityCardList";
import BackIcon from "@/asset/icons/arrow_back.svg";
import Image from "next/image";

export default function SearchPage() {
  const router = useRouter();
  const { isGuest } = useAuth();

  const [inputValue, setInputValue] = useState("");
  const [confirmedKeyword, setConfirmedKeyword] = useState("");

  const handleSearch = (kw: string) => {
    setConfirmedKeyword(kw);
  };

  const handleBack = () => {
    router.push(isGuest ? "/guest" : "/member");
  };

  const clearSearch = () => {
    setInputValue("");
    setConfirmedKeyword("");
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={handleBack}>
          <BackIcon className="w-10 h-10 text-textColor-body" />
        </button>
        <div className="flex-1 relative text-textColor-body">
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (confirmedKeyword) setConfirmedKeyword("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(inputValue)}
            placeholder="검색어를 입력하세요"
            aria-label="검색어 입력"
            className="w-full border rounded-xl py-2 px-4 pr-10 text-lg"
          />
          {inputValue && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Image
                src="/images/deleteicon.svg"
                alt="검색어 지우기"
                width={18}
                height={18}
              />
            </button>
          )}
        </div>
        <button
          onClick={() => handleSearch(inputValue)}
          className="text-textColor-body text-lg font-bold px-2"
        >
          검색
        </button>
      </div>

      {!confirmedKeyword && inputValue.trim() && (
        <SearchAutoComplete
          keyword={inputValue}
          onSelect={(kw) => {
            setInputValue(kw);
            handleSearch(kw);
          }}
        />
      )}

      {confirmedKeyword && (
        <SearchActivityCardList keyword={confirmedKeyword} />
      )}
    </div>
  );
}
