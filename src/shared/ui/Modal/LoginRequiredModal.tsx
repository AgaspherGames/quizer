import React from "react";
import Modal, { ModalProps } from "./Modal";
import Lottie from "lottie-react";
import anim from "@/public/animations/Frame 2.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface LoginRequiredModalProps extends ModalProps {
  text?: React.ReactNode;
}

const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({
  text,
  ...props
}) => {
  const message = text ?? (
    <>
      Для прохождения теста вы должны <br />
      войти в учетную запись
    </>
  );
  return (
    <Modal
      className="flex items-center justify-center bg-black bg-opacity-40"
      {...props}
    >
      <div className="container bg-zinc-950 rounded-3xl text-white p-8">
        <h3 className="text-3xl font-semibold text-center">
          Авторизация обязательна
        </h3>
        <Lottie className="w-96 h-96" animationData={anim} />
        <h3 className="text-xl font-semibold text-center">{message}</h3>
        <div className="flex justify-center mt-4 px-12">
          <Button className="w-full" variant={"outline"}>
            <Link className="w-full" href={"/login"}>
              Войти
            </Link>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginRequiredModal;
