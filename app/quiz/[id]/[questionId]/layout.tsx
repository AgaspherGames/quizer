"use client";
import LoginRequiredModal from "@/components/component/Modal/LoginRequiredModal";
import { useAuthState } from "@/hooks/hooks";
import React from "react";
interface layoutProps extends React.HTMLAttributes<HTMLDivElement> {}

const layout: React.FC<layoutProps> = ({ children }) => {
  const { isAuth, isAuthLoaded } = useAuthState();
  if (isAuthLoaded && !isAuth)
    return (
      <div className="h-screen">
        <LoginRequiredModal close={() => {}} isOpen={true} />;
      </div>
    );
  return <div>{children}</div>;
};

export default layout;
