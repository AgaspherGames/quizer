"use client";
import LoginRequiredModal from "@/components/component/Modal/LoginRequiredModal";
import { useAuthState } from "@/hooks/hooks";
import React from "react";

export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth, isAuthLoaded } = useAuthState();
  if (isAuthLoaded && !isAuth)
    return (
      <div className="h-screen">
        <LoginRequiredModal close={() => {}} isOpen={true} />;                                                                                                                                                ````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
      </div>
    );
  return <div>{children}</div>;
}
