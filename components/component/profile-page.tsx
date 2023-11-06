"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Header } from "./header";
import { IUserInfo } from "@/interfaces/UserInterfaces";
import { getFileLink } from "@/utils/utils";
import { useUserMe } from "@/hooks/useUserInfo";
import { BiSolidPencil } from "react-icons/bi";
import Image from "next/image";
import UserService from "@/services/UserService";

export function ProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { user, update } = useUserMe();

  async function upload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    await UserService.uploadAvatar(formData);
    update();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="flex flex-col items-center justify-center p-4 gap-8">
        <div className="w-full max-w-md mx-auto">
          <div className=" flex items-center gap-4">
            <div className="relative group">
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
              <div className="absolute bottom-0 right-0 bg-zinc-900 p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100">
                <BiSolidPencil className="w-4" />
              </div>
              <input
                onChange={upload}
                type="file"
                className="absolute inset-0 opacity-0"
              />
            </div>
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
