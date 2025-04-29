"use client";

import Image from "next/image";

export default function MainHeader() {
  return (
    <header className="fixed top-0 w-full h-[100px] max-w-[414px] bg-bgColor-default shadow-[0px_3px_10px_rgba(142,_142,_142,_0.25)] px-4 py-4 flex gap-3 items-start z-50">
      {/* 로고 */}
      <div className="w-24 min-w-[96px] h-[60px] flex-shrink-0">
        <Image
          src="/images/logo.svg"
          alt="어르심 로고"
          width={104}
          height={60}
          className="object-contain w-full h-full rounded-[50px]"
        />
      </div>

      {/* 텍스트 */}
      <div className="flex-1 text-textColor-heading text-base leading-snug font-pretendard mx-auto">
        <p>
          <span className="font-semibold">{"{회원이름}"}</span> 님에게
        </p>
        <p>딱! 맞는 활동 추천해드릴게요!</p>
      </div>
    </header>
  );
}
