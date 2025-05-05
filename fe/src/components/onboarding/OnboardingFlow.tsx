import { useState } from "react";
import { useRouter } from "next/navigation";

import OnboardingSlide from "./OnboardingStep";
import OnboardingHeader from "./OnboardingHeader";
import Button from "@/components/common/Button/Button";
import SplitButton from "@/components/common/Button/SplitButton";

const slides = [
  {
    image: "/images/logo.svg",
    isIntro: true,
    title: "당신을 위한 맞춤 복지 활동 플랫폼",
    description: " ",
  },
  {
    image: "/images/logo.svg",
    title: "성향 분석 기반 추천",
    description: "몇 가지 선택만으로\n나에게 꼭 맞는 활동을 알려드려요.",
  },
  {
    image: "/images/logo.svg",
    title: "가족과 함께 쓰는 어르심",
    description: "자녀나 보호자와\n계정을 연결해 함께 일정을 확인할 수 있어요.",
  },
  {
    image: "/images/logo.svg",
    title: "일정도 손쉽게 관리",
    description: "마음에 드는 활동을 등록하고\n캘린더에서 한눈에 볼 수 있어요.",
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
      router.push("/");
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
                어르심, 어떤 서비스인가요?
              </Button>
            </div>

            <button
              onClick={() => router.push("/")}
              className="text-lg text-gray-400 underline"
            >
              바로 시작하기
            </button>
          </div>
        ) : (
          <div className="w-[331px]">
            <SplitButton
              left="이전"
              right={isLast ? "어르심 시작하기" : "다음으로 넘어가기"}
              onClickLeft={handlePrev}
              onClickRight={handleNext}
            />
          </div>
        )}
      </div>
    </main>
  );
}
