"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import SearchAutoComplete from "@/components/home/search/SearchAutoComplete";
import SearchActivityCardList from "@/components/home/search/SearchActivityCardList";
import BackIcon from "@/asset/icons/arrow_back.svg";
import Image from "next/image";

export default function SearchPage() {
  const router = useRouter();
  const { isGuest } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [confirmedKeyword, setConfirmedKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

  const clearButton = useMemo(() => {
    if (!inputValue) return null;
    return (
      <button
        onClick={clearSearch}
        className="absolute right-3 top-1/2 -translate-y-1/2"
        aria-label="검색어 지우기"
        type="button"
      >
        <Image
          src="/images/deleteicon.svg"
          alt="검색어 지우기"
          width={18}
          height={18}
        />
      </button>
    );
  }, [inputValue]);

  return (
    <div className="h-full bg-bgColor-default p-4 space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={handleBack} type="button">
          <BackIcon className="w-10 h-10 text-textColor-body" />
        </button>
        <div className="flex-1 relative text-textColor-body">
          <input
            ref={inputRef}
            autoFocus
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (confirmedKeyword) setConfirmedKeyword("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(inputValue)}
            placeholder="검색어를 입력하세요"
            aria-label="검색어 입력"
            inputMode="search"
            className="w-full border-2 border-brand-normal focus:border-brand-normal focus:outline-none rounded-xl py-2 px-4 pr-10 text-lg touch-manipulation cursor-text select-text"
            style={{
              WebkitTapHighlightColor: "transparent",
              WebkitTouchCallout: "none",
              WebkitUserSelect: "text",
              userSelect: "text",
              WebkitAppearance: "none",
              appearance: "none",
              WebkitOverflowScrolling: "touch",
              touchAction: "manipulation",
              caretColor: "auto",
            }}
          />
          {clearButton}
        </div>
      </div>
      {!inputValue.trim() && !confirmedKeyword && (
        <div className="pt-20 text-center text-textColor-sub">
          <p className="text-xl font-semibold text-brand-normal">
            관심 있는 활동
          </p>
          <p className="mt-1 text-lg">검색해보세요!</p>
        </div>
      )}

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
