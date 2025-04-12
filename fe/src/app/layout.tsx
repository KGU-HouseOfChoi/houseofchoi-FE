import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "어르심",
  description: "노인을 위한 활동 추천 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-bgColor-default text-textColor-body text-[18px] leading-relaxed">
        <div className="w-full min-h-screen flex justify-center">
          <main className="w-full max-w-[414px] min-h-screen bg-white shadow-lg flex flex-col mx-auto">
            {/* 상단 헤더 */}
            <header className="h-[64px] px-6 md:px-8 lg:px-10 flex items-center border-b border-borderColor-default">
              <h1 className="text-xl md:text-2xl font-bold">어르심</h1>
            </header>

            {/* 콘텐츠 영역 */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-5">
              {children}
            </div>

            {/* 하단 네비게이션 */}
            <footer className="h-[124px] border-t border-borderColor-default flex items-center justify-around px-6 md:px-8 lg:px-10">
              {/* 나중에 네비게이션 버튼 추가 */}
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
