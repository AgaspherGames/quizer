"use client";
import React, { useEffect, useState } from "react";
import { DndContext } from "../../DnD/DndContext";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import CreateField from "../CreateField";
import AddAnswer from "../AddAnswer";
import { motion } from "framer-motion";
import { ICreateQuestion } from "@/interfaces/QuizInterfaces";

interface AnswersListProps {
  onDragEnd: (result: DropResult) => void;
  question: ICreateQuestion;
  setAnswerTitle: (question_id: number, pos: number, text: string) => void;
  toggleAnswer: (question_id: number, pos: number) => void;
  removeAnswer: (question_id: number, pos: number) => void;
  addAnswer: (question_id: number, pos: number) => void;
}

const AnswersList: React.FC<AnswersListProps> = ({
  onDragEnd,
  question,
  setAnswerTitle,
  toggleAnswer,
  removeAnswer,
  addAnswer,
}) => {
  const [data, setData] = useState<number[] | []>([]);
  useEffect(() => {
    setData([1]);
  }, []);
  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="">
        {data.map(() => (
          <Droppable key={1} droppableId={`droppable${1}`}>
            {(provided) => (
              <div
                className="w-full"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {question.answers?.map((component, index) => (
                  <Draggable
                    key={component.id}
                    draggableId={component.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        key={component.id}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "80px" }}
                          className="relative p-2"
                        >
                          <div className="absolute inset-0">
                            <CreateField
                              handle={provided.dragHandleProps}
                              answer={component}
                              setAnswerTitle={(text: string) => {
                                setAnswerTitle(question.id, index, text);
                              }}
                              toggleAnswer={() => {
                                toggleAnswer(question.id, index);
                              }}
                              removeAnswer={() => {
                                removeAnswer(question.id, index);
                              }}
                              placeholder="Ответ"
                            />
                            <AddAnswer
                              addAnswer={(ind: number) =>
                                addAnswer(question.id, ind)
                              }
                              ind={index + 1}
                            />
                          </div>
                        </motion.div>
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
    </DndContext>
  );
};

export default AnswersList;
