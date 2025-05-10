"use client";

import ChoiceButton from "./ChoiceButton";

interface QuestionProps {
  question: string;
  choices: string[];
  selected: string | null;
  onSelect: (choice: string) => void;
}

export default function Question({
  question,
  choices,
  selected,
  onSelect,
}: QuestionProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-2xl font-semibold text-textColor-heading mb-6">
        {question}
      </div>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {choices.map((choice, index) => (
          <ChoiceButton
            key={index}
            label={choice}
            selected={selected === choice}
            onClick={() => onSelect(choice)}
          />
        ))}
      </div>
    </div>
  );
}
