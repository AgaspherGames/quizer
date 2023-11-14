"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import CreateField from "../CreateField";
import AddAnswer from "../AddAnswer";
import { motion } from "framer-motion";
import { ICreateQuestion } from "@/interfaces/QuizInterfaces";
import useCreateStore from "@/stores/CreateStore";
import { QuestionContext } from "@/stores/QuestionContext";

interface AnswersListProps {
  onDragEnd: (result: DropResult) => void;
}

const AnswersList: React.FC<AnswersListProps> = ({ onDragEnd }) => {
  const question = useContext(QuestionContext);
  const [data, setData] = useState<number[] | []>([]);
  useEffect(() => {
    setData([1]);
  }, []);

  if (!question) return <div />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                              index={index}
                              handle={provided.dragHandleProps}
                              answer={component}
                            />
                            <AddAnswer ind={index + 1} />
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
    </DragDropContext>
  );
};

export default AnswersList;
