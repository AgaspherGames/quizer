import { IQuiz } from "@/interfaces/QuizInterfaces";
import Link from "next/link";
import React from "react";
import QuizImage from "../Base/quiz-image";
import { IResult } from "@/interfaces/UserInterfaces";
interface ResultItemProps {
  result: IResult;
}

const ResultItem: React.FC<ResultItemProps> = ({ result }) => {
  return (
    <>
      <div className="h-full flex-1 rounded-lg bg-zinc-900 relative  p-4 md:p-6 border border-zinc-700 bg-opacity-80">
        <Link
          className="absolute inset-0"
          href={`/quiz/${result.quiz.id}/results`}
        ></Link>
        <div className="rounded-lg ">
          <div className="w-full flex justify-center my-2">
            <QuizImage image={result.quiz.image} />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-cyan-500 md:mb-4">
            {result.quiz.title}
          </h2>
          <p className="md:text-xl text-lg lg:text-2xl text-white">
            Правильно:{" "}
            {Math.round((result.score / result.questions_count) * 100)}%
          </p>
        </div>
      </div>
    </>
  );
};

export default ResultItem;
