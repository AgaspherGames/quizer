"use client";
import { IQuestion } from "@/interfaces/QuizInterfaces";
import QuizService from "@/services/QuizService";
import { useQuizStore } from "@/stores/QuizStore";
import { useEffect, useState } from "react";

export const useParsedQuestion = (questionId: string) => {
  const questions = useQuizStore((state) => state.questions);

  const [question, setQuestion] = useState<IQuestion>();
  const [isLast, setIsLast] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ind = questions.findIndex((x) => x.id == +questionId);
    setIsLast(ind == questions.length - 1);
    setIsFirst(ind == 0);
    setQuestion(questions.find((x) => x.id == +questionId));
    setProgress(ind / questions.length);
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
