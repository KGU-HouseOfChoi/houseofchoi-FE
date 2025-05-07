"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcon from "@/asset/icons/home-2.svg";
import CalendarIcon from "@/asset/icons/calendar-tick.svg";
import MessagesIcon from "@/asset/icons/messages-2.svg";
import ProfileIcon from "@/asset/icons/profile-circle.svg";

const navItems = [
  { label: "처음", href: "/", icon: HomeIcon },
  { label: "일정", href: "/schedule", icon: CalendarIcon },
  { label: "대화", href: "/member/chatbot", icon: MessagesIcon },
  { label: "설정", href: "/member/mypage", icon: ProfileIcon },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full max-w-[414px] h-[124px] bg-white z-50 shadow-[0px_-3px_10px_rgba(142,142,142,0.25)] touch-manipulation">
      <div className="h-full px-6 flex items-center justify-between max-w-md mx-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={label}
              href={href}
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
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
