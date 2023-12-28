"use client";
import Link from "next/link";
import Logo from "./Logo";
import HeaderButtons from "./HeaderButtons";

export function Header() {

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
