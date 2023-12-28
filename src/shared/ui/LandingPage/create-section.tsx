"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card3D } from "../Base/Card3D";
import { useAuthState } from "@/hooks/hooks";
import { MouseEvent, useState } from "react";
import LoginRequiredModal from "../Modal/LoginRequiredModal";

export function CreateSection() {
  const { isAuth } = useAuthState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const startHandler = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    if (!isAuth) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };
  return (
    <>
      <section className="w-full px-2 py-8 md:py-12 lg:py-24 ">
        <LoginRequiredModal
          isOpen={isModalOpen}
          close={() => {
            setIsModalOpen(false);
          }}
          text={<>Для создания тестов вы должны быть авторизованы</>}
        />
        <div className="relative w-full py-3 sm:max-w-3xl sm:mx-auto">
          <Card3D>
            <div className="p-8 xl:p-14 bg-zinc-900 shadow-none shadow-zinc-900 rounded-3xl border border-zinc-700 bg-opacity-50 backdrop-blur-xl">
              <div className="space-y-8 text-center">
                <h1 className="text-2xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-4xl/none">
                  Создай свою собственную викторину
                </h1>
                <p className="mx-auto max-w-[700px] text-cyan-500 text-lg md:text-xl dark:text-cyan-400">
                  Преобразуйте свои знания и идеи в увлекательную и
                  захватывающую викторину для проверки знаний ваших друзей и
                  семьи.
                </p>
                <div className="space-x-4">
                  <Link href={"/quiz/create"}>
                    <Button
                      className="px-6 py-4 text-lg lg:py-6 lg:px-8 lg:text-xl bg-white text-black"
                      onClick={startHandler}
                      variant="secondary"
                    >
                      Начать создание
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </section>
    </>
  );
}
