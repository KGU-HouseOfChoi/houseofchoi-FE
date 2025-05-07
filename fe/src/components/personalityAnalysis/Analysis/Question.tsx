"use client";

import ChoiceButton from "./ChoiceButton";

interface QuestionProps {
  question: string;
  choices: string[];
  selected: string | null;
  onSelect: (choice: string) => void;
}

/**
 * Renders a multiple-choice question with selectable answer options.
 *
 * Displays the provided question text and a list of choices, allowing the user to select one. When a choice is selected, the {@link onSelect} callback is invoked with the selected choice.
 *
 * @param question - The question text to display.
 * @param choices - The array of possible answer choices.
 * @param selected - The currently selected choice, or null if none is selected.
 * @param onSelect - Callback invoked with the selected choice when a choice is clicked.
 */
export default function Question({
  question,
  choices,
  selected,
  onSelect,
}: QuestionProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-semibold text-center text-textColor-heading mb-6">
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
