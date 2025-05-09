import Image from "next/image";

interface OnboardingSlideProps {
  image: string;
  title?: string;
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
          alt={title || description.split("\n")[0] || "온보딩 이미지"}
          width={240}
          height={240}
          className="mb-6"
        />

        <p className="text-xl text-textColor-body leading-relaxed whitespace-pre-line mb-6">
          {title && (
            <span className="block font-bold text-[20px] mb-2 text-textColor-heading">
              {title}
            </span>
          )}
          <span className="font-normal whitespace-pre-line">{description}</span>
        </p>
      </div>
    </div>
  );
}
