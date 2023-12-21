"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { LoginRequest, RegisterRequest } from "@/interfaces/AuthInterfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthService from "@/services/AuthService";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = yup.object({
  email: yup
    .string()
    .email("Введите корректную почту")
    .required("Это обязательное поле"),
  password: yup
    .string()
    .min(8, "Пароль должен быть от 8 символов")
    .required("Это обязательное поле"),
});

export function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<LoginRequest> = (data) => login(data);

  const [error, setError] = useState("");

  async function login(data: LoginRequest) {
    try {
      await AuthService.login(data);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message == "invalid credentials") {
          setError("Неправильная почта или пароль");
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm shadow-lg rounded-lg overflow-hidden md:max-w-lg">
        <div className="px-10 py-12 bg-zinc-950 text-white">
          <h1 className="text-3xl font-bold text-center">Авторизация</h1>
          {error && (
            <p className="text-red-200 text-lg text-center my-2">{error}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium">
                Email{" "}
                <span className="ml-2 text-red-200 font-normal">
                  {errors.email?.message}
                </span>
              </label>
              <Input
                {...register("email", { required: true })}
                className="w-full px-4 py-2 bg-zinc-900 rounded-lg focus:border-transparent"
                placeholder="ivan@user@mail.example"
                type="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Пароль{" "}
                <span className="ml-2 text-red-200 font-normal">
                  {errors.password?.message}
                </span>
              </label>
              <Input
                {...register("password", { required: true })}
                className="w-full px-4 py-2 bg-zinc-900 rounded-lg focus:border-transparent"
                placeholder="******"
                type="password"
              />
            </div>
            <div>
              <Button
                className="w-full py-2 bg-zinc-700 rounded-lg text-white"
                type="submit"
              >
                Войти
              </Button>
            </div>
          </form>
        </div>
        <div className="px-10 py-4 bg-zinc-900 text-center text-white">
          <span>Еще нет аккаунта?</span>
          <Link className="text-blue-500 hover:text-blue-700 ml-2" href="/register">
            Создать
          </Link>
        </div>
      </div>
    </div>
  );
}
