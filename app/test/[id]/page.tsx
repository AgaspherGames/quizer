"use client";
import { useQuiz } from "@/hooks/hooks";
import React from "react";
interface TestProps {
  params: { id: string };
}

const Test: React.FC<TestProps> = ({ params }) => {
  const { questions, quiz } = useQuiz(params.id);

  return <div></div>;
};

export default Test;
