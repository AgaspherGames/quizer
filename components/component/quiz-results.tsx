/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/1lAvFXRsLwj
 */
import { Button } from "@/components/ui/button";
import { getFileLink } from "@/utils/utils";
import Image from "next/image";
import { BiHash } from "react-icons/bi";
import ResultItem from "./Results/ResultItem";

export function QuizResults() {
  return (
    <section className="w-full h-screen bg-black text-white py-12 md:py-24 lg:py-32">
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
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />

          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem isMyResult />
          <ResultItem />
          <ResultItem />
        </div>
      </div>
    </section>
  );
}
