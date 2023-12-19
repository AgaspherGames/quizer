"use client";
import { Button } from "@/components/ui/button";
import { useAuthState } from "@/hooks/hooks";
import AuthService from "@/services/AuthService";
import Link from "next/link";
import Logo from "./Logo";
import { useUserMe } from "@/hooks/useUserInfo";
import HeaderButtons from "./HeaderButtons";

export function Header() {
  const { isAuth, isAuthLoaded } = useAuthState();
  const { userInfo, update } = useUserMe();

  const logout = () => {
    AuthService.logout();
    update();
  };

  return (
    <div className="p-4 flex justify-between items-center">
      <div>
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <HeaderButtons />
    </div>
  );
}
