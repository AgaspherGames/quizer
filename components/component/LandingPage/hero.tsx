import Link from "next/link";
import { Button } from "../../ui/button";
import { Card3D } from "../Base/Card3D";

export function Hero() {
  return (
    <section className="w-full px-2 py-8 md:py-12 lg:py-24 ">
      <div className="relative w-full py-3 sm:max-w-3xl sm:mx-auto">
        <Card3D offset={2}>
          <div className="p-8 xl:p-14 bg-zinc-900 shadow-none shadow-zinc-900 rounded-3xl border border-zinc-700 bg-opacity-50 backdrop-blur-xl">
            <div className="space-y-8 text-center">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                Добро пожаловать в QuizMaster
              </h1>
              <p className="mx-auto max-w-[700px] text-cyan-500 text-lg md:text-xl dark:text-cyan-400">
                Улучшите свои знания, весело проводя время. <br /> Готовы
                начать?
              </p>
              <div className="space-x-4">
                <Link href="/quiz">
                  <Button
                    className="px-6 py-4 text-lg lg:py-6 lg:px-8 lg:text-xl bg-white text-black"
                    variant="secondary"
                  >
                    Начать викторину
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card3D>
      </div>
    </section>
  );
}
