import {
  CreateAnswer,
  ICreateQuestion,
  QuestionTypes,
} from "@/interfaces/QuizInterfaces";
import CreateQuizService from "@/services/CreateQuizService";
import { create } from "zustand";

interface Store {
  quizId: number;
  questions: ICreateQuestion[];
  title: string;
  description: string;
  quizImage?: File;
  lastId: number;
  createQuiz: () => void;
  generateId: () => number;
  setQuestions: (questions: ICreateQuestion[]) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setQuizImage: (image: File | undefined) => void;
  addQuestion: (ind: number) => void;
  addAnswer: (question_id: number, pos: number) => void;
  removeAnswer: (question_id: number, pos: number) => void;
  removeQuestion: (question_id: number) => void;
  toggleAnswer: (question_id: number, pos: number) => void;
  setQuestionTitle: (question_id: number, text: string) => void;
  setQuestionType: (question_id: number, type: QuestionTypes) => void;
  setQuestionImage: (question_id: number, image?: File) => void;
  setAnswerTitle: (question_id: number, pos: number, text: string) => void;
  setAnswers: (question_id: number, answers: CreateAnswer[]) => void;
}

const defaultTitle = "Тест";

const useCreateStore = create<Store>((set) => ({
  quizId: 0,
  questions: [],
  title: defaultTitle,
  description: "",
  quizImage: undefined,
  lastId: 1,
  createQuiz: async () => {
    const quizId = (await CreateQuizService.createQuiz(defaultTitle)).data.id;
    set((state) => ({ quizId }));
  },
  generateId: () => {
    let id = 0;
    set((state) => {
      id = state.lastId;

      return { lastId: state.lastId + 1 };
    });

    return id;
  },
  setQuestions: (newQuestions) => set({ questions: newQuestions }),
  setTitle: (newTitle) => set({ title: newTitle }),
  setDescription: (newDescription) => set({ description: newDescription }),
  setQuizImage: (newImage) => set({ quizImage: newImage }),
  addQuestion: async (ind) =>
    //TODO: place to order
    {
      let quizId = useCreateStore.getState().quizId;
      const { id } = (await CreateQuizService.createQuestion(quizId)).data;
      set((state) => {
        return {
          questions: state.questions.toSpliced(ind, 0, {
            answers: [],
            title: "",
            id: id,
            type: "choice",
          }),
        };
      });
    },
  addAnswer: (question_id, pos) =>
    set((state) => {
      const newQuestions = state.questions.map((x, ind) => {
        if (x.id === question_id) {
          x.answers = x.answers.toSpliced(pos, 0, {
            is_correct: false,
            text: "",
            id: state.generateId(),
          });
        }
        return x;
      });
      return { questions: newQuestions };
    }),
  removeAnswer: (question_id, pos) =>
    set((state) => {
      const newQuestions = state.questions.map((x) => {
        if (x.id === question_id) {
          x.answers = x.answers.toSpliced(pos, 1);
        }
        return x;
      });
      return { questions: newQuestions };
    }),
  removeQuestion: (question_id) =>
    set((state) => ({
      questions: state.questions.filter((x) => x.id !== question_id),
    })),
  toggleAnswer: (question_id, pos) =>
    set((state) => {
      const newQuestions = state.questions.map((x) => {
        if (x.id === question_id) {
          x.answers[pos].is_correct = !x.answers[pos].is_correct;
        }
        return x;
      });
      return { questions: newQuestions };
    }),
  setQuestionTitle: (question_id, text) =>
    set((state) => ({
      questions: state.questions.map((x) => {
        if (x.id === question_id) {
          x.title = text;
        }
        return x;
      }),
    })),
  setQuestionType: (question_id, type) =>
    set((state) => ({
      questions: state.questions.map((x) => {
        if (x.id === question_id) {
          x.type = type;
        }
        return x;
      }),
    })),
  setQuestionImage: (question_id, image) =>
    set((state) => ({
      questions: state.questions.map((x) => {
        if (x.id === question_id) {
          x.image = image;
        }
        return x;
      }),
    })),
  setAnswerTitle: (question_id, pos, text) =>
    set((state) => ({
      questions: state.questions.map((x) => {
        if (x.id === question_id) {
          x.answers[pos].text = text;
        }
        return x;
      }),
    })),
  setAnswers: (question_id, answers) =>
    set((state) => ({
      questions: state.questions.map((x) => {
        if (x.id === question_id) {
          x.answers = [...answers];
        }
        return x;
      }),
    })),
}));

export default useCreateStore;
