"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/z7AmncMqSpk
 */

import { IQuiz } from "@/interfaces/QuizInterfaces";
import QuizService from "@/services/QuizService";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Quizes() {
  const [quizes, setQuizes] = useState<IQuiz[]>([]);
  useEffect(() => {
    QuizService.fetchQuizes().then((resp) => setQuizes(resp.data));
  }, []);

  return (
    <section className="w-full min-h-screen bg-black text-white p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-center mb-8">
        Quizzes
      </h1>
      <div className="grid gap-6 md:gap-8 lg:gap-10 items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {quizes.map((el) => (
          <div className="h-full flex-1 rounded-lg bg-zinc-900 relative  p-6 md:p-8 lg:p-10">
            <Link key={el.id} className="absolute inset-0" href={`/quiz/${el.id}`}>
            </Link>
              <div
                className="rounded-lg bg-zinc-900"
              >
                <div className="w-full flex justify-center my-2">
                  {el.image && (
                    <img
                      className="h-64 w-auto rounded-xl"
                      src={"http://localhost:3000/public/" + el.image}
                    />
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-cyan-500 mb-4">
                  {el.title}
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-white">{el.description}</p>
              </div>
          </div>

        ))}
      </div>
    </section>
  );
}
