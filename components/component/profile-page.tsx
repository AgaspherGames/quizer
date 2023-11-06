"use client";
import { useEffect, useState } from "react";
import { Header } from "./header";
import { IUserInfo } from "@/interfaces/UserInterfaces";
import { getFileLink } from "@/utils/utils";
import { useUserMe } from "@/hooks/useUserInfo";
import Image from "next/image";

export function ProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { user } = useUserMe();
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="flex flex-col items-center justify-center p-4 gap-8">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <Image
              alt="User Image"
              className="rounded-full"
              height="100"
              width="100"
              src={getFileLink(user?.avatar)}
              style={{
                aspectRatio: "1",
                objectFit: "cover",
              }}
            />
            <div>
              <h2 className="text-2xl font-bold">{user?.username}</h2>
              <p className="text-cyan-500">{user?.email}</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Статистика</h3>
            <div className="flex justify-between mt-4">
              <div className="flex flex-col items-center text-center">
                <p className="text-2xl font-bold text-cyan-500">120</p>
                <p className="">Пройденные викторины</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <p className="text-2xl font-bold text-cyan-500">80%</p>
                <p className="">Средний балл</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
