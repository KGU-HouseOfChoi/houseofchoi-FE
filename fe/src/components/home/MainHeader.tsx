"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getUserName } from "@/apis/main/user";
import { useAuth } from "@/hooks/auth/useAuth";

export default function MainHeader() {
  const { isGuest, hydrated } = useAuth();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (!hydrated || isGuest) return;

    const fetchUserName = async () => {
      try {
        const name = await getUserName();
        setUserName(name);
      } catch (err) {
        console.error("이름 조회 실패:", err);
        setUserName(null);
      }
    };

    fetchUserName();
  }, [isGuest, hydrated]);

  return (
    <header className="fixed top-0 w-full h-[100px] max-w-[414px] bg-bgColor-default shadow-[0px_3px_10px_rgba(142,_142,_142,_0.25)] px-4 py-4 flex gap-3 items-start z-50">
      <div className="w-24 min-w-[104px] h-[60px] flex-shrink-0 mt-1">
        <Image
          src="/images/logo.svg"
          alt="어르심 로고"
          width={104}
          height={60}
          className="object-contain w-full h-full rounded-[50px]"
        />
      </div>

      <div className="flex flex-col justify-center text-textColor-heading text-base leading-snug font-pretendard mx-auto h-full">
        {isGuest ? (
          <p>딱! 맞는 활동 추천드릴게요!</p>
        ) : (
          <>
            <p>
              <span className="font-semibold">{userName ?? "사용자"}</span>{" "}
              님에게
            </p>
            <p>딱! 맞는 활동 추천해드릴게요!</p>
          </>
        )}
      </div>
    </header>
  );
}
