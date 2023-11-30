"use client";
import { Button } from "@/components/ui/button";
import AddQuestion from "../CreatePage/AddQuestion";
import React, { useEffect, useState } from "react";
import { CreateAnswer, ICreateQuestion } from "@/interfaces/QuizInterfaces";
import QuizService from "@/services/QuizService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../Base/Logo";
import { DropResult } from "react-beautiful-dnd";
import QuestionsList from "../CreatePage/Lists/QuestionsList";
import QuizInfo from "../CreatePage/Info/QuizInfo";
import { useQuizCreate } from "@/hooks/useQuizCreate";
import useCreateStore from "@/stores/CreateStore";
import Modal from "../Modal/Modal";
import CustomInput from "../Base/CustomInput";

export function QuizCreate() {
  const router = useRouter();
  const {
    questions,
    title,
    description,
    quizImage,
    setQuestions,
    createQuiz,
    quizId,
  } = useCreateStore((state) => state);

  async function create() {
    await createQuiz(quizTitle);
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

  // useEffect(() => {
  //   createQuiz();
  // }, []);

  return (
    <div className="min-h-screen bg-black text-white py-6 flex flex-col justify-center sm:py-12">
      <Modal
        isOpen={isModalOpen}
        close={() => {}}
        className="bg-black bg-opacity-25"
      >
        <div className="absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2 text-white">
          <div className="relative w-full py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-black sm:bg-zinc-950 shadow-lg sm:rounded-3xl sm:p-20">
              <h1 className="text-4xl font-bold text-center mb-4 ">
                Создание теста
              </h1>
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
          </div>
        </div>
      </Modal>
      {quizId && (
        <div className="relative w-full py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-black sm:bg-zinc-950 shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="text-4xl font-bold text-center mb-4">
              Создание теста
            </h1>
            <form>
              <QuizInfo />
              <AddQuestion index={0} />

              <QuestionsList onDragEnd={onDragEnd} questions={questions} />

              <Button
                onClick={create}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                type="button"
              >
                Создать
              </Button>
            </form>
          </div>
        </div>
      )}
      <div className="absolute top-6 left-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
}
