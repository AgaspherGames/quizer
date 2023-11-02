"use client";
import { Button } from "@/components/ui/button";
import { useQueryState } from "next-usequerystate";

export function Congratulations() {
  const [result, setResult] = useQueryState("result");
  return (
    <div className="min-h-screen bg-black text-white py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-black shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-center mb-4">Поздравляем!</h1>
          <p className="text-2xl text-center mb-8">
            Вы завершили этот тест. Ваш результат - {result}
          </p>
          <div className="flex justify-center">
            <Button className="w-1/2 py-3 bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
              Повторить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
