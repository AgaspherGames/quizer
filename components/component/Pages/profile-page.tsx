"use client";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Header } from "../Base/header";
import { IUserInfo } from "@/interfaces/UserInterfaces";
import { getFileLink } from "@/utils/utils";
import { useUserInfo, useUserMe } from "@/hooks/useUserInfo";
import { BiSolidPencil } from "react-icons/bi";
import Image from "next/image";
import UserService from "@/services/UserService";
import QuizItem from "../Quiz/QuizItem";
import ResultItem from "../Quiz/ResultItem";
import Card from "@/components/ui/Card";

export function ProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { userInfo, update } = useUserInfo(params.id);
  async function upload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    await UserService.uploadAvatar(formData);
    update();
  }

  const avgPercent = useMemo(() => {
    const avg =
      userInfo?.results?.reduce(
        (a, c) => (a += c.score / c.questions_count),
        0
      ) / userInfo?.results.length || 0;

    return Math.round(avg * 100);
  }, [userInfo]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="flex flex-col items-center justify-center p-4 gap-8">
        <div className=" flex flex-col items-center mx-auto container max-w-md sm:max-w-lg md:max-w-2xl">
          <section className="w-full flex flex-col justify-center items-center gap-4 md:flex-row">
            <Card className="w-fit flex items-center gap-4">
              <div className="relative group">
                <Image
                  alt="User Image"
                  className="rounded-full"
                  height="100"
                  width="100"
                  src={getFileLink(userInfo?.user?.avatar, "avatars")}
                  style={{
                    aspectRatio: "1",
                    objectFit: "cover",
                  }}
                />
                <div className="absolute bottom-0 right-0 bg-zinc-800 p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100">
                  <BiSolidPencil className="w-4" />
                </div>
                <input
                  onChange={upload}
                  type="file"
                  className="absolute inset-0 opacity-0"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {userInfo?.user.username}
                </h2>
                <p className="text-cyan-500">{userInfo?.user.email}</p>
              </div>
            </Card>
            <div className="flex flex-row justify-between w-full gap-4 md:w-1/2 md:flex-col">
              <Card
                padding="small"
                className="flex flex-col items-center justify-between text-center w-full min-w-max md:flex-row"
              >
                <p className="">Пройденные викторины</p>
                <p className="text-3xl font-bold text-cyan-500">
                  {userInfo?.results.length}
                </p>
              </Card>
              <Card
                padding="small"
                className="flex flex-col items-center justify-between text-center w-full min-w-max md:flex-row"
              >
                <p className="">Средний балл</p>
                <p className="text-3xl font-bold text-cyan-500">
                  {avgPercent}%
                </p>
              </Card>
            </div>
          </section>

          <section className="w-full">
            <h2 className="text-2xl font-medium my-4">Тесты пользователя: </h2>
            <div className="grid gap-4 grid-cols-2">
              {userInfo?.quizzes.map((el) => (
                <QuizItem key={el.id} quiz={el} />
              ))}
            </div>
          </section>
          <section className="w-full">
            <h2 className="text-2xl font-medium my-4">
              Результаты пользователя:
            </h2>
            <div className="grid gap-4 grid-cols-2">
              {userInfo?.results.map((el, ind) => (
                <ResultItem key={ind} result={el} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
