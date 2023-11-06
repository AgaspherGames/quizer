import { IQuestion, IQuiz, ISelectedAnswer } from "@/interfaces/QuizInterfaces";
import { create } from "zustand";

interface QuizState {
  isQuizPending: boolean;
  isQuestionsPending: boolean;
  questionsList: { [key: string]: IQuestion[] };
  quizList: { [key: string]: IQuiz };
  selectedAnswers: ISelectedAnswer;
  addToQuestionsList: (quizId: string, questions: IQuestion[]) => void;
  addToQuizList: (quiz: IQuiz) => void;
  setIsQuizPending: (isQuizPending: boolean) => void;
  setIsQuestionsPending: (isQuestionsPending: boolean) => void;
  setSelectedAnswers: (selectedAnswers: ISelectedAnswer) => void;
}

export const useQuizStore = create<QuizState>()((set) => ({
  isQuizPending: false,
  isQuestionsPending: false,
  questionsList: {},
  quizList: {},
  selectedAnswers: {},
  addToQuizList: (quiz) =>
    set((state) => ({
      quizList: { ...state.quizList, [quiz.id]: quiz },
    })),
  addToQuestionsList: (quizId, questions) =>
    set((state) => ({
      questionsList: { ...state.questionsList, [quizId]: questions },
    })),
  setIsQuizPending: (isQuizPending) => set(() => ({ isQuizPending })),
  setIsQuestionsPending: (isQuestionsPending) =>
    set(() => ({ isQuestionsPending })),
  setSelectedAnswers: (selectedAnswers) => set(() => ({ selectedAnswers })),
}));
