"use client";
import QuestionsList from "@/components/component/CreatePage/Lists/QuestionsList";
import { IQuestion } from "@/interfaces/QuizInterfaces";
import LocalStorageService from "@/services/LocalStorageService";
import QuizService from "@/services/QuizService";
import { useQuizStore } from "@/stores/QuizStore";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

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
  const [nextId, setNextId] = useState(0);
  const [prevId, setPrevId] = useState(0);

  useEffect(() => {
    if (questions.length) {
      const ind = questions.findIndex((x) => x.id == +questionId);
      setIsLast(ind == questions.length - 1);
      setIsFirst(ind == 0);
      setQuestion(questions[ind]);
      setProgress(ind / questions.length);
      setNextId(questions[ind + 1]?.id);
      setPrevId(questions[ind - 1]?.id);
    }
  }, [questionId, questions]);

  return { question, isLast, isFirst, progress, nextId, prevId };
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
  const [cookies] = useCookies(["isAuth"]);

  const [isAuthLoaded, setisAuthLoaded] = useState(false);

  useEffect(() => {
    setisAuthLoaded(true);
  }, []);

  return { isAuth: !!cookies.isAuth, isAuthLoaded };
};
