"use client";
import AuthInput from "@/components/component/AuthForm/AuthInput";
import ForgotPasswordForm from "@/components/component/AuthForm/ForgotPasswordForm";
import Lights, { LightProps } from "@/components/component/Background/Lights";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import AuthService from "@/services/AuthService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface pageProps {}

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

const schema = yup.object({
  password: yup
    .string()
    .min(8, "Пароль должен быть от 8 символов")
    .required("Это обязательное поле"),
});

const Page: React.FC<pageProps> = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");

  async function reset({ password }: { password: string }) {
    try {
    } catch (error) {}
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<{ password: string }> = (data) => reset(data);

  return (
    <div className="h-screen flex justify-center items-center text-white">
      <Lights lights={lights} />
    </div>
  );
};

export default Page;
