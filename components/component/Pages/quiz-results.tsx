"use client";
import { Button } from "@/components/ui/button";
import ResultItem from "../Results/ResultItem";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { IResultItem } from "@/interfaces/QuizInterfaces";
import { useQuizStore } from "@/stores/QuizStore";
import { useUserMe } from "@/hooks/useUserInfo";

interface pageProps {
  params: { id: string };
}

export function QuizResults({ params }: pageProps) {
  const [results, setResults] = useState<IResultItem[]>([]);
  const questionsList = useQuizStore((state) => state.questionsList);
  const { userInfo } = useUserMe();

  useEffect(() => {
    socket.on("message", (results: IResultItem[] | null) => {
      results && setResults(results);
    });

    socket.emit("message", params.id);
  }, []);

  return (
    <section className="w-full h-screen bg-black text-white py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Результаты викторины
        </h2>
        <div>
          <h3 className="text-3xl font-medium mb-4">Топ результатов</h3>
        </div>
        <div className="flex flex-col gap-6 relative">
          {results.map((el, ind) => (
            <ResultItem
            key={el.id}
              place={ind + 1}
              maxScore={questionsList[params.id].length}
              result={el}
              isMyResult={el.username == userInfo?.user.username}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
