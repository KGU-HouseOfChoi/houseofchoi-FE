"use client";

interface CarrierInputProps {
  value: string;
  onClick: () => void;
  error?: string;
}

export default function CarrierInput({
  value,
  onClick,
  error,
}: CarrierInputProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-xl text-gray-600">통신사</label>
      <button
        type="button"
        onClick={onClick}
        className={`w-full px-4 py-4 border-2 rounded-2xl text-left text-base
          ${error ? "border-red-400" : value ? "border-brand-normal" : "border-gray-300"}`}
      >
        {value || "통신사를 선택해주세요"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
