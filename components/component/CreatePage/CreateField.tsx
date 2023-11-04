import React from "react";
import { Input } from "../../ui/input";
import { motion } from "framer-motion";
import { CreateAnswer } from "@/interfaces/QuizInterfaces";
import DeleteButton from "./UI/DeleteButton";
import CustomInput from "../CustomInput";
interface CreateFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  removeAnswer: Function;
  toggleAnswer: Function;
  setAnswerTitle: Function;
  answer: CreateAnswer;
  handle: any;
}

const CreateField: React.FC<CreateFieldProps> = ({
  removeAnswer,
  setAnswerTitle,
  toggleAnswer,
  answer,
  handle,
  ...props
}) => {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      className="space-y-4 mt-2 relative"
    >
      <div className="space-y-2">
        <div className="relative flex">
          <div className="relative flex items-center p-2 pr-2 rounded-full cursor-pointer">
            <input
              onChange={() => {
                toggleAnswer();
              }}
              checked={answer.is_correct}
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-cyan-600 checked:bg-cyan-600 checked:before:bg-cyan-600 hover:before:opacity-10"
              id={`${answer.id}`}
            />
            <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <CustomInput
            classname="ml-3"
            value={answer.text}
            onChange={(e) => setAnswerTitle(e.target.value)}
            {...props}
          />
          <DeleteButton onClick={(_) => removeAnswer()} />
        </div>
      </div>
    </motion.div>
  );
};

export default CreateField;
