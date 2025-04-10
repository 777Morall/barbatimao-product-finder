
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Question, Answer, Product } from "../types/quiz";
import { quizQuestions } from "../data/quizQuestions";
import { products } from "../data/products";
import { toast } from "../hooks/use-toast";

type QuizContextType = {
  currentQuestionIndex: number;
  answers: Answer[];
  questions: Question[];
  isCompleted: boolean;
  recommendedProducts: Product[];
  setAnswer: (questionId: string, optionValue: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  submitEmail: (email: string) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const questions = quizQuestions;

  const setAnswer = (questionId: string, optionValue: string) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(
      (answer) => answer.questionId === questionId
    );

    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = {
        questionId,
        selectedOption: optionValue,
      };
    } else {
      newAnswers.push({
        questionId,
        selectedOption: optionValue,
      });
    }

    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const findRecommendedProducts = () => {
    // Algoritmo simples de pontuação para os produtos
    const productScores: Record<string, number> = {};
    
    // Inicializa pontuação para todos os produtos
    products.forEach(product => {
      productScores[product.id] = 0;
    });

    // Processa as respostas para atribuir pontuações
    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) return;

      products.forEach(product => {
        // Lógica de pontuação baseada nas respostas
        if (answer.questionId === "q1") {
          // Necessidade principal
          if (product.tags.includes(answer.selectedOption)) {
            productScores[product.id] += 3;
          }
        } 
        else if (answer.questionId === "q2") {
          // Uso tópico ou oral
          if (product.tags.includes(answer.selectedOption)) {
            productScores[product.id] += 2;
          }
        }
        else if (answer.questionId === "q3") {
          // Frequência de uso
          if (product.tags.includes(answer.selectedOption)) {
            productScores[product.id] += 1;
          }
        }
        else if (answer.questionId === "q5") {
          // Faixa etária
          if (product.tags.includes(answer.selectedOption)) {
            productScores[product.id] += 1;
          }
        }
        else if (answer.questionId === "q6") {
          // Formato preferido
          if (product.tags.includes(answer.selectedOption)) {
            productScores[product.id] += 2;
          }
        }
      });
    });

    // Ordena os produtos por pontuação
    const sortedProducts = products
      .map(product => ({
        product,
        score: productScores[product.id]
      }))
      .sort((a, b) => b.score - a.score)
      .map(({ product }) => product);

    // Retorna os 3 produtos mais recomendados
    return sortedProducts.slice(0, 3);
  };

  const completeQuiz = () => {
    const recommended = findRecommendedProducts();
    setRecommendedProducts(recommended);
    setIsCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
    setRecommendedProducts([]);
  };

  const submitEmail = (email: string) => {
    // Aqui você pode implementar a lógica para enviar o email para um servidor
    // Por enquanto, vamos apenas mostrar um toast
    toast({
      title: "E-mail registrado com sucesso!",
      description: "Você receberá dicas exclusivas e descontos em breve.",
    });
  };

  return (
    <QuizContext.Provider
      value={{
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
        submitEmail,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
