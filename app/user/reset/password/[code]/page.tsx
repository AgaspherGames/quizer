"use client";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import AuthService from "@/services/AuthService";
import { AuthInput } from "@/src/shared/ui/AuthForm";
import { LightProps, Lights } from "@/src/shared/ui/Background";
import { CustomInput } from "@/src/shared/ui/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface pageProps {
  params: {
    code: string;
  };
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

const schema = yup.object({
  password: yup
    .string()
    .min(8, "Пароль должен быть от 8 символов")
    .required("Это обязательное поле"),
});

const page: React.FC<pageProps> = ({ params }) => {
  const router = useRouter();

  const [password, setPassword] = useState("");

  async function reset({ password }: { password: string }) {
    try {
      await AuthService.resetPassword({
        code: params.code,
        password,
      });
      router.push("/");
    } catch (error) {}
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ password: string }>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<{ password: string }> = (data) => reset(data);

  return (
    <div className="h-screen flex justify-center items-center text-white">
      <Lights lights={lights} />

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <h1 className="text-2xl font-bold text-center mb-4">Сброс пароля</h1>
          <AuthInput
            label=""
            registerProps={register("password", { required: true })}
            error={errors.password?.message}
            placeholder="Новый пароль"
            type="password"
          />
          <Button
            className="w-full py-2 mt-4 bg-zinc-700 rounded-lg text-white"
            type="submit"
          >
            Сбросить
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default page;
