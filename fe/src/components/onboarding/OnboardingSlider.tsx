"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";

import OnboardingSlide from "./OnboardingSlide";
import OnboardingHeader from "./OnboardingHeader";
import Button from "@/components/common/Button";
import SplitButton from "@/components/common/SplitButton";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    image: "/images/logo.svg",
    isIntro: true,
    description: "어르심은\n시니어를 위한 활동 추천\n플랫폼입니다.",
  },
  {
    image: "/images/logo.svg",
    title: "1. 성향 분석 기반 추천",
    description: "간단한 선택만으로 나에게 맞는\n활동을 안내해드려요.",
  },
  {
    image: "/images/logo.svg",
    title: "2. 가족 연동 기능",
    description: "자녀나 보호자와 계정을 연결해\n일정을 함께 확인할 수 있어요.",
  },
  {
    image: "/images/logo.svg",
    title: "3. 일정 관리 기능",
    description: "마음에 드는 활동을 등록하고\n한눈에 확인해보세요.",
  },
];

export default function OnboardingSlider() {
  const [current, setCurrent] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const router = useRouter();

  const isFirst = current === 0;
  const isLast = current === slides.length - 1;
  const slide = slides[current];

  const handleNext = () => {
    if (isLast) {
      router.push("/");
    } else {
      swiperRef.current?.slideNext();
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      swiperRef.current?.slidePrev();
    }
  };

  return (
    <main className="relative min-h-screen bg-grayscale-0 flex flex-col items-center justify-center px-6 text-center">
      {current > 0 && (
        <OnboardingHeader current={current} total={slides.length - 1} />
      )}

      <Swiper
        modules={[Pagination]}
        pagination={false}
        onSlideChange={(swiper) => setCurrent(swiper.activeIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full h-full z-0"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <OnboardingSlide {...slide} isProgressSlide={idx > 0} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-[54px] left-0 right-0 flex justify-center z-10">
        {slide.isIntro ? (
          <div className="w-[331px]">
            <Button onClick={handleNext} fullWidth>
              다음
            </Button>
          </div>
        ) : (
          <SplitButton
            left="이전"
            right={isLast ? "시작하기" : "다음"}
            onClickLeft={handlePrev}
            onClickRight={handleNext}
          />
        )}
      </div>
    </main>
  );
}
