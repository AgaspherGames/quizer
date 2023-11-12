import { IQuiz } from "@/interfaces/QuizInterfaces";
import Link from "next/link";
import React from "react";
import QuizImage from "../Base/quiz-image";
interface QuizItemProps {
  quiz: IQuiz;
}

const QuizItem: React.FC<QuizItemProps> = ({ quiz }) => {
  return (
    <div className="h-full flex-1 rounded-lg bg-zinc-900 relative  p-4 md:p-6 ">
      <Link
        key={quiz.id}
        className="absolute inset-0"
        href={`/quiz/${quiz.id}`}
      ></Link>
      <div className="rounded-lg bg-zinc-900">
        <div className="w-full flex justify-center my-2">
          <QuizImage image={quiz.image} />
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-cyan-500 md:mb-4">
          {quiz.title}
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-white">
          {quiz.description}
        </p>
      </div>
    </div>
  );
};

export default QuizItem;