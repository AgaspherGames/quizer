"use client";
import { IQuiz } from "@/interfaces/QuizInterfaces";
import QuizService from "@/services/QuizService";
import { useCallback, useEffect, useState } from "react";
import { Header } from "../Base/header";
import QuizItem from "../Quiz/QuizItem";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "@/hooks/hooks";
import QuizItemSkeleton from "../Quiz/QuizItemSkeleton";
import Lights, { LightProps } from "../Background/Lights";
import QuizListSkeleton from "../Quiz/QuizListSkeleton";

const lights: LightProps[] = [
  {
    color: "sky",
    pos: "opacity-50 top-0 left-0",
    size: "medium",
  },
  {
    color: "sky",
    pos: "opacity-50 top-3/4 left-3/4",
    size: "small",
  },
  {
    color: "teal",
    pos: "opacity-50 top-1/2 left-[20%]",
    size: "medium",
  },
  {
    color: "teal",
    pos: "opacity-50 top-1/3 right-0",
    size: "small",
    translateToRight: true,
  },
  {
    color: "sky",
    pos: "opacity-50 bottom-0 left-0",
    size: "medium",
    translateToBottom: true,
  },
];

export function Quizes() {
  const [isLoading, setIsLoading] = useState(true);
  const [quizes, setQuizes] = useState<IQuiz[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const updateQuizes = useDebounce(() => {
    QuizService.fetchQuizes(searchValue).then((resp) =>
      setQuizes(resp.data.quizzes)
    );
  }, 500);

  useEffect(() => {
    QuizService.fetchQuizes(searchValue).then((resp) => {
      setIsLoading(false);
      setQuizes(resp.data.quizzes);
    });
  }, []);
  useEffect(() => {
    updateQuizes();
  }, [searchValue]);

  return (
    <div>
      <Lights lights={lights} />
      <Header />
      <section className="z-10 w-full min-h-screen  text-white p-4 md:p-6 lg:p-8">
        <div>
          <div className="mx-auto w-1/2 max-w-xs px-4 py-2 bg-zinc-900 rounded-lg mb-8 flex items-center gap-2 border border-zinc-700">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-transparent w-full outline-none "
              type="text"
            />
            <FaSearch className="" />
          </div>
        </div>
        <div className="grid gap-6 md:gap-8 lg:gap-10 items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <QuizListSkeleton />
          ) : (
            quizes.map((el) => <QuizItem key={el.id} quiz={el} />)
          )}
        </div>
      </section>
    </div>
  );
}
