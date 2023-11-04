import { ICreateQuestion } from "@/interfaces/QuizInterfaces";
import React from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import CreateImage from "../UI/CreateImage";
import CustomInput from "../../CustomInput";
import ChooseImage from "../UI/ChooseImage";
import DeleteButton from "../UI/DeleteButton";
interface QuestionInfoProps {
  question: ICreateQuestion;
  setQuestionTitle: (question_id: number, text: string) => void;
  setQuestionImage: (question_id: number, image?: File) => void;
  removeQuestion: (question_id: number) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

const QuestionInfo: React.FC<QuestionInfoProps> = ({
  setQuestionImage,
  setQuestionTitle,
  question,
  removeQuestion,
  dragHandleProps,
}) => {
  return (
    <div>
      {question.image && (
        <div {...dragHandleProps}>
          <CreateImage
            clear={() => setQuestionImage(question.id, undefined)}
            image={question.image}
          />
        </div>
      )}
      <div {...dragHandleProps} className="relative">
        <CustomInput
          classname="pr-12"
          value={question.title}
          onChange={(e) => setQuestionTitle(question.id, e.target.value)}
          placeholder="Введите вопрос"
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-4">
          <ChooseImage
            setImage={(data: File) => setQuestionImage(question.id, data)}
          />
        </div>

        <DeleteButton onClick={(_) => removeQuestion(question.id)} />
      </div>
    </div>
  );
};

export default QuestionInfo;
