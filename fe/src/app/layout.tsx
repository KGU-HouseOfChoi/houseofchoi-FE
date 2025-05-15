import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import LayoutWrapper from "@/components/common/LayoutWrapper";
import Script from "next/script";

export const metadata: Metadata = {
  title: "어르심 - 노인을 위한 활동 추천 플랫폼",
  description: "노인 맞춤형 여가/복지 활동을 추천하는 소셜케어 서비스",
  keywords: ["노인복지", "추천 서비스", "어르심", "Eldermind", "노인 활동"],
  openGraph: {
    title: "어르심",
    description: "노인을 위한 활동 추천 플랫폼",
    url: "https://houseofchoi-fe.vercel.app",
    siteName: "어르심 Eldermind",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "어르심 대표 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "어르심",
    description: "노인을 위한 활동 추천 플랫폼",
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
