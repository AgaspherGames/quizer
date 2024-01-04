import React, { useState } from "react";
import Lights, { LightProps } from "../Background/Lights";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import ForgotPasswordForm from "./ForgotPasswordForm";
interface AuthFormLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  bottom?: React.ReactNode;
  form?: boolean;
  setForm: (form: boolean) => void;
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

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({
  children,
  bottom,
  form,
  setForm,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Lights lights={lights} />
      <Card className=" w-full p-0 max-w-sm shadow-lg rounded-lg overflow-hidden md:max-w-lg">
        <motion.div
          animate={form ? "form" : "forgot"}
          transition={{ duration: 4 }}
          className="flex items-center justify-center w-full overflow-hidden relative"
        >
          <motion.div
            className="w-full max-w-sm md:max-w-lg"
            variants={{
              form: {
                translateX: 0,
              },
              forgot: {
                translateX: "-100%",
              },
            }}
          >
            <div className="px-10 py-12 text-white">{children}</div>
            {bottom}
          </motion.div>
          <motion.div
            className="absolute px-10 py-12"
            initial={{
              translateX: "100%",
            }}
            variants={{
              form: {
                translateX: "100%",
              },
              forgot: {
                translateX: 0,
              },
            }}
          >
            <ForgotPasswordForm
              goBack={() => {
                setForm(true);
              }}
            />
          </motion.div>
        </motion.div>
      </Card>
    </div>
  );
};

export default AuthFormLayout;
