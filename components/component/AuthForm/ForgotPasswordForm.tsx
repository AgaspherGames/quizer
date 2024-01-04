import Card from "@/components/ui/Card";
import React, { useState } from "react";
import AuthInput from "./AuthInput";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthService from "@/services/AuthService";
import axios from "axios";
import { FaArrowLeft, FaTimes } from "react-icons/fa";

interface ForgotPasswordFormProps {
  goBack: () => void;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Введите корректную почту")
    .required("Это обязательное поле"),
});

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ goBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<{ email: string }> = (data) => sendCode(data);

  const [error, setError] = useState("");

  async function sendCode(data: { email: string }) {
    try {
      //   await AuthService.login(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message == "invalid credentials") {
          setError("Неправильная почта или пароль");
        }
      }
    }
  }
  return (
    <div className="w-full max-w-sm shadow-lg rounded-lg overflow-hidden md:max-w-lg text-white">
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h1 className="text-2xl font-bold text-center mb-4">Забыли пароль?</h1>
        <p>
          Введи почту, к которой привязан ваш аккант, мы вышлем письмо с
          инструкциями для сброса пароля!{" "}
        </p>
        <AuthInput
          label=""
          registerProps={register("email", { required: true })}
          error={errors.email?.message}
          placeholder="Почта"
          type="email"
        />
        <Button
          className="w-full py-2 mt-4 bg-zinc-700 rounded-lg text-white"
          type="submit"
        >
          Отправить письмо
        </Button>
      </form>
      <div className="absolute top-4 left-4">
        <button onClick={goBack}>
          <FaArrowLeft />
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
