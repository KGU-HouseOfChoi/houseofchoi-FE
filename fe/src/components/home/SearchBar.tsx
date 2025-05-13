"use client";

import { useRouter } from "next/navigation";
import SearchIcon from "@/asset/icons/search.svg";

export default function SearchBar() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/search")}
      className="relative z-0 w-full max-w-[329px] h-[65px] bg-[#FFE9C8] bg-opacity-50 rounded-xl shadow-lg flex items-center justify-between px-5 text-textColor-heading text-xl mx-auto cursor-pointer"
    >
      <input
        readOnly
        value=""
        placeholder="검색어를 입력하세요"
        className="flex-1 bg-transparent outline-none placeholder:text-textColor-sub cursor-pointer"
      />
      <SearchIcon className="w-10 h-10 text-brand-normal flex-shrink-0" />
    </div>
  );
}
