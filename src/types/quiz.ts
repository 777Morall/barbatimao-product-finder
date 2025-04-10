
export type Option = {
  id: string;
  text: string;
  value: string;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
};

export type Answer = {
  questionId: string;
  selectedOption: string;
};
