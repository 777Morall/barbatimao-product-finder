
import React, { useState } from "react";
import { QuizProvider } from "../context/QuizContext";
import QuizContainer from "../components/QuizContainer";
import VideoPresentation from "../components/VideoPresentation";

const Index = () => {
  const [videoCompleted, setVideoCompleted] = useState(false);

  const handleVideoComplete = () => {
    setVideoCompleted(true);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <img 
              src="https://barbatimaodealagoas.com.br/wp-content/uploads/2022/08/HPV-CURA-LOGO-FINAL2-1024x755.png" 
              alt="Barbatimão Logo" 
              className="h-24 md:h-32 w-auto"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Qual produto de barbatimão é ideal para você?
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Responda a algumas perguntas simples e descubra o melhor produto 
            de barbatimão para suas necessidades específicas.
          </p>
        </header>

        {!videoCompleted ? (
          <VideoPresentation onComplete={handleVideoComplete} />
        ) : (
          <div className="quiz-container shadow-lg animate-fade-in">
            <QuizProvider>
              <QuizContainer />
            </QuizProvider>
          </div>
        )}

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
