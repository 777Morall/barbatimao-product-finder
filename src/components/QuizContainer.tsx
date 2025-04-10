
import React from "react";
import { useQuiz } from "../context/QuizContext";
import QuizOption from "./QuizOption";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Progress } from "../components/ui/progress";
import { Share, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

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

  const isMobile = useIsMobile();
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

  const getWhatsAppMessage = () => {
    let message = "Olá! Realizei o quiz de produtos de barbatimão e gostaria de saber mais sobre o produto ideal para mim.";
    
    if (recommendedProducts.length > 0) {
      const topProduct = recommendedProducts[0];
      message += `\n\nMinha necessidade principal é: ${getAnswerText("q1")}`;
      message += `\n\nProduto recomendado: ${topProduct.name}`;
      message += "\n\nPoderia me dar mais informações sobre como este produto pode me ajudar?";
    }
    
    return encodeURIComponent(message);
  };
  
  const getAnswerText = (questionId: string) => {
    const answer = answers.find(a => a.questionId === questionId);
    if (!answer) return "";
    
    const question = questions.find(q => q.id === questionId);
    if (!question) return "";
    
    const option = question.options.find(o => o.value === answer.selectedOption);
    return option ? option.text : "";
  };

  if (isCompleted) {
    const whatsappLink = `https://wa.me/5511937587626?text=${getWhatsAppMessage()}`;
    
    return (
      <motion.div 
        className="animate-fade-in"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Resultado da sua Avaliação
        </h2>

        <div className="mb-8 text-center">
          <div className="bg-secondary/50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">
              Encontramos o produto de barbatimão ideal para você!
            </h3>
            <p className="mb-6 text-muted-foreground">
              Converse com nosso especialista para obter orientações personalizadas sobre como o barbatimão pode auxiliar em suas necessidades específicas de saúde.
            </p>
            
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
              <Button className="w-full sm:w-auto gap-2 py-6 text-lg rounded-full bg-green-600 hover:bg-green-700 transition-all hover:shadow-lg hover:scale-105">
                <MessageCircle className="h-5 w-5" />
                Falar com Especialista
              </Button>
            </a>
          </div>
          
          <div className="mt-8 flex flex-col items-center">
            <p className="mb-4 text-muted-foreground">Compartilhe este quiz com quem precisa:</p>
            <div className="flex gap-3">
              <Button onClick={() => window.navigator.share({
                title: 'Quiz Barbatimão de Alagoas',
                text: 'Descubra qual produto de barbatimão é ideal para você e seus benefícios para a saúde!',
                url: window.location.href,
              })} variant="outline" size="icon" className="rounded-full w-10 h-10">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button onClick={resetQuiz} variant="outline">
            Refazer Quiz
          </Button>
        </div>
      </motion.div>
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
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>

        <div className="space-y-3 mb-8">
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
            className="px-4 py-2 flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Anterior
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={completeQuiz}
              disabled={!isOptionSelected}
              className="bg-primary hover:bg-primary/90 px-4 py-2 flex items-center"
            >
              Ver Resultados
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={!isOptionSelected}
              className="bg-primary hover:bg-primary/90 px-4 py-2 flex items-center"
            >
              Próxima
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizContainer;
