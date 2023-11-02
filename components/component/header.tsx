"use client";
import { Button } from "@/components/ui/button";
import { useAuthState } from "@/hooks/hooks";
import LocalStorageService from "@/services/LocalStorageService";
import { useAuthStore } from "@/stores/AuthStore";
import Link from "next/link";

export function Header() {
  const token = useAuthState();
  return (
    <div className="bg-black p-4 flex justify-between items-center">
      <div>
        <h3 className="text-2xl font-medium">QuizMaster</h3>
      </div>
      {token ? (
        <Link href="#">
          <Button
            className="border-white text-white bg-transparent"
            variant="outline"
          >
            Выйти
          </Button>
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link href="/register">
            <Button
              className="border-white text-white bg-transparent"
              variant="outline"
            >
              Регистрация
            </Button>
          </Link>
          <Link href="/login">
            <Button className="bg-cyan-500 text-white" variant="default">
              Войти
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
