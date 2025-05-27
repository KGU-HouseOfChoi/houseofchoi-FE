import { useState } from "react";
import { useRouter } from "next/navigation";

import OnboardingSlide from "./OnboardingStep";
import OnboardingHeader from "./OnboardingHeader";
import Button from "@/components/common/button/Button";
import SplitButton from "@/components/common/button/SplitButton";

const slides = [
  {
    image: "/images/logo.svg",
    isIntro: true,
    title: (
      <>
        <span className="block text-2xl font-bold text-brand-normal mb-2">
          나에게 딱 맞는 활동,
        </span>
        <span className="block text-2xl font-bold text-textColor-heading">
          이제 쉽게 찾아보세요
        </span>
      </>
    ),
    description: "",
  },
  {
    image: "/images/logo.svg",
    title: "가족과 함께",
    description: "가족 연동 기능을 통해\n일정을 나누고 챙길 수 있어요",
  },
  {
    image: "/images/logo.svg",
    title: "성향 분석 기반 추천",
    description: "간단한 질문에 답하면\n내게 맞는 복지활동을\n추천해드려요",
  },
  {
    image: "/images/logo.svg",
    title: "챗봇과 함께하는 배우다",
    description:
      "챗봇과 대화하며 성향에 맞는\n복지활동을 다시 찾아볼 수 있어요",
  },
  {
    image: "/images/logo.svg",
    title: "일정도 손쉽게 관리",
    description: "원하는 활동을\n일정에 쉽게 등록하고\n한눈에 확인하세요",
  },
];

export default function OnboardingFlow() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const isFirst = current === 0;
  const isLast = current === slides.length - 1;
  const slide = slides[current];

  const handleNext = () => {
    if (isLast) {
      router.push("/guest");
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrent((prev) => prev - 1);
    }
  };

  return (
    <main className="relative min-h-screen bg-grayscale-0 flex flex-col items-center justify-center px-6 text-center">
      {current > 0 && (
        <OnboardingHeader current={current} total={slides.length - 1} />
      )}

      <div className="w-full h-full z-0">
        <OnboardingSlide {...slide} isProgressSlide={current > 0} />
      </div>

      <div className="absolute bottom-[54px] left-0 right-0 flex justify-center z-10">
        {slide.isIntro ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-[331px]">
              <Button onClick={handleNext} fullWidth>
                배우다, 어떤 서비스인가요?
              </Button>
            </div>

            <button
              onClick={() => router.push("/guest")}
              className="text-lg text-gray-400 underline"
            >
              바로 시작하기
            </button>
          </div>
        ) : (
          <div className="w-[331px]">
            <SplitButton
              left="이전"
              right={isLast ? "배우다 시작하기" : "다음으로 넘어가기"}
              onClickLeft={handlePrev}
              onClickRight={handleNext}
            />
          </div>
        )}
      </div>
    </main>
  );
}
