import React from "react";
import QuizItemSkeleton from "./QuizItemSkeleton";
interface QuizListSkeletonProps {}

const QuizListSkeleton: React.FC<QuizListSkeletonProps> = () => {
  return Array(4)
    .fill(4)
    .map((el, ind) => <QuizItemSkeleton key={ind} />);
};

export default QuizListSkeleton;
