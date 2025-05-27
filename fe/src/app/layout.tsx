import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import LayoutWrapper from "@/components/common/LayoutWrapper";
import Script from "next/script";

export const metadata: Metadata = {
  title: "배우다",
  description: "가족 연동 기능을 통해\n일정을 나누고 챙길 수 있어요",
  keywords: [
    "시니어복지",
    "추천 서비스",
    "배우다",
    "learningwith",
    "시니어 활동",
    "가족 연동",
    "일정 공유",
  ],
  openGraph: {
    title: "배우다",
    description: "가족 연동 기능을 통해\n일정을 나누고 챙길 수 있어요",
    url: "https://learningwith.co.kr",
    siteName: "배우다 learningwith",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "배우다 대표 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "배우다",
    description: "가족 연동 기능을 통해\n일정을 나누고 챙길 수 있어요",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/icons/icon-512x512.png",
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FFB74D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`}
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-sans text-[18px] leading-relaxed bg-white">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
