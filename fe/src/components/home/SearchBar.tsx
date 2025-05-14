"use client";

import { useRouter } from "next/navigation";
import SearchIcon from "@/asset/icons/search.svg";

export default function SearchBar() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/search");
  };

  return (
    <div
      onClick={handleSearchClick}
      role="button"
      aria-label="검색 페이지로 이동"
      className="relative z-0 w-full max-w-[329px] h-[65px] bg-[#FFE9C8] bg-opacity-50 rounded-xl shadow-lg flex items-center justify-between px-5 text-textColor-heading text-xl mx-auto cursor-pointer"
    >
      <div className="flex-1 text-textColor-sub">검색어를 입력하세요</div>
      <SearchIcon className="w-10 h-10 text-brand-normal flex-shrink-0" />
    </div>
  );
}
