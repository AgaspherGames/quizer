"use client";
import { useQuiz } from "@/hooks/hooks";
import React from "react";
interface TestProps {
  params: { id: string };
}

const Test: React.FC<TestProps> = ({ params }) => {
  const { questions, quiz } = useQuiz(params.id);
  console.log(questions, quiz);

  return <div></div>;
};

export default Test;
