"use client";
import QuestionsList from "@/components/component/CreatePage/Lists/QuestionsList";
import { IQuestion } from "@/interfaces/QuizInterfaces";
import LocalStorageService from "@/services/LocalStorageService";
import QuizService from "@/services/QuizService";
import { useAuthStore } from "@/stores/AuthStore";
import { useQuizStore } from "@/stores/QuizStore";
import { useEffect, useState } from "react";

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

export const useQuestions = (quizId: string) => {
  const { questions, setQuestions, selectedAnswers, setSelectedAnswers } =
    useQuizStore((state) => state);
  useEffect(() => {
    QuizService.fetchQuestions(quizId).then((resp) => setQuestions(resp.data));
  }, []);

  return { questions, selectedAnswers, setSelectedAnswers };
};

export const useQuiz = (quizId: string) => {
  const { questionsList, quizList, addToQuizList, addToQuestionsList } =
    useQuizStore((state) => ({
      questionsList: state.questionsList,
      quizList: state.quizList,
      addToQuizList: state.addToQuizList,
      addToQuestionsList: state.addToQuestionsList,
    }));

  async function fetchQuiz() {
    const resp = await QuizService.fetchQuiz(quizId);
    addToQuizList(resp.data);
  }
  async function fetchQuestions() {
    const resp = await QuizService.fetchQuestions(quizId);
    addToQuestionsList(quizId, resp.data);
  }

  useEffect(() => {
    if (!quizList[quizId]) fetchQuiz();
    if (!questionsList[quizId]) fetchQuestions();
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
