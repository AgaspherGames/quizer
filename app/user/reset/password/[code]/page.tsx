import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { LightProps, Lights } from "@/src/shared/ui/Background";
import { CustomInput } from "@/src/shared/ui/Form";
import React from "react";
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

const page: React.FC<pageProps> = () => {
  return (
    <div className="h-screen flex justify-center items-center text-white">
      <Lights lights={lights} />

      <Card>
        <h1 className="text-2xl font-bold text-center mb-4">Сброс пароля</h1>
        <CustomInput placeholder="Новый пароль" />
        <Button
          className="w-full py-2 mt-4 bg-zinc-700 rounded-lg text-white"
          type="submit"
        >
          Сбросить
        </Button>
      </Card>
    </div>
  );
};

export default page;
