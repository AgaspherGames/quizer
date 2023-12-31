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
import QuizService from "@/services/QuizService";

export interface ICreateStore {
  quizId: number;
  questions: ICreateQuestion[];
  title: string;
  description: string;
  quizImage?: File | string;
  lastId: number;
  user_id: number;
  createQuiz: (title?: string) => void;
  loadQuiz: (quizId: number) => Promise<boolean>;
  generateId: () => number;
  setQuestions: (questions: ICreateQuestion[], index: number) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setQuizImage: (image: File | undefined) => void;
  addQuestion: (ind: number) => void;
  addAnswer: (question_id: number, pos: number) => void;
  removeAnswer: (question_id: number, answer_id: number) => void;
  removeQuestion: (question_id: number) => void;
  toggleAnswer: (question_id: number, pos: number) => void;
  setQuestionTitle: (question_id: number, text: string) => void;
  setQuestionType: (question_id: number, type: QuestionTypes) => void;
  setQuestionImage: (question_id: number, image?: File) => void;
  setAnswerTitle: (question_id: number, pos: number, text: string) => void;
  setAnswers: (
    question_id: number,
    answers: CreateAnswer[],
    index: number
  ) => void;
  editById: (quizId: number) => void;
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
  user_id: 0,
  createQuiz: async (title) => {
    const quizId = (await CreateQuizService.createQuiz(title || defaultTitle))
      .data.id;
    return quizId;
  },
  loadQuiz: async (quizId) => {
    try {
      set({ quizId: 0 });
      const { questions, quiz } = await QuizService.fetchEditQuizInfo(
        quizId + ""
      );
      set((state) => ({
        quizId,
        title: quiz.title,
        description: quiz.description,
        quizImage: quiz.image,
        questions,
        lastId: (questions[questions.length - 1]?.id || 0) + 1,
        user_id: quiz.user_id,
      }));
      return true;
    } catch (error) {
      return false;
    }
  },
  generateId: () => {
    let id = 0;
    set((state) => {
      id = state.lastId;

      return { lastId: state.lastId + 1 };
    });

    return id;
  },
  setQuestions: (newQuestions, index) => {
    newQuestions.toSpliced(0, index).map((el, ind) =>
      CreateQuizService.updateQuestionsOrder({
        order_id: ind + index,
        question_id: el.id,
      })
    );

    set({ questions: newQuestions });
  },
  setTitle: async (newTitle) => {
    set((state) => {
      debounce(() =>
        CreateQuizService.editQuiz({
          title: newTitle,
          description: state.description,
        })
      );
      return { title: newTitle };
    });
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
  addQuestion: async (ind) => {
    const { id } = (await CreateQuizService.createQuestion(ind)).data;
    set((state) => {
      const newQuestions = state.questions.toSpliced(ind, 0, {
        answers: [],
        title: "",
        id: id,
        type: "choice",
      });
      useCreateStore.getState().setQuestions(newQuestions, ind);
      return useCreateStore.getState();
    });
  },
  addAnswer: async (question_id, pos) => {
    const { id } = (await CreateQuizService.createAnswer(question_id, pos))
      .data;
    set((state) => {
      let newAnswers;
      state.questions.map((x) => {
        if (x.id === question_id) {
          newAnswers = x.answers.toSpliced(pos, 0, {
            is_correct: false,
            text: "",
            id,
          });
          x.answers = newAnswers;
        }
        return x;
      });

      useCreateStore.getState().setAnswers(question_id, newAnswers!, pos);
      return useCreateStore.getState();
    });
  },
  removeAnswer: (question_id, answer_id) => {
    CreateQuizService.removeAnswer(question_id, answer_id);
    set((state) => {
      const newQuestions = state.questions.map((x) => {
        if (x.id === question_id) {
          x.answers = x.answers.filter((x) => x.id != answer_id);
        }
        return x;
      });
      return { questions: newQuestions };
    });
  },
  removeQuestion: (question_id) => {
    CreateQuizService.removeQuestion(question_id);
    set((state) => ({
      questions: state.questions.filter((x) => x.id !== question_id),
    }));
  },
  toggleAnswer: (question_id, answer_id) =>
    set((state) => {
      const newQuestions = state.questions.map((x) => {
        if (x.id === question_id) {
          const answer = x.answers.find((x) => x.id == answer_id);
          answer!.is_correct = !answer!.is_correct;
          CreateQuizService.editAnswer(question_id, answer_id, {
            is_correct: answer?.is_correct,
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
  setAnswers: (question_id, answers, index) =>
    set((state) => {
      const newOrderRequest = answers.map((el, ind) => ({
        answer_id: el.id,
        order_id: ind,
      }));
      answers.toSpliced(0, index).map((el, ind) =>
        CreateQuizService.updateAnswersOrder(question_id, {
          answer_id: el.id,
          order_id: ind + index,
        })
      );

      return {
        questions: state.questions.map((x) => {
          if (x.id === question_id) {
            x.answers = [...answers];
          }
          return x;
        }),
      };
    }),
  editById: async (quizId) => {
    const quizData = await QuizService.fetchQuiz(quizId + "");
    const questions = await QuizService.fetchQuestions(quizId + "");

    set((state) => {
      return state;
    });
  },
}));

export default useCreateStore;
