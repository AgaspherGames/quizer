import React from "react";
import Lights, { LightProps } from "../Background/Lights";
import Card from "@/components/ui/Card";
interface AuthFormLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  bottom?: React.ReactNode;
}

const lights: LightProps[] = [
  {
    color: "sky",
    pos: "opacity-50 top-1/2 left-1/2",
    size: "medium",
  },
  {
    color: "teal",
    pos: "opacity-50 top-1/3 right-0",
    size: "small",
    translateToRight: true,
  },
  {
    color: "sky",
    pos: "opacity-50 bottom-0 left-0",
    size: "medium",
    translateToBottom: true,
  },
];

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({
  children,
  bottom,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Lights lights={lights} />

      <Card className="w-full p-0 max-w-sm shadow-lg rounded-lg overflow-hidden md:max-w-lg">
        <div className="px-10 py-12 text-white">{children}</div>
        {bottom}
      </Card>
    </div>
  );
};

export default AuthFormLayout;
