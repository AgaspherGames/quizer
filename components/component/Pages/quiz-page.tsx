"use client";
import { Button } from "@/components/ui/button";
import { useAuthState, useQuiz } from "@/hooks/hooks";
import { useRouter } from "next/navigation";

import React, {  useState } from "react";
import { motion, useCycle } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { sleep } from "@/utils/utils";
import QuizService from "@/services/QuizService";
import QuizImage from "../Base/quiz-image";
import { useQuizStore } from "@/stores/QuizStore";
import LocalStorageService from "@/services/LocalStorageService";
import LoginRequiredModal from "../Modal/LoginRequiredModal";
interface QuizPageProps {
  params: { id: string };
}

const panel = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};
const bg = {
  closed: {
    opacity: 0.5,
    translateY: -500,
    transition: {
      type: "spring",
    },
  },
  open: {
    opacity: 1,
    translateY: 0,
    transition: {
      type: "spring",
    },
  },
};

export const QuizPage: React.FC<QuizPageProps> = ({ params }) => {
  const setSelectedAnswers = useQuizStore((state) => state.setSelectedAnswers);
  const { questions, quiz } = useQuiz(params.id);
  const [isClosing, toggle] = useCycle(false, true);
  const { isAuth } = useAuthState();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const router = useRouter();

  async function start() {
    if (!isAuth){
      return setIsModalOpened(true)
    }
    const { id } = (await QuizService.startQuiz(params.id)).data;
    LocalStorageService.setItem(`quizAttempt_${params.id}`, id + "");

    toggle();
    await sleep(300);
    setSelectedAnswers({});
    router.push(`${params.id}/${questions[0].id}`);
  }

  return (
    <motion.div
      animate={isClosing ? "closed" : "open"}
      className="min-h-screen bg-black text-white py-6 flex flex-col justify-center sm:py-12"
    >
      <LoginRequiredModal
        close={() => {
          setIsModalOpened(false);
        }}
        isOpen={isModalOpened}
      />
      <div className="relative w-full py-3 sm:max-w-xl sm:mx-auto">
        <motion.div className="absolute inset-0" variants={bg}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
            initial={{ rotate: "84deg", scale: 0.3 }}
            animate={{ rotate: "-6deg", scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
          />
        </motion.div>
        <motion.div
          initial={false}
          drag={true}
          dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
          className="relative px-4 py-10 bg-zinc-950 shadow-lg sm:rounded-3xl sm:p-20 "
        >
          <motion.div
            variants={panel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
          >
            <motion.div variants={panel}>
              <div className="w-full flex justify-center my-2">
                <QuizImage image={quiz?.image} />
              </div>
              <h1 className="text-4xl font-bold text-center mb-4">
                {quiz?.title}
              </h1>
              <p className="text-xl text-center mb-4">{quiz?.description}</p>
              <div className=" mt-6">
                <Button
                  onClick={start}
                  className={twMerge(
                    "w-full py-3 bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg col-span-2"
                  )}
                  type="submit"
                >
                  Начать
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
