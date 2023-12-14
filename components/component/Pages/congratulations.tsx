"use client";
import { Button } from "@/components/ui/button";
import { useQueryState } from "next-usequerystate";
import { motion, useCycle } from "framer-motion";
import { sleep } from "@/utils/utils";
import { useRouter } from "next/navigation";

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

export function Congratulations({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isClosing, toggle] = useCycle(false, true);

  const [result, setResult] = useQueryState("result");

  async function replay() {
    toggle();
    await sleep(300);
    router.push(`/quiz/${params.id}`);
  }
  async function leaderBoard() {
    toggle();
    await sleep(300);
    router.push(`/quiz/${params.id}/results`);
  }

  return (
    <motion.div
      animate={isClosing ? "closed" : "open"}
      className="min-h-screen bg-black text-white py-6 flex flex-col justify-center sm:py-12"
    >
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
          className="relative px-4 py-10 bg-zinc-950 shadow-lg sm:rounded-3xl sm:p-20"
        >
          <motion.div
            variants={panel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
          >
            <motion.div variants={panel}>
              {" "}
              <h1 className="text-4xl font-bold text-center mb-4">
                Поздравляем!
              </h1>
              <p className="text-2xl text-center mb-8">
                Вы завершили этот тест. Ваш результат - {result}
              </p>
              <div className="flex justify-center flex-col items-center gap-4">
                <Button
                  onClick={leaderBoard}
                  className="w-1/2 py-3 bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                >
                  Таблица лидеров
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
