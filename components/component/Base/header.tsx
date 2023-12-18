"use client";
import { Button } from "@/components/ui/button";
import { useAuthState } from "@/hooks/hooks";
import AuthService from "@/services/AuthService";
import Link from "next/link";
import Logo from "./Logo";
import { useUserMe } from "@/hooks/useUserInfo";

export function Header() {
  const { isAuth, isAuthLoaded } = useAuthState();
  const { userInfo, update } = useUserMe();

  const logout = () => {
    AuthService.logout();
    update();
  };

  return (
    <div className="bg-black p-4 flex justify-between items-center">
      <div>
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      {isAuth && isAuthLoaded ? (
        <div className="flex gap-4 ">
          <Link
            href={"/user/" + userInfo?.user.id}
            className="text-white text-xl font-medium"
          >
            {userInfo?.user.username}
          </Link>
          <Button
            onClick={logout}
            className="border-white text-white bg-transparent"
            variant="outline"
          >
            Выйти
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button
            className="border-white text-white bg-transparent"
            variant="outline"
          >
            <Link href="/register">Регистрация</Link>
          </Button>
          <Button className="bg-cyan-500 text-white" variant="default">
            <Link href="/login">Войти</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
