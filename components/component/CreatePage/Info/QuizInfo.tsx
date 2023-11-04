import React from "react";
import CreateImage from "../UI/CreateImage";
import CustomInput from "../../CustomInput";
import ChooseImage from "../UI/ChooseImage";
interface QuizInfoProps {
  setQuizImage: (file?: File) => void;
  setTitle: (text: string) => void;
  setDescription: (text: string) => void;
  quizImage: File | undefined;
  title: string;
  description: string;
}

const QuizInfo: React.FC<QuizInfoProps> = ({
  setQuizImage,
  setTitle,
  setDescription,
  quizImage,
  title,
  description,
}) => {
  return (
    <div className="mb-5">
      {quizImage && (
        <CreateImage
          clear={() => {
            setQuizImage(undefined);
          }}
          image={quizImage}
          height="10rem"
        />
      )}
      <label className="block font-medium mb-2">Название</label>
      <div className="relative">
        <CustomInput
          classname="py-3 pr-10 border-white border"
          placeholder="Название теста"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-4">
          <ChooseImage setImage={setQuizImage} />
        </div>
      </div>
      <div className="relative mt-4">
        <label className="block font-medium mb-2">Описание</label>
        <textarea
          className="w-full px-4 py-4 bg-zinc-900 rounded-lg focus:border-transparent"
          placeholder="Описание теста"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
};

export default QuizInfo;
