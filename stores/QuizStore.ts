import { IQuestion, IQuiz } from "@/interfaces/QuizInterfaces";
import { create } from "zustand";

interface QuizState {
  data: IQuiz;
  currentQuestion: number;
  quizId: string;
  questions: IQuestion[];
  setData: (newData: number) => void;
  setQuizId: (quizId: string) => void;
  setQuestions: (questions: IQuestion[]) => void;
  setCurrentQuestion: (currentQuestion: number) => void;
}

export const useQuizStore = create<QuizState>()((set) => ({
  data: 0,
  quizId: "",
  questions: [],
  currentQuestion: NaN,
  setData: (newData) => set((state) => ({ data: newData })),
  setQuizId: (quizId) => set((state) => ({ quizId })),
  setQuestions: (questions) => set((state) => ({ questions })),
  setCurrentQuestion: (currentQuestion) => set(() => ({ currentQuestion })),
}));
