'use client'
import QuizService from "@/services/QuizService";
import { useQuizStore } from "@/stores/QuizStore";
import { useEffect, useState } from "react";

export const useQuiz = (quizId: string) => {
  const { data, setData } = useQuizStore((state) => state);
  useEffect(() => {
    // QuizService.fetchQuiz(quizId).then((resp) => setData(resp.data));
  }, []);

  return data;
};
