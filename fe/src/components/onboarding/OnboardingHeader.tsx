import { useRouter } from "next/navigation";
import SkipButton from "@/components/common/button/SkipButton";

interface Props {
  current: number;
  total: number;
}

export default function OnboardingHeader({ current, total }: Props) {
  const router = useRouter();
  const progress = (current / total) * 100;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[414px] px-6 pt-6 z-10 bg-bgColor-default">
      <div className="flex justify-between items-center text-lg text-textColor-body mb-2">
        <span>
          {current} / {total}
        </span>
        <SkipButton onClick={() => router.push("/guest")} />
      </div>
      <div className="w-full bg-grayscale-20 rounded-full h-2 overflow-hidden mt-4">
        <div
          className="bg-brand-normal h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
