
import { Question } from "../types/quiz";

export const quizQuestions: Question[] = [
  {
    id: "q1",
    text: "Qual é sua principal necessidade ao buscar produtos de barbatimão?",
    options: [
      {
        id: "q1o1",
        text: "Cicatrização de feridas ou lesões na pele",
        value: "cicatrizacao",
      },
      {
        id: "q1o2",
        text: "Redução de inflamações e dores",
        value: "inflamacao",
      },
      {
        id: "q1o3",
        text: "Cuidados com a saúde íntima feminina",
        value: "saude-intima",
      },
      {
        id: "q1o4",
        text: "Fortalecimento do sistema imunológico",
        value: "imunidade",
      },
    ],
  },
  {
    id: "q2",
    text: "Você prefere produtos para uso tópico (externo) ou oral?",
    options: [
      {
        id: "q2o1",
        text: "Uso tópico (aplicação direta na pele)",
        value: "topico",
      },
      {
        id: "q2o2",
        text: "Uso oral (consumo por ingestão)",
        value: "oral",
      },
    ],
  },
  {
    id: "q3",
    text: "Com que frequência você pretende utilizar o produto?",
    options: [
      {
        id: "q3o1",
        text: "Diariamente, como parte da minha rotina",
        value: "diario",
      },
      {
        id: "q3o2",
        text: "Apenas quando necessário, em situações específicas",
        value: "ocasional",
      },
    ],
  },
  {
    id: "q4",
    text: "Você já teve alguma reação alérgica a produtos naturais anteriormente?",
    options: [
      {
        id: "q4o1",
        text: "Sim, tenho pele sensível ou histórico de alergias",
        value: "sim",
      },
      {
        id: "q4o2",
        text: "Não, nunca tive problemas com produtos naturais",
        value: "nao",
      },
    ],
  },
  {
    id: "q5",
    text: "Para qual faixa etária você está buscando este produto?",
    options: [
      {
        id: "q5o1",
        text: "Adultos jovens (18-35 anos)",
        value: "jovem",
      },
      {
        id: "q5o2",
        text: "Adultos (36-60 anos)",
        value: "adulto",
      },
      {
        id: "q5o3",
        text: "Idosos (acima de 60 anos)",
        value: "idoso",
      },
    ],
  },
  {
    id: "q6",
    text: "Qual formato de produto você prefere utilizar?",
    options: [
      {
        id: "q6o1",
        text: "Creme, gel ou pomada para aplicação local",
        value: "creme",
      },
      {
        id: "q6o2",
        text: "Cápsulas ou comprimidos para ingestão",
        value: "capsula",
      },
      {
        id: "q6o3",
        text: "Chá, extrato ou tintura líquida",
        value: "cha",
      },
    ],
  },
];
