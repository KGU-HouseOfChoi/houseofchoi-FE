"use client";

import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="fixed top sw-[329px] h-[60px] bg-[#FFE9C8] opacity-80 rounded-xl shadow-lg flex items-center justify-between px-6 text-textColor-sub text-2xl">
      <span>검색어를 입력하세요</span>
    </div>
  );
}
