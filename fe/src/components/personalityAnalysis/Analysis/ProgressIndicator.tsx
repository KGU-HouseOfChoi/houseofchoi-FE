"use client";

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

/**
 * Displays the current progress as a formatted "current/total" indicator.
 *
 * @param current - The current progress value.
 * @param total - The total value representing completion.
 */
export default function ProgressIndicator({
  current,
  total,
}: ProgressIndicatorProps) {
  return (
    <div className="mb-2 text-xl font-pretendard font-semibold text-brand-normal">
      {current}/{total}
    </div>
  );
}
