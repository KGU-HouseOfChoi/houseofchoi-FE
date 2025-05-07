import { useRouter } from "next/navigation";

interface Props {
  current: number;
  total: number;
}

/**
 * Displays an onboarding header with the current step, total steps, a skip button, and a progress bar.
 *
 * Renders the current onboarding progress as both text and a visual progress bar. Includes a button that navigates to the home page when clicked.
 *
 * @param current - The current onboarding step (1-based).
 * @param total - The total number of onboarding steps.
 */
export default function OnboardingHeader({ current, total }: Props) {
  const router = useRouter();
  const progress = (current / total) * 100;

  return (
    <div className="absolute top-0 left-0 w-full px-6 pt-6 z-10 max-w-[414px] mx-auto">
      <div className="flex justify-between items-center text-lg text-textColor-body mb-2">
        <span>
          {current} / {total}
        </span>
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-1 text-lg text-textColor-sub hover:text-brand-normal"
        >
          <span>건너뛰기</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="w-full bg-grayscale-20 rounded-full h-2 overflow-hidden">
        <div
          className="bg-brand-normal h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
