import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import CreateField from "./CreateField";
import { motion } from "framer-motion";
import {
  CreateAnswer,
  ICreateQuestion,
  QuestinTypes,
} from "@/interfaces/QuizInterfaces";
import AddAnswer from "./AddAnswer";
import CreateImage from "./UI/CreateImage";
import {
  Draggable,
  DraggableProvidedDragHandleProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import ChooseImage from "./UI/ChooseImage";
import DeleteButton from "./UI/DeleteButton";
import CustomInput from "../Base/CustomInput";
import AnswersList from "./Lists/AnswersList";
import QuestionInfo from "./Info/QuestionInfo";

interface CreateQuestionProps {
  question: ICreateQuestion;
  setAnswerTitle: (question_id: number, pos: number, text: string) => void;
  toggleAnswer: (question_id: number, pos: number) => void;
  removeAnswer: (question_id: number, pos: number) => void;
  addAnswer: (question_id: number, pos: number) => void;
  setQuestionTitle: (question_id: number, text: string) => void;
  setQuestionImage: (question_id: number, image?: File) => void;
  removeQuestion: (question_id: number) => void;
  setAnswers: (question_id: number, answers: CreateAnswer[]) => void;
  setQuestionType: (question_id: number, type: QuestinTypes) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

const CreateQuestion: React.FC<CreateQuestionProps> = ({
  setQuestionImage,
  setQuestionTitle,
  setAnswerTitle,
  question,
  addAnswer,
  removeAnswer,
  toggleAnswer,
  removeQuestion,
  setAnswers,
  setQuestionType,
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

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      className="my-3 mr-6 bg-zinc-950"
    >
      <QuestionInfo
        setQuestionImage={setQuestionImage}
        setQuestionTitle={setQuestionTitle}
        question={question}
        removeQuestion={removeQuestion}
        dragHandleProps={dragHandleProps}
        setQuestionType={setQuestionType}
      />
      <AddAnswer
        addAnswer={(ind: number) => addAnswer(question.id, ind)}
        ind={0}
      />

      <AnswersList
        addAnswer={addAnswer}
        onDragEnd={onDragEnd}
        question={question}
        removeAnswer={removeAnswer}
        setAnswerTitle={setAnswerTitle}
        toggleAnswer={toggleAnswer}
      />
    </motion.div>
  );
};

export default CreateQuestion;
