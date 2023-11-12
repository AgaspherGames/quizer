/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/HVHcTMTJiYU
 */

export function Features() {
  return (
    <section className="w-full py-8 md:py-12 lg:py-24 xl:py-32 bg-black text-white text-base lg:text-xl">
      <div className="container mx-auto px-2 md:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 md:gap-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <svg
              className=" h-10 w-10 lg:h-16 lg:w-16 text-cyan-500"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
            <h3 className="text-xl md:text-xl lg:text-3xl font-semibold">
              Интерактивные викторины
            </h3>
            <p className="mx-auto max-w-[200px] lg:max-w-[400px] text-zinc-200">
              Задействуйте свой мозг с помощью сложных викторин и улучшите свои
              знания.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <svg
              className=" h-10 w-10 lg:h-16 lg:w-16 text-cyan-500"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
            <h3 className="text-xl md:text-xl lg:text-3xl font-semibold">
              Списки лидеров
            </h3>
            <p className="mx-auto max-w-[200px] lg:max-w-[400px] text-zinc-200 ">
              Соревнуйтесь с друзьями и поднимайтесь по лидерской доске.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center sm:col-span-2 lg:col-span-1">
            <svg
              className=" h-10 w-10 lg:h-16 lg:w-16 text-cyan-500"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" x2="14" y1="2" y2="2" />
              <line x1="12" x2="15" y1="14" y2="11" />
              <circle cx="12" cy="14" r="8" />
            </svg>
            <h3 className="text-xl md:text-xl lg:text-3xl font-semibold">
              Таймированные раунды
            </h3>
            <p className="mx-auto max-w-[200px] lg:max-w-[400px] text-zinc-200">
              Проверьте свою скорость и точность в таймированных раундах
              викторины.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}