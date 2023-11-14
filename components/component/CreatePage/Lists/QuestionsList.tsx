"use client";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import CreateQuestion from "../CreateQuestion";
import AddQuestion from "../AddQuestion";
import {
  CreateAnswer,
  ICreateQuestion,
  QuestionTypes,
} from "@/interfaces/QuizInterfaces";
interface QuestionsListProps {
  questions: ICreateQuestion[];
  onDragEnd: (result: DropResult) => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
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
                          question={el}
                          dragHandleProps={provided.dragHandleProps}
                          key={el.id}
                        />
                        <AddQuestion index={ind + 1} />
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
