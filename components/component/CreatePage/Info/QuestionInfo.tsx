import { ICreateQuestion, QuestionTypes } from "@/interfaces/QuizInterfaces";
import React, { useContext } from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import CreateImage from "../UI/CreateImage";
import CustomInput from "../../Base/CustomInput";
import ChooseImage from "../UI/ChooseImage";
import DeleteButton from "../UI/DeleteButton";
import QuestionContextMenu from "../UI/QuestionContextMenu";
import useCreateStore from "@/stores/CreateStore";
import { QuestionContext } from "@/stores/QuestionContext";
interface QuestionInfoProps {
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

const QuestionInfo: React.FC<QuestionInfoProps> = ({
  dragHandleProps,
}) => {
  const {
    setQuestionTitle,
    setQuestionImage,
    setQuestionType,
    removeQuestion,
  } = useCreateStore((state) => state);

  const question = useContext(QuestionContext);

  if (!question) return <div></div>;

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
        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-2">
          <div className="relative flex justify-center items-center">
            <ChooseImage
              setImage={(data: File) => setQuestionImage(question.id, data)}
            />
          </div>
          <QuestionContextMenu
            question={question}
            setQuestionType={setQuestionType}
          />
        </div>

        <DeleteButton onClick={(_) => removeQuestion(question.id)} />
      </div>
    </div>
  );
};

export default QuestionInfo;
