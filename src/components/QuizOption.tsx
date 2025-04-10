
import React from "react";
import { Option } from "../types/quiz";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

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
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "quiz-option border rounded-lg p-4 transition-all cursor-pointer",
        isSelected 
          ? "selected border-primary bg-primary/10" 
          : "hover:border-primary/50 hover:bg-primary/5"
      )}
      onClick={() => onSelect(option.value)}
    >
      <div className="flex items-center">
        <div
          className={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center mr-3",
            isSelected 
              ? "bg-primary border-primary" 
              : "border-gray-300 bg-transparent"
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
    </motion.div>
  );
};

export default QuizOption;
