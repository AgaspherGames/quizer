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
import Lights, { LightProps } from "../Background/Lights";
import UserInfoSection from "../UserPage/UserInfoSection";
import UserInfoSectionSkeleton from "../UserPage/UserInfoSectionSkeleton";
import QuizListSkeleton from "../Quiz/QuizListSkeleton";

const lights: LightProps[] = [
  {
    color: "sky",
    pos: "opacity-50 top-0 left-0",
    size: "medium",
  },
  {
    color: "sky",
    pos: "opacity-50 top-3/4 left-3/4",
    size: "small",
  },
  {
    color: "teal",
    pos: "opacity-50 top-1/2 left-[20%]",
    size: "medium",
  },
  {
    color: "teal",
    pos: "opacity-50 top-1/3 right-0",
    size: "small",
    translateToRight: true,
  },
  {
    color: "sky",
    pos: "opacity-50 bottom-0 left-0",
    size: "medium",
    translateToBottom: true,
  },
];

export function ProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { userInfo } = useUserInfo(params.id);
  return (
    <div className="min-h-screen text-white">
      <Lights lights={lights} />
      <Header />
      <main className="flex flex-col items-center justify-center p-4 gap-8">
        <div className=" flex flex-col items-center mx-auto container max-w-md sm:max-w-lg md:max-w-2xl">
          <UserInfoSection userId={params.id} />

          <section className="w-full">
            <h2 className="text-2xl font-medium my-4">Тесты пользователя: </h2>
            <div className="grid gap-4 grid-cols-2">
              {userInfo ? (
                userInfo?.quizzes.map((el) => (
                  <QuizItem key={el.id} quiz={el} />
                ))
              ) : (
                <QuizListSkeleton />
              )}
            </div>
          </section>
          <section className="w-full">
            <h2 className="text-2xl font-medium my-4">
              Результаты пользователя:
            </h2>
            <div className="grid gap-4 grid-cols-2">
              {userInfo ? (
                userInfo?.results.map((el, ind) => (
                  <ResultItem key={ind} result={el} />
                ))
              ) : (
                <QuizListSkeleton />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
