
import { Question } from "../types/quiz";

export const quizQuestions: Question[] = [
  {
    id: "q1",
    text: "Qual é sua principal necessidade ao usar produtos à base de barbatimão?",
    options: [
      {
        id: "q1o1",
        text: "Cicatrização de feridas",
        value: "cicatrizacao",
      },
      {
        id: "q1o2",
        text: "Redução de inflamações",
        value: "inflamacao",
      },
      {
        id: "q1o3",
        text: "Saúde íntima feminina",
        value: "saude-intima",
      },
      {
        id: "q1o4",
        text: "Outro",
        value: "outro",
      },
    ],
  },
  {
    id: "q2",
    text: "Você prefere produtos para uso tópico ou oral?",
    options: [
      {
        id: "q2o1",
        text: "Tópico (cremes, pomadas)",
        value: "topico",
      },
      {
        id: "q2o2",
        text: "Oral (chá, cápsulas)",
        value: "oral",
      },
    ],
  },
  {
    id: "q3",
    text: "Com que frequência você pretende usar o produto?",
    options: [
      {
        id: "q3o1",
        text: "Diariamente",
        value: "diario",
      },
      {
        id: "q3o2",
        text: "Apenas quando necessário",
        value: "ocasional",
      },
    ],
  },
  {
    id: "q4",
    text: "Você tem alergia a algum ingrediente natural?",
    options: [
      {
        id: "q4o1",
        text: "Sim",
        value: "sim",
      },
      {
        id: "q4o2",
        text: "Não",
        value: "nao",
      },
    ],
  },
  {
    id: "q5",
    text: "Para qual faixa etária você está buscando o produto?",
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
        text: "Idosos (+60 anos)",
        value: "idoso",
      },
    ],
  },
  {
    id: "q6",
    text: "Qual formato você prefere?",
    options: [
      {
        id: "q6o1",
        text: "Creme ou pomada",
        value: "creme",
      },
      {
        id: "q6o2",
        text: "Cápsulas ou comprimidos",
        value: "capsula",
      },
      {
        id: "q6o3",
        text: "Chá ou infusão",
        value: "cha",
      },
    ],
  },
];
