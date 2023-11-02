import React, { useEffect } from "react";
import { Input } from "../../ui/input";
import CreateField from "./CreateField";
import { motion } from "framer-motion";
import { ICreateQuestion } from "@/interfaces/QuizInterfaces";
import AddAnswer from "./AddAnswer";
import CreateImage from "./CreateImage";

interface CreateQuestionProps {
  question: ICreateQuestion;
  addAnswer: Function;
  removeAnswer: Function;
  toggleAnswer: Function;
  setQuestionTitle: Function;
  setQuestionImage: Function;
  setAnswerTitle: Function;
  removeQuestion: Function;
}

const CreateQuestion: React.FC<CreateQuestionProps> = ({
  setQuestionImage,
  setQuestionTitle,
  setAnswerTitle,
  question,
  addAnswer,
  removeAnswer,
  toggleAnswer,
  removeQuestion,
}) => {
  console.log(question);

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      className="my-3"
    >
      {question.image && <CreateImage clear={()=>setQuestionImage(undefined)} image={question.image} />}
      <div className="relative">
        {/* <label className="block font-medium mb-2">{question.id}</label> */}
        <Input
          value={question.title}
          onChange={(e) => setQuestionTitle(question.id, e.target.value)}
          className="w-full px-4 py-4 bg-zinc-900 rounded-lg focus:border-transparent pr-8"
          placeholder="Enter question"
          type="text"
        ></Input>
        <div className="absolute top-1/2 -translate-y-1/2 right-4">
          <button type="button">
            <label className="absolute inset-0 opacity-0 cursor-pointer text-white">
              {/* IMPORTANT */}
              .
              <input
                onChange={(e) => {
                  e.target.files?.length &&
                    setQuestionImage(question.id, e.target.files[0]);
                }}
                type="file"
              />
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          onClick={(_) => removeQuestion(question.id)}
          className="absolute -right-6 top-1/2 -translate-y-1/2 text-white hover:text-red-500 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
          </svg>
        </button>
      </div>
      <AddAnswer
        addAnswer={(ind: number) => addAnswer(question.id, ind)}
        ind={0}
      />
      {question.answers.map((el, ind) => (
        <React.Fragment key={el.id}>
          <CreateField
            answer={el}
            setAnswerTitle={(text: string) => {
              setAnswerTitle(question.id, ind, text);
            }}
            toggleAnswer={() => {
              toggleAnswer(question.id, ind);
            }}
            removeAnswer={() => {
              removeAnswer(question.id, ind);
            }}
            placeholder="Option 1"
          />
          <AddAnswer
            addAnswer={(ind: number) => addAnswer(question.id, ind)}
            ind={ind + 1}
          />
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default CreateQuestion;
