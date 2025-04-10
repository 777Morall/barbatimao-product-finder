
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useQuiz } from "../context/QuizContext";

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { submitEmail } = useQuiz();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Por favor, informe seu e-mail");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Por favor, informe um e-mail válido");
      return;
    }

    submitEmail(email);
    setEmail("");
    setError("");
  };

  return (
    <div className="bg-secondary/50 rounded-lg p-6 my-6">
      <h3 className="text-xl font-semibold mb-3">Receba dicas exclusivas sobre Barbatimão</h3>
      <p className="text-muted-foreground mb-4">
        Inscreva-se para receber informações, promoções e dicas de uso dos produtos de barbatimão.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error ? "border-red-500" : ""}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <Button type="submit">Inscrever-se</Button>
      </form>
    </div>
  );
};

export default EmailForm;
