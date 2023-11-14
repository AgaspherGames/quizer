import { CreateAnswer, ICreateQuestion } from "@/interfaces/QuizInterfaces";
import * as React from "react";

export const AnswerContext = React.createContext<{
  answer: CreateAnswer;
  index: number;
} | null>(null);
