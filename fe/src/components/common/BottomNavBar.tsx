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

  if (!hydrated || !pathname) return null;

  const isHomePath = (path: string) => {
    if (isGuest) return path === "/guest";
    return path === "/member";
  };

  const navItems = [
    {
      label: "처음",
      href: isGuest ? "/guest" : "/member",
      icon: HomeIcon,
      isActive: isHomePath(pathname),
    },
    {
      label: "일정",
      href: "/member/calendar",
      icon: CalendarIcon,
      isActive: pathname === "/member/calendar",
    },
    {
      label: "챗봇",
      href: "/member/chatbot",
      icon: MessagesIcon,
      isActive: pathname === "/member/chatbot",
    },
    {
      label: "설정",
      href: "/member/mypage",
      icon: ProfileIcon,
      isActive: pathname === "/member/mypage",
    },
  ];

  const handleNavClick = (href: string) => {
    const isProtected = href.startsWith("/member");
    if (isGuest && isProtected) {
      setShowLoginPopup(true);
    } else if (pathname !== href) {
      router.push(href);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 w-full max-w-[414px] h-[124px] bg-white z-50 shadow-header">
        <div className="h-full px-6 flex items-center justify-between max-w-md mx-auto">
          {navItems.map(({ label, href, icon: Icon, isActive }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleNavClick(href)}
              className="flex flex-col items-center gap-1 w-[50px]"
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={`${
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
          ))}
        </div>
      </nav>

      <LoginGuidePopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
    </>
  );
}
