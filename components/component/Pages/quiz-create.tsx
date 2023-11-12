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

export function QuizCreate() {
  const router = useRouter();
  const {
    questions,
    title,
    description,
    quizImage,
    setQuestions,
    setTitle,
    setDescription,
    setQuizImage,
    addQuestion,
    addAnswer,
    removeAnswer,
    removeQuestion,
    toggleAnswer,
    setQuestionTitle,
    setQuestionImage,
    setAnswerTitle,
    setAnswers,
  } = useQuizCreate();

  async function create() {
    const mappedQuestions = questions.map((el) => ({
      title: el.title,
      answers: el.answers,
    }));

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (quizImage) formData.append("image", quizImage);
    formData.append("questions", JSON.stringify(mappedQuestions));

    for (let index = 0; index < questions.length; index++) {
      const question = questions[index];
      question.image &&
        formData.append("question_img" + (index + 1), question.image);
    }

    try {
      const response = await QuizService.createQuiz(formData);
      router.push("/quiz/" + response.data.id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
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

  return (
    <div className="min-h-screen bg-black text-white py-6 flex flex-col justify-center sm:py-12">
      <div className="relative w-full py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-black sm:bg-zinc-950 shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-center mb-4">
            Создание теста
          </h1>
          <form>
            <QuizInfo
              setQuizImage={setQuizImage}
              setTitle={setTitle}
              setDescription={setDescription}
              quizImage={quizImage}
              title={title}
              description={description}
            />
            <AddQuestion addQuestion={addQuestion} index={0} />

            <QuestionsList
              setQuestionImage={setQuestionImage}
              setQuestionTitle={setQuestionTitle}
              setAnswerTitle={setAnswerTitle}
              toggleAnswer={toggleAnswer}
              removeAnswer={removeAnswer}
              removeQuestion={removeQuestion}
              addAnswer={addAnswer}
              setAnswers={setAnswers}
              addQuestion={addQuestion}
              onDragEnd={onDragEnd}
              questions={questions}
            />

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
      <div className="absolute top-6 left-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
}
