import { ICreateQuestion } from "@/interfaces/QuizInterfaces";
import * as React from "react";

export const QuestionContext = React.createContext<ICreateQuestion | null>(
  null
);
