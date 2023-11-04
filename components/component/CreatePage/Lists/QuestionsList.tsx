"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import CreateQuestion from "../CreateQuestion";
import AddQuestion from "../AddQuestion";
import { CreateAnswer, ICreateQuestion } from "@/interfaces/QuizInterfaces";
interface QuestionsListProps {
  questions: ICreateQuestion[];
  addQuestion: (ind: number) => void;
  addAnswer: (question_id: number, pos: number) => void;
  removeAnswer: (question_id: number, pos: number) => void;
  removeQuestion: (question_id: number) => void;
  toggleAnswer: (question_id: number, pos: number) => void;
  setQuestionTitle: (question_id: number, text: string) => void;
  setQuestionImage: (question_id: number, image?: File) => void;
  setAnswerTitle: (question_id: number, pos: number, text: string) => void;
  setAnswers: (question_id: number, answers: CreateAnswer[]) => void;
  onDragEnd: (result: DropResult) => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  addQuestion,
  addAnswer,
  removeAnswer,
  removeQuestion,
  toggleAnswer,
  setQuestionTitle,
  setQuestionImage,
  setAnswerTitle,
  setAnswers,
  onDragEnd,
}) => {
  const [data, setData] = useState<number[] | []>([]);
  useEffect(() => {
    setData([1]);
  }, []);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="">
        {data.map(() => (
          <Droppable key={2} droppableId={`questiondroppable${1}`}>
            {(provided) => (
              <div
                className="w-full"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {questions.map((el, ind) => (
                  <Draggable
                    key={el.id}
                    draggableId={el.id.toString()}
                    index={ind}
                  >
                    {(provided) => (
                      <div
                        key={el.id}
                        className=""
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <CreateQuestion
                          dragHandleProps={provided.dragHandleProps}
                          setQuestionImage={setQuestionImage}
                          setQuestionTitle={setQuestionTitle}
                          setAnswerTitle={setAnswerTitle}
                          toggleAnswer={toggleAnswer}
                          removeAnswer={removeAnswer}
                          removeQuestion={removeQuestion}
                          addAnswer={addAnswer}
                          setAnswers={setAnswers}
                          question={el}
                          key={el.id}
                        />
                        <AddQuestion
                          addQuestion={addQuestion}
                          index={ind + 1}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default QuestionsList;
