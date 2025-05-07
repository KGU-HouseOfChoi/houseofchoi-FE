"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { useState } from "react";
import LoginGuidePopup from "@/components/auth/popup/LoginGuidePopup";

import HomeIcon from "@/asset/icons/home-2.svg";
import CalendarIcon from "@/asset/icons/calendar-tick.svg";
import MessagesIcon from "@/asset/icons/messages-2.svg";
import ProfileIcon from "@/asset/icons/profile-circle.svg";

export default function BottomNavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isGuest, hydrated } = useAuth();

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  if (!hydrated) return null;

  // ✅ 게스트/회원용 nav 항목 분리
  const navItems = isGuest
    ? [
        { label: "처음", href: "/", icon: HomeIcon },
        { label: "일정", href: "/member/schedule", icon: CalendarIcon },
        { label: "대화", href: "/member/chatbot", icon: MessagesIcon },
        { label: "설정", href: "/member/mypage", icon: ProfileIcon },
      ]
    : [
        { label: "처음", href: "/member", icon: HomeIcon },
        { label: "일정", href: "/member/schedule", icon: CalendarIcon },
        { label: "대화", href: "/member/chatbot", icon: MessagesIcon },
        { label: "설정", href: "/member/mypage", icon: ProfileIcon },
      ];

  const handleNavClick = (href: string) => {
    if (isGuest && href !== "/") {
      setShowLoginPopup(true);
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 w-full max-w-[414px] h-[124px] bg-white z-50 shadow-[0px_-3px_10px_rgba(142,142,142,0.25)]">
        <div className="h-full px-6 flex items-center justify-between max-w-md mx-auto">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href);

            return (
              <button
                type="button"
                key={label}
                onClick={() => handleNavClick(href)}
                className="flex flex-col items-center gap-1 w-[50px]"
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={`w-[50px] h-[50px] ${
                    isActive ? "text-brand-normal" : "text-iconColor-disabled"
                  }`}
                />
                <span
                  className={`text-2xl font-pretendard font-semibold ${
                    isActive ? "text-brand-normal" : "text-iconColor-sub"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <LoginGuidePopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
    </>
  );
}
