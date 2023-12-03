"use client";
import { Button } from "@/components/ui/button";
import ResultItem from "../Results/ResultItem";
import { useEffect, useState } from "react";
import io, { Socket } from "Socket.IO-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { socket } from "@/lib/socket";
import { IResultItem } from "@/interfaces/QuizInterfaces";
import { useQuizStore } from "@/stores/QuizStore";

interface pageProps {
  params: { id: string };
}

export function QuizResults({ params }: pageProps) {
  const [results, setResults] = useState<IResultItem[]>([]);
  const questionsList = useQuizStore((state) => state.questionsList);

  useEffect(() => {
    socket.on("message", (results: IResultItem[] | null) => {
      results && setResults(results);
    });

    socket.emit("message", params.id);
  }, []);

  return (
    <section className="w-full h-screen bg-black text-white py-12 md:py-24 lg:py-32">
      <Button
        onClick={() => {
          socket.emit("message", "2");
        }}
      >
        asd
      </Button>
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Результаты викторины
        </h2>
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            className="bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700"
            variant="outline"
          >
            Сортировать по рейтингу
          </Button>
          <Button
            className="bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700"
            variant="outline"
          >
            Сортировать по имени
          </Button>
          <Button
            className="bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700"
            variant="outline"
          >
            Сортировать по дате загрузки
          </Button>
        </div>
        <div>
          <h3 className="text-3xl font-medium mb-4">Топ результатов</h3>
        </div>
        <div className="flex flex-col gap-6 relative">
          {results.map((el) => (
            <ResultItem
              maxScore={questionsList[params.id].length}
              result={el}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
