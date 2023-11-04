import React from "react";
import { Input } from "../../ui/input";
import { motion } from "framer-motion";
import { CreateAnswer } from "@/interfaces/QuizInterfaces";
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
          <div className="w-full px-4 py-2 bg-zinc-900 rounded-lg focus:border-transparent ml-3 pr-8">
            <input
              className="bg-transparent outline-none w-full"
              value={answer.text}
              onChange={(e) => setAnswerTitle(e.target.value)}
              {...props}
            />
          </div>
          <button
            type="button"
            onClick={(_) => removeAnswer()}
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
      </div>
    </motion.div>
  );
};

export default CreateField;
