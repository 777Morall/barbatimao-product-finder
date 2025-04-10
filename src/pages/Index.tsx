
import React from "react";
import { QuizProvider } from "../context/QuizContext";
import QuizContainer from "../components/QuizContainer";
import { Leaf } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Qual produto de barbatimão é ideal para você?
          </h1>
          <p className="text-muted-foreground">
            Responda a algumas perguntas simples e descubra o melhor produto 
            de barbatimão para suas necessidades específicas.
          </p>
        </header>

        <div className="quiz-container">
          <QuizProvider>
            <QuizContainer />
          </QuizProvider>
        </div>

        <footer className="text-center mt-10 text-sm text-muted-foreground">
          <p>
            © 2024 Barbatimão de Alagoas. Todos os direitos reservados.
          </p>
          <p className="mt-2">
            <a
              href="https://barbatimaodealagoas.com.br/oficialinsta3k/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Visite nossa loja
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
