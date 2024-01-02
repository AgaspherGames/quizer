import { IQuiz } from "@/interfaces/QuizInterfaces";
import Link from "next/link";
import React from "react";
import QuizImage from "../Base/quiz-image";
import { BiSolidPencil } from "react-icons/bi";
interface QuizItemProps {
  quiz: IQuiz;
  isMy?: boolean;
}

const QuizItem: React.FC<QuizItemProps> = ({ quiz, isMy }) => {
  return (
    <div className="h-full flex-1 rounded-lg bg-zinc-900 relative p-4 md:p-6 border border-zinc-700 bg-opacity-80 group">
      <Link
        key={quiz.id}
        className="absolute inset-0"
        href={`/quiz/${quiz.id}`}
      ></Link>
      <div className="rounded-lg ">
        <div className="w-full flex justify-center my-2 relative">
          <QuizImage image={quiz.image} />
          {isMy && (
            <div
              title="Редактировать тест"
              className="absolute -bottom-3 -right-3 bg-zinc-800 p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 w-9 h-9"
            >
              <Link href={`/quiz/${quiz.id}/edit`}>
                <BiSolidPencil className="w-6 h-6" />
              </Link>
            </div>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-cyan-500 md:mb-2">
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
