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
import AuthFormLayout from "../AuthForm/AuthFormLayout";
import AuthFormBottom from "../AuthForm/AuthFormBottom";
import AuthInput from "../AuthForm/AuthInput";

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
  const [form, setForm] = useState(true);

  const router = useRouter();
  const {
    register,
    handleSubmit,
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
    <AuthFormLayout
      form={form}
      setForm={setForm}
      bottom={
        <AuthFormBottom>
          <span>Еще нет аккаунта?</span>
          <Link
            className="text-blue-500 hover:text-blue-700 ml-2"
            href="/register"
          >
            Создать
          </Link>
        </AuthFormBottom>
      }
    >
      <h1 className="text-3xl font-bold text-center">Авторизация</h1>
      {error && (
        <p className="text-red-200 text-lg text-center my-2">{error}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <AuthInput
          label="Email"
          registerProps={register("email", { required: true })}
          error={errors.email?.message}
          placeholder="ivan@user@mail.example"
          type="email"
        />
        <AuthInput
          label="Пароль"
          registerProps={register("password", { required: true })}
          error={errors.password?.message}
          placeholder="******"
          type="password"
        />
        <div>
          <Button
            className="w-full py-2 bg-zinc-700 rounded-lg text-white"
            type="submit"
          >
            Войти
          </Button>
        </div>
        <Link
          onClick={() => setForm(false)}
          className="text-blue-500 hover:text-blue-700 block !-mb-8 !mt-2"
          href="#"
        >
          Забыл пароль
        </Link>
      </form>
    </AuthFormLayout>
  );
}
