import { Button } from "@/components/ui/button";
import { useAuthState } from "@/hooks/hooks";
import { useUserMe } from "@/hooks/useUserInfo";
import AuthService from "@/services/AuthService";
import Link from "next/link";
import React from "react";
interface HeaderButtonsProps {}

const HeaderButtons: React.FC<HeaderButtonsProps> = () => {
  const { isAuth, isAuthLoaded } = useAuthState();
  const { userInfo, update } = useUserMe();

  const logout = () => {
    AuthService.logout();
    update();
  };

  if (!isAuthLoaded)
    return (
      <div className="flex gap-4 items-center">
        <div className="text-white text-xl font-medium skeleton w-20 "></div>
        <div className="text-white text-xl font-medium skeleton w-20 !h-9 rounded-md"></div>
      </div>
    );

  return (
    <div>
      {isAuth && isAuthLoaded ? (
        <div className="flex gap-4 items-center">
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
};

export default HeaderButtons;
