"use client";
import React, { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ContextMenu from "../../Base/ContextMenu/ContextMenu";
import ContextButton from "../../Base/ContextMenu/ContextButton";
import { ICreateQuestion, QuestinTypes } from "@/interfaces/QuizInterfaces";

interface QuestionContextProps {
  setQuestionType: (question_id: number, type: QuestinTypes) => void;
  question: ICreateQuestion;
}

const QuestionContext: React.FC<QuestionContextProps> = ({
  setQuestionType,
  question,
}) => {
  const ref = useRef(null);
  const [context, setContext] = useState({ isOpen: true, posX: 0, posY: 0 });
  return (
    <div ref={ref} className="relative flex justify-center items-center">
      <button
        type="button"
        onClick={(e) => {
          setContext((prev) => ({
            isOpen: true,
            posX: e.pageX,
            posY: e.pageY,
          }));
        }}
      >
        <BsThreeDotsVertical />
      </button>
      <ContextMenu
        parentRef={ref}
        setIsOpen={(isOpen: boolean) => {
          console.log(isOpen);

          setContext((prev) => ({ ...prev, isOpen }));
        }}
        isOpen={context.isOpen}
        posX={context.posX}
        posY={context.posY}
      >
        <p className="p-2">Тип вопроса:</p>
        <ContextButton
          onClick={() => {
            setQuestionType(question.id, "choice");
          }}
          active={question.type == "choice"}
        >
          Выбор правильных вариантов
        </ContextButton>
        <ContextButton
          onClick={() => {
            setQuestionType(question.id, "input");
          }}
          active={question.type == "input"}
        >
          Текстовый ответ
        </ContextButton>
      </ContextMenu>
    </div>
  );
};

export default QuestionContext;
