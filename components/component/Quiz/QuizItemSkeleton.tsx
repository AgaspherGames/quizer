import { IQuiz } from "@/interfaces/QuizInterfaces";
import Link from "next/link";
import React from "react";
import QuizImage from "../Base/quiz-image";
interface QuizItemSkeletonProps {}

const QuizItemSkeleton: React.FC<QuizItemSkeletonProps> = () => {
  return (
    <div className="h-full flex-1 rounded-lg bg-zinc-900 relative  p-4 md:p-6 ">
      <div className="rounded-lg bg-zinc-900">
        <div className="w-full flex justify-center my-2 ">
          <div className="skeleton w-full h-32 sm:h-48 rounded-xl"></div>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-cyan-500 md:mb-2 skeleton w-full"></h2>
        <p className="text-lg md:text-xl lg:text-2xl text-white skeleton w-full"></p>
      </div>
    </div>
  );
};

export default QuizItemSkeleton;
