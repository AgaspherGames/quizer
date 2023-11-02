import { IQuestion, IQuiz, ISelectedAnswer } from "@/interfaces/QuizInterfaces";
import { create } from "zustand";

interface QuizState {
  currentQuestion: number;
  quizId: string;
  questions: IQuestion[];
  selectedAnswers: ISelectedAnswer;
  setQuizId: (quizId: string) => void;
  setQuestions: (questions: IQuestion[]) => void;
  setCurrentQuestion: (currentQuestion: number) => void;
  setSelectedAnswers: (selectedAnswers: ISelectedAnswer) => void;
}

export const useQuizStore = create<QuizState>()((set) => ({
  quizId: "",
  questions: [],
  currentQuestion: NaN,
  selectedAnswers: {},
  setQuizId: (quizId) => set((state) => ({ quizId })),
  setQuestions: (questions) => set((state) => ({ questions })),
  setCurrentQuestion: (currentQuestion) => set(() => ({ currentQuestion })),
  setSelectedAnswers: (selectedAnswers) => set(() => ({ selectedAnswers })),
}));
