"use client";

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

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
