
import React from "react";
import { useQuiz } from "../context/QuizContext";
import QuizOption from "./QuizOption";
import ProductCard from "./ProductCard";
import EmailForm from "./EmailForm";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Progress } from "../components/ui/progress";

const QuizContainer: React.FC = () => {
  const {
    currentQuestionIndex,
    answers,
    questions,
    isCompleted,
    recommendedProducts,
    setAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz,
  } = useQuiz();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (optionValue: string) => {
    setAnswer(currentQuestion.id, optionValue);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isOptionSelected = answers.some(
    (answer) => answer.questionId === currentQuestion?.id
  );

  const selectedOption = answers.find(
    (answer) => answer.questionId === currentQuestion?.id
  )?.selectedOption;

  if (isCompleted) {
    return (
      <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">
          Seus Resultados
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Com base nas suas respostas, recomendamos estes produtos:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isRecommended={index === 0}
              />
            ))}
          </div>
        </div>

        <EmailForm />

        <div className="text-center mt-8">
          <Button onClick={resetQuiz} variant="outline">
            Reiniciar Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </span>
          <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>

        <div className="mb-8">
          {currentQuestion.options.map((option) => (
            <QuizOption
              key={option.id}
              option={option}
              isSelected={selectedOption === option.value}
              onSelect={handleOptionSelect}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            onClick={previousQuestion}
            variant="outline"
            disabled={currentQuestionIndex === 0}
          >
            Anterior
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={completeQuiz}
              disabled={!isOptionSelected}
              className="bg-primary hover:bg-primary/90"
            >
              Ver Resultados
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={!isOptionSelected}
              className="bg-primary hover:bg-primary/90"
            >
              Próxima
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizContainer;
