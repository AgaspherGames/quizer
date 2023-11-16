"use client";
import QuestionsList from "@/components/component/CreatePage/Lists/QuestionsList";
import { IQuestion } from "@/interfaces/QuizInterfaces";
import LocalStorageService from "@/services/LocalStorageService";
import QuizService from "@/services/QuizService";
import { useAuthStore } from "@/stores/AuthStore";
import { useQuizStore } from "@/stores/QuizStore";
import { useEffect, useState } from "react";

export const useDebounce = (cb: Function, delay = 500) => {
  const [timeout, settimeout] = useState<number | null>(null);
  return () => {
    if (timeout) clearTimeout(timeout);

    settimeout(setTimeout(cb, delay));
  };
};

export const useParsedQuestion = (quizId: string, questionId: string) => {
  const { questions } = useQuiz(quizId);

  const [question, setQuestion] = useState<IQuestion>();
  const [isLast, setIsLast] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (questions.length) {
      const ind = questions.findIndex((x) => x.id == +questionId);
      setIsLast(ind == questions.length - 1);
      setIsFirst(ind == 0);
      setQuestion(questions.find((x) => x.id == +questionId));
      setProgress(ind / questions.length);
    }
  }, [questionId, questions]);

  return { question, isLast, isFirst, progress };
};

export const useQuiz = (quizId: string) => {
  const {
    questionsList,
    quizList,
    addToQuizList,
    addToQuestionsList,
    isQuestionsPending,
    isQuizPending,
    setIsQuestionsPending,
    setIsQuizPending,
  } = useQuizStore((state) => state);

  async function fetchQuiz() {
    setIsQuizPending(true);
    const resp = await QuizService.fetchQuiz(quizId);
    setIsQuizPending(false);
    addToQuizList(resp.data);
  }
  async function fetchQuestions() {
    setIsQuestionsPending(true);
    const resp = await QuizService.fetchQuestions(quizId);
    setIsQuestionsPending(false);
    addToQuestionsList(quizId, resp.data);
  }

  useEffect(() => {
    if (!quizList[quizId] && !isQuizPending) fetchQuiz();
    if (!questionsList[quizId] && !isQuestionsPending) fetchQuestions();
  }, [quizId]);

  return { questions: questionsList[quizId] || [], quiz: quizList[quizId] };
};

export const useAuthState = () => {
  const { setToken, token } = useAuthStore((state) => state);
  useEffect(() => {
    setToken(LocalStorageService.getItem("TOKEN"));
  }, []);

  return { token };
};
