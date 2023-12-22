"use client";
import { Button } from "@/components/ui/button";
import AddQuestion from "../CreatePage/AddQuestion";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "../Base/Logo";
import { DropResult } from "react-beautiful-dnd";
import QuestionsList from "../CreatePage/Lists/QuestionsList";
import QuizInfo from "../CreatePage/Info/QuizInfo";
import useCreateStore from "@/stores/CreateStore";
import Modal from "../Modal/Modal";
import CustomInput from "../Base/CustomInput";
import { useRouter } from "next/navigation";

export function QuizCreate() {
  const { questions, setQuestions, createQuiz, quizId } = useCreateStore(
    (state) => state
  );
  const router = useRouter();

  async function create() {
    const id = await createQuiz(quizTitle);
    router.push(`/quiz/${id}/edit`);
    setIsModalOpen(false);
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const newData = [...questions];
      const [item] = newData.splice(source.index, 1);
      newData.splice(destination.index, 0, item);
      setQuestions([...newData]);
    } else {
      const newData = [...questions];
      const [item] = newData.splice(source.index, 1);
      newData.splice(destination.index, 0, item);
      setQuestions([...newData]);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [quizTitle, setQuizTitle] = useState("");

  return (
    <div className="min-h-screen bg-black text-white py-6 flex flex-col justify-center sm:py-12">
      <div className="relative px-4 py-10 bg-black sm:bg-zinc-950 shadow-lg sm:rounded-3xl sm:p-20 w-full sm:max-w-xl sm:mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 ">Создание теста</h1>
        <form>
          <CustomInput
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Название теста"
          />
          <Button
            onClick={create}
            className="mt-4 w-full py-3 bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
            type="button"
          >
            Создать
          </Button>
        </form>
      </div>
      <div className="absolute top-6 left-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
}
