import { IQuiz } from "@/interfaces/QuizInterfaces";
import { create } from "zustand";

interface QuizState {
  data: IQuiz;
  setData: (by: number) => void;
}

export const useQuizStore = create<QuizState>()((set) => ({
  data: 0,
  setData: (newData) => set((state) => ({ data: newData })),
}));
