import React from "react";
interface AddAnswerProps {
  addAnswer: Function;
  ind: number;
}

const AddAnswer: React.FC<AddAnswerProps> = ({ addAnswer, ind }) => {
  return (
    <div
      onClick={() => {
        addAnswer(ind);
      }}
      className="ml-10 h-2 mt-4  group hover:h-3 transition-all relative"
    >
      <div className="absolute -translate-y-1/2 border-solid border-l-zinc-900 border-l-8 border-y-transparent border-y-8 border-r-0 group-hover:border-l-zinc-800 transition-all"></div>
      <div className="h-0.5 -translate-y-1/2 bg-zinc-900  group-hover:h-1 group-hover:bg-zinc-800 transition-all">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0  group-hover:opacity-100 transition-all">
          Добавить ответ
        </div>
      </div>
      <div className="absolute inset-0 h-6 -translate-y-1/2 cursor-pointer"></div>
    </div>
  );
};

export default AddAnswer;
