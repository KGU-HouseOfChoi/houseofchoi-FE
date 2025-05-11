import { X } from "lucide-react";

interface FamilyInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function FamilyInputField({
  value,
  onChange,
  placeholder,
}: FamilyInputFieldProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b-2 border-brand-normal py-3 pr-10 text-lg focus:outline-none text-textColor-body"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute top-1/2 right-2 -translate-y-1/2"
        >
          <X className="w-5 h-5 text-iconColor-sub" />
        </button>
      )}
    </div>
  );
}
