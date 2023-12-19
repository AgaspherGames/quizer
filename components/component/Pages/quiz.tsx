"use client";
import { Button } from "@/components/ui/button";
import { useParsedQuestion, useQuiz } from "@/hooks/hooks";
import { useRouter } from "next/navigation";

import React, { useEffect, useMemo, useState } from "react";
import { motion, useCycle } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { sleep } from "@/utils/utils";
import {
  IAnswer,
  IQuestion,
  SaveResultRequest,
} from "@/interfaces/QuizInterfaces";
import Image from "next/image";
import QuizService from "@/services/QuizService";
import axios from "axios";
import { url } from "@/utils/http";
import QuizImage from "../Base/quiz-image";
import { useQuizStore } from "@/stores/QuizStore";
import LocalStorageService from "@/services/LocalStorageService";
import CustomInput from "../Base/CustomInput";

interface QuizProps {
  params: { id: string; questionId: string };
}

const panel = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};
const bg = {
  closed: {
    opacity: 0.5,
    translateY: -500,
    transition: {
      type: "spring",
    },
  },
  open: {
    opacity: 1,
    translateY: 0,
    transition: {
      type: "spring",
    },
  },
};

export const Quiz: React.FC<QuizProps> = ({ params }) => {
  const { selectedAnswers, setSelectedAnswers } = useQuizStore(
    (state) => state
  );
  const { questions } = useQuiz(params.id);
  const [isClosing, toggle] = useCycle(false, true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  const { isFirst, isLast, question, nextId, prevId } = useParsedQuestion(
    params.id,
    params.questionId
  );

  const router = useRouter();

  async function next() {
    await QuizService.saveResult(params.id, {
      attempt_id: +LocalStorageService.getItem<string>(
        `quizAttempt_${params.id}`
      ),
      answer_id: selectedItems[0],
      question_id: +params.questionId,
    });
    if (isLast) {
      return saveResults();
    }
    toggle();
    await sleep(300);

    router.replace(`/quiz/${params.id}/${nextId}`);
  }
  async function prev() {
    toggle();
    await sleep(300);
    router.push(`/quiz/${params.id}/${prevId}`);
  }

  function selectItem(id: number) {
    isSelected(id)
      ? setSelectedItems((prev) => prev.filter((x) => x != id))
      : setSelectedItems((prev) => [...prev, id]);
  }

  function isSelected(id: number) {
    const itemInd = selectedItems.findIndex((x) => x == id);
    return ~itemInd;
  }

  async function saveResults() {
    try {
      const resp = await QuizService.saveResults(params.id);
      toggle();
      await sleep(300);
      setSelectedAnswers({});
      router.replace(
        `congratulations?result=${resp.data.score}/${questions.length}`
      );
    } catch (error) {}
  }

  useEffect(() => {
    setSelectedAnswers({
      ...selectedAnswers,
      [params.questionId]: selectedItems,
    });
  }, [selectedItems]);

  useEffect(() => {
    QuizService.fetchAnswers(params.id, params.questionId).then((resp) =>
      setAnswers(resp.data)
    );
    const arr = selectedAnswers[`${params.questionId}`];
    setSelectedItems(arr || []);
  }, []);

  return (
    <motion.div
      animate={isClosing ? "closed" : "open"}
      className="min-h-screen bg-black text-white py-6 flex flex-col justify-center sm:py-12"
    >
      <div className="relative w-full py-3 sm:max-w-2xl lg:max-w-3xl sm:mx-auto">
        <motion.div className="absolute inset-0 hidden sm:block" variants={bg}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
            initial={{ rotate: "84deg", scale: 0.3 }}
            animate={{ rotate: "-6deg", scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
          />
        </motion.div>
        <motion.div
          initial={false}
          drag={true}
          dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
          className="relative px-2 py-6 bg-blakc shadow-lg sm:rounded-3xl sm:p-12 md:p-20 sm:bg-zinc-950"
        >
          <motion.div
            variants={panel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
          >
            <motion.div variants={panel}>
              <h1 className="text-4xl font-bold text-center mb-4">Quiz</h1>
              <div className="w-full flex justify-center my-2">
                <QuizImage image={question?.image} />
              </div>
              <div className="mb-5">
                <label className="block mb-4 text-center text-lg font-medium">
                  {question?.title}
                </label>
                <Answers
                  answers={answers}
                  isSelected={isSelected}
                  question={question}
                  selectItem={selectItem}
                />
                {/* {answers.map((el) => (
                    <button
                      key={el.id}
                      onClick={() => selectItem(el.id)}
                      type="button"
                      className={twMerge(
                        "w-full p-2 text-left rounded-lg bg-zinc-800 hover:bg-zinc-700 duration-200 transition-all sm:p-4",
                        isSelected(el.id) &&
                          "bg-zinc-700 ring-zinc-300 ring-opacity-50 ring-4 "
                      )}
                    >
                      {el.text}
                    </button>
                  ))} */}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {/* {!isFirst && (
                  <Button
                    onClick={prev}
                    className=" w-full py-3 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                    type="submit"
                  >
                    Назад
                  </Button>
                )} */}
                <Button
                  onClick={next}
                  className={twMerge(
                    "w-full py-3 bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg col-span-3"
                  )}
                  type="submit"
                >
                  {isLast ? "Отправить" : "Следующий"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface answersProps {
  question?: IQuestion;
  answers: IAnswer[];
  selectItem: (id: number) => void;
  isSelected: (id: number) => number;
}

const Answers: React.FC<answersProps> = ({
  question,
  answers,
  selectItem,
  isSelected,
}) => {
  if (question?.type == "choice") {
    return (
      <div className="gap-4 grid grid-cols-1 justify-center md:grid-cols-2">
        {answers.map((el) => (
          <button
            key={el.id}
            onClick={() => selectItem(el.id)}
            type="button"
            className={twMerge(
              "w-full p-2 text-left rounded-lg bg-zinc-800 hover:bg-zinc-700 duration-200 transition-all sm:p-4",
              isSelected(el.id) &&
                "bg-zinc-700 ring-zinc-300 ring-opacity-50 ring-4 "
            )}
          >
            {el.text}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="">
      <CustomInput className="w-full max-w-xs m-auto" />
    </div>
  );
};
