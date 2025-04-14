import Image from "next/image";

interface OnboardingSlideProps {
  image: string;
  title?: string;
  description: string;
  isProgressSlide?: boolean;
}

export default function OnboardingSlide({
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
          alt="onboarding"
          width={240}
          height={240}
          className="mb-6"
        />

        <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line mb-6">
          {title && (
            <span className="block font-bold text-[20px] mb-2">{title}</span>
          )}
          <span className="font-normal whitespace-pre-line">{description}</span>
        </p>
      </div>
    </div>
  );
}
