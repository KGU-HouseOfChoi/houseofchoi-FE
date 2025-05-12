interface FamilyOptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function FamilyOptionButton({
  label,
  selected,
  onClick,
}: FamilyOptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-6 py-3 rounded-xl text-lg font-semibold transition-colors ${
        selected
          ? "bg-brand-normal text-white"
          : "bg-bgColor-surface text-textColor-heading"
      }`}
    >
      {label}
    </button>
  );
}
