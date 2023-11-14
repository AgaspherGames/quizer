import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import CreateField from "./CreateField";
import { motion } from "framer-motion";
import {
  CreateAnswer,
  ICreateQuestion,
  QuestionTypes,
} from "@/interfaces/QuizInterfaces";
import AddAnswer from "./AddAnswer";
import {
  DraggableProvidedDragHandleProps,
  DropResult,
} from "react-beautiful-dnd";
import AnswersList from "./Lists/AnswersList";
import QuestionInfo from "./Info/QuestionInfo";
import useCreateStore from "@/stores/CreateStore";
import { QuestionContext } from "@/stores/QuestionContext";

interface CreateQuestionProps {
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  question: ICreateQuestion;
}

const CreateQuestion: React.FC<CreateQuestionProps> = ({
  question,
  dragHandleProps,
}) => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    const newData = [...JSON.parse(JSON.stringify(question.answers))]; //shallow copy concept
    const [item] = newData.splice(source.index, 1);
    newData.splice(destination.index, 0, item);
    setAnswers(question.id, [...newData]);
  };

  const { setAnswers } = useCreateStore((state) => state);

  return (
    <QuestionContext.Provider value={question}>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        className="my-3 mr-6 bg-zinc-950"
      >
        <QuestionInfo dragHandleProps={dragHandleProps} />
        <AddAnswer ind={0} />

        <AnswersList onDragEnd={onDragEnd} />
      </motion.div>
    </QuestionContext.Provider>
  );
};

export default CreateQuestion;
