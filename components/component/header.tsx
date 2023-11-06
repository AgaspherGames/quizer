"use client";
import { Button } from "@/components/ui/button";
import { useAuthState } from "@/hooks/hooks";
import AuthService from "@/services/AuthService";
import LocalStorageService from "@/services/LocalStorageService";
import { useAuthStore } from "@/stores/AuthStore";
import Link from "next/link";
import Logo from "./Logo";
import { useUserMe } from "@/hooks/useUserInfo";

export function Header() {
  const { token } = useAuthState();
  const { user } = useUserMe();

  const logout = () => {
    AuthService.logout();
  };

  return (
    <div className="bg-black p-4 flex justify-between items-center">
      <div>
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      {token ? (
        <div className="flex gap-4 ">
          <Link
            href={"/user/" + user?.id}
            className="text-white text-xl font-medium"
          >
            {user?.username}
          </Link>
          <Link href="#">
            <Button
              onClick={logout}
              className="border-white text-white bg-transparent"
              variant="outline"
            >
              Выйти
            </Button>
          </Link>
        </div>
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
