import { useDebounce } from "@/hooks/hooks";
import {
  CreateAnswer,
  ICreateQuestion,
  QuestionTypes,
} from "@/interfaces/QuizInterfaces";
import CreateQuizService from "@/services/CreateQuizService";
import { useEffect } from "react";
import { create } from "zustand";
import _debounce from "lodash.debounce";

export interface ICreateStore {
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

const debounce = _debounce((cb) => {
  cb();
}, 500);
const defaultTitle = "Тест";

const useCreateStore = create<ICreateStore>((set) => ({
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
  setTitle: async (newTitle) => {
    debounce(() => CreateQuizService.editQuiz({ title: newTitle }));
    set({ title: newTitle });
  },
  setDescription: (newDescription) => {
    debounce(() => CreateQuizService.editQuiz({ description: newDescription }));
    set({ description: newDescription });
  },
  setQuizImage: (newImage) => {
    if (newImage) {
      const data = new FormData();
      data.append("image", newImage);
      CreateQuizService.uploadQuizImage(data);
    } else {
      CreateQuizService.removeQuizImage();
    }
    return set({ quizImage: newImage });
  },
  addQuestion: async (ind) =>
    //TODO: place to order
    {
      const { id } = (await CreateQuizService.createQuestion()).data;
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
  addAnswer: async (question_id, pos) => {
    //TODO: place to order
    const { id } = (await CreateQuizService.createAnswer(question_id, pos))
      .data;
    set((state) => {
      const newQuestions = state.questions.map((x, ind) => {
        if (x.id === question_id) {
          x.answers = x.answers.toSpliced(pos, 0, {
            is_correct: false,
            text: "",
            id,
          });
        }
        return x;
      });
      return { questions: newQuestions };
    });
  },
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
  toggleAnswer: (question_id, answer_id) =>
    set((state) => {
      const newQuestions = state.questions.map((x) => {
        if (x.id === question_id) {
          const answer = x.answers.find((x) => x.id == answer_id);
          answer!.is_correct = !answer!.is_correct;
          debounce(() => {
            CreateQuizService.editAnswer(question_id, answer_id, {
              is_correct: answer?.is_correct,
            });
          });
        }
        return x;
      });
      return { questions: newQuestions };
    }),
  setQuestionTitle: async (question_id, text) => {
    set((state) => {
      debounce(() => {
        CreateQuizService.editQuestion(question_id, {
          title: text,
          type: state.questions.find((x) => x.id == question_id)?.type,
        });
      });
      return {
        questions: state.questions.map((x) => {
          if (x.id === question_id) {
            x.title = text;
          }
          return x;
        }),
      };
    });
  },
  setQuestionType: (question_id, type) =>
    set((state) => ({
      questions: state.questions.map((x) => {
        if (x.id === question_id) {
          debounce(() => {
            CreateQuizService.editQuestion(question_id, {
              title: x.title,
              type: x.type,
            });
          });
          x.type = type;
        }
        return x;
      }),
    })),
  setQuestionImage: (question_id, image) => {
    if (image) {
      const data = new FormData();
      data.append("image", image);
      CreateQuizService.uploadQuestionImage(question_id, data);
    } else {
      CreateQuizService.removeQuestionImage(question_id);
    }
    set((state) => ({
      questions: state.questions.map((x) => {
        if (x.id === question_id) {
          x.image = image;
        }
        return x;
      }),
    }));
  },
  setAnswerTitle: (question_id, answer_id, text) =>
    set((state) => {
      debounce(() => {
        CreateQuizService.editAnswer(question_id, answer_id, { text });
      });
      return {
        questions: state.questions.map((x) => {
          if (x.id === question_id) {
            x.answers.find((x) => x.id == answer_id)!.text = text;
          }
          return x;
        }),
      };
    }),
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
