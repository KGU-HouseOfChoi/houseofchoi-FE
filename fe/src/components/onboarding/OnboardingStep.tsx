import Image from "next/image";
import { ReactNode } from "react";

interface OnboardingSlideProps {
  image: string;
  title?: ReactNode;
  description: string;
  isProgressSlide?: boolean;
}

export default function OnboardingStep({
  image,
  title,
  description,
  isProgressSlide,
}: OnboardingSlideProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen text-center px-6 ${
        isProgressSlide ? "pt-[100px]" : ""
      }`}
    >
      <div className="flex flex-col items-center justify-center max-w-[320px] w-full">
        <Image
          src={image}
          alt={
            typeof title === "string"
              ? title
              : description.split("\n")[0] || "온보딩 이미지"
          }
          width={240}
          height={240}
          className="mb-6"
        />

        <div className="text-xl text-textColor-body leading-relaxed whitespace-pre-line mb-6">
          {title &&
            (typeof title === "string" ? (
              <h2 className="block font-bold text-[20px] mb-2 text-textColor-heading">
                {title}
              </h2>
            ) : (
              <>{title}</>
            ))}
          <p className="font-normal whitespace-pre-line">{description}</p>
        </div>
      </div>
    </div>
  );
}
