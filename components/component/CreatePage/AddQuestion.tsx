import React from "react";
interface AddQuestionProps {
  addQuestion: Function;
  index: number;
}

const AddQuestion: React.FC<AddQuestionProps> = ({ addQuestion, index }) => {
  return (
    <div
      onClick={(e) => {
        addQuestion(index);
      }}
      className="group relative mt-4 mb-2 cursor-pointer"
    >
      <div className="absolute h-6 inset-0 -translate-y-1/2"></div>
      <div className="max-h-0 group group-hover:max-h-96 transition-all duration-1000 relative border-white border-2 rounded-lg overflow-hidden">
        <p className="text-center w-full">Добавить вопрос</p>
      </div>
    </div>
  );
};

export default AddQuestion;
