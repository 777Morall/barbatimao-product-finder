
import React from "react";
import { Option } from "../types/quiz";
import { cn } from "../lib/utils";

interface QuizOptionProps {
  option: Option;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={cn(
        "quiz-option border rounded-lg p-4 mb-3 transition-all hover:shadow-md",
        isSelected ? "selected" : ""
      )}
      onClick={() => onSelect(option.value)}
    >
      <div className="flex items-center">
        <div
          className={cn(
            "w-5 h-5 rounded-full border border-primary flex items-center justify-center mr-3",
            isSelected ? "bg-primary" : "bg-transparent"
          )}
        >
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-white"></div>
          )}
        </div>
        <div className="text-left">
          <span className="text-base font-medium">{option.text}</span>
        </div>
      </div>
    </div>
  );
};

export default QuizOption;
