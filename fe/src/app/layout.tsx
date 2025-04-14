import "./globals.css"
import type { Metadata } from "next"
import LayoutWrapper from "@/components/common/LayoutWrapper";

export const metadata: Metadata = {
  title: "어르심",
  description: "노인을 위한 활동 추천 플랫폼",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans text-[18px] leading-relaxed bg-white">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}