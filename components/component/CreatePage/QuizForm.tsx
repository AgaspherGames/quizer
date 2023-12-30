"use client";
import React, { useEffect, useState } from "react";
import QuizInfo from "./Info/QuizInfo";
import AddQuestion from "./AddQuestion";
import QuestionsList from "./Lists/QuestionsList";
import Link from "next/link";
import { DropResult } from "react-beautiful-dnd";
import useCreateStore from "@/stores/CreateStore";
import Lottie from "lottie-react";
import anim from "@/public/animations/questionLoader.json";
import { redirect, useRouter } from "next/navigation";

interface QuizFormProps {
  quizId: number;
}

const QuizForm: React.FC<QuizFormProps> = ({ quizId }) => {
  const {
    questions,
    setQuestions,
    createQuiz,
    loadQuiz,
    quizId: id,
  } = useCreateStore((state) => state);
  const router = useRouter();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    console.log(source.index, destination.index);
    const newData = [...questions];
    const [item] = newData.splice(source.index, 1);
    newData.splice(destination.index, 0, item);

    setQuestions([...newData], Math.min(source.index, destination.index));
  };

  async function load() {
    const resp = await loadQuiz(quizId);

    if (!resp) {
      router.replace("/quiz");
    }
  }

  useEffect(() => {
    load();
    // redirect("/me");
  }, []);

  if (!id) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Lottie className="w-80 h-80" animationData={anim} />
      </div>
    );
  }

  return (
    <div className="relative w-full py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-black sm:bg-zinc-950 shadow-lg sm:rounded-3xl sm:p-20">
        <h1 className="text-4xl font-bold text-center mb-4">Создание теста</h1>
        <form>
          <QuizInfo />
          <AddQuestion index={0} />

          <QuestionsList onDragEnd={onDragEnd} questions={questions} />

          <Link
            href={`/quiz/${quizId}`}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
            type="button"
          >
            Просмотреть
          </Link>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
