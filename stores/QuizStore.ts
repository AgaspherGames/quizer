import { IQuestion, IQuiz, ISelectedAnswer } from "@/interfaces/QuizInterfaces";
import { create } from "zustand";

interface QuizState {
  questionsList: { [key: string]: IQuestion[] };
  quizList: { [key: string]: IQuiz };
  currentQuestion: number;
  quizId: string;
  questions: IQuestion[];
  selectedAnswers: ISelectedAnswer;
  addToQuestionsList: (quizId: string, questions: IQuestion[]) => void;
  addToQuizList: (quiz: IQuiz) => void;
  setQuizId: (quizId: string) => void;
  setQuestions: (questions: IQuestion[]) => void;
  setCurrentQuestion: (currentQuestion: number) => void;
  setSelectedAnswers: (selectedAnswers: ISelectedAnswer) => void;
}

export const useQuizStore = create<QuizState>()((set) => ({
  questionsList: {},
  quizList: {},
  quizId: "",
  questions: [],
  currentQuestion: NaN,
  selectedAnswers: {},
  addToQuizList: (quiz) =>
    set((state) => ({
      quizList: { ...state.quizList, [quiz.id]: quiz },
    })),
  addToQuestionsList: (quizId, questions) =>
    set((state) => ({
      questionsList: { ...state.questionsList, [quizId]: questions },
    })),
  setQuizId: (quizId) => set((state) => ({ quizId })),
  setQuestions: (questions) => set((state) => ({ questions })),
  setCurrentQuestion: (currentQuestion) => set(() => ({ currentQuestion })),
  setSelectedAnswers: (selectedAnswers) => set(() => ({ selectedAnswers })),
}));
