import Logo from "@/components/component/Base/Logo";
import Card from "@/components/ui/Card";
import React from "react";
interface TestProps {}

const Test: React.FC<TestProps> = () => {
  return (
    <div className="px-8 py-16">
      <Card className="text-white mx-auto w-[360px] text-justify">
        <div className="text-center">
          <Logo />
        </div>
        <div>
          <h3 className="text-lg font-medium my-4">
            Здравствуйте test! Кто-то только что отправил письмо для сброса
            вашего пароля. Если это были вы, тогда перейдите по этой ссылке:
          </h3>
          <div className="text-center">
            <a className="text-sky-500 text-lg underline" href="">
              Сбросить пароль
            </a>
          </div>
          <h4 className="text-zinc-400 mt-4">
            Если вы не отправляли запрос на сброс пароля, то ничего не делайте.
          </h4>
        </div>
      </Card>
    </div>
  );
};

export default Test;
