"use client";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import CreateField from "./CreatePage/CreateField";
import CreateQuestion from "./CreatePage/CreateQuestion";
import AddQuestion from "./CreatePage/AddQuestion";
import React, { useState } from "react";
import { ICreateQuestion } from "@/interfaces/QuizInterfaces";
import { motion } from "framer-motion";
import QuizService from "@/services/QuizService";
import CreateImage from "./CreatePage/CreateImage";

export function QuizCreate() {
  const [questions, setQuestions] = useState<ICreateQuestion[]>([]);
  const [idCount, setIdCount] = useState<number>(0);
  const [quizImage, setQuizImage] = useState<File>();

  function generateId() {
    setIdCount((p) => p + 1);
    return idCount;
  }

  function addQuestion(ind: number) {
    const id = generateId();
    setQuestions((prev) =>
      prev.toSpliced(ind, 0, { answers: [], title: "", id })
    );
  }
  function addAnswer(question_id: number, pos: number) {
    const id = generateId();
    const newQuestions = questions.map((x, ind) => {
      if (x.id == question_id) {
        x.answers = x.answers.toSpliced(pos, 0, {
          is_correct: false,
          text: "",
          id,
        });
      }
      return x;
    });
    setQuestions(newQuestions);
  }
  function removeAnswer(question_id: number, pos: number) {
    const newQuestions = questions.map((x) => {
      if (x.id == question_id) {
        x.answers = x.answers.toSpliced(pos, 1);
      }
      return x;
    });
    setQuestions(newQuestions);
  }
  function removeQuestion(question_id: number) {
    const newQuestions = questions.filter((x) => x.id != question_id);
    setQuestions(newQuestions);
  }
  function toggleAnswer(question_id: number, pos: number) {
    const newQuestions = questions.map((x) => {
      if (x.id == question_id) {
        x.answers[pos].is_correct = !x.answers[pos].is_correct;
      }
      return x;
    });
    setQuestions(newQuestions);
  }
  function setQuestionTitle(question_id: number, text: string) {
    const newQuestions = questions.map((x) => {
      if (x.id == question_id) {
        x.title = text;
      }
      return x;
    });
    setQuestions(newQuestions);
  }
  function setQuestionImage(question_id: number, image: File) {
    const newQuestions = questions.map((x) => {
      if (x.id == question_id) {
        x.image = image;
      }
      return x;
    });
    setQuestions(newQuestions);
  }
  function setAnswerTitle(question_id: number, pos: number, text: string) {
    const newQuestions = questions.map((x) => {
      if (x.id == question_id) {
        x.answers[pos].text = text;
      }
      return x;
    });
    setQuestions(newQuestions);
  }

  async function create() {
    console.log(questions);

    const formData = new FormData();
    formData.append("title", "aa");
    formData.append("description", "aba");
    formData.append("questions", JSON.stringify(questions));
    for (const question of questions) {
      question.image && formData.append("question_img1", question.image);
    }
    const response = await QuizService.createQuiz(formData);
    return response.data;
  }

  return (
    <div className="min-h-screen bg-black text-white py-6 flex flex-col justify-center sm:py-12">
      <div className="relative w-full py-3 sm:max-w-xl sm:mx-auto">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" /> */}
        <div className="relative px-4 py-10 bg-zinc-950 shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-center mb-4">
            Создание теста
          </h1>
          <form>
            <div className="mb-5">
              {quizImage && (
                <CreateImage
                  clear={() => {
                    setQuizImage(undefined);
                  }}
                  image={quizImage}
                  height="10rem"
                />
              )}
              <label className="block font-medium mb-2">Название</label>
              <div className="relative">
                <Input
                  className="w-full px-4 py-6 bg-zinc-900 rounded-lg focus:border-transparent pr-10"
                  placeholder="Enter Quiz Name"
                  type="text"
                />
                <div className="absolute top-1/2 -translate-y-1/2 right-4">
                  <button type="button">
                    <label className="absolute inset-0 opacity-0 cursor-pointer text-white">
                      {/* IMPORTANT */}
                      .
                      <input
                        onChange={(e) => {
                          e.target.files?.length &&
                            setQuizImage(e.target.files[0]);
                        }}
                        type="file"
                      />
                    </label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="relative mt-4">
                <label className="block font-medium mb-2">Описание</label>
                <textarea
                  className="w-full px-4 py-4 bg-zinc-900 rounded-lg focus:border-transparent"
                  placeholder="Enter Quiz Name"
                />
              </div>
            </div>
            <AddQuestion addQuestion={addQuestion} index={0} />
            {questions.map((el, ind) => (
              <React.Fragment key={el.id}>
                <CreateQuestion
                  setQuestionImage={setQuestionImage}
                  setQuestionTitle={setQuestionTitle}
                  setAnswerTitle={setAnswerTitle}
                  toggleAnswer={toggleAnswer}
                  removeAnswer={removeAnswer}
                  removeQuestion={removeQuestion}
                  addAnswer={addAnswer}
                  question={el}
                  key={el.id}
                />
                <AddQuestion addQuestion={addQuestion} index={ind + 1} />
              </React.Fragment>
            ))}
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
    </div>
  );
}
