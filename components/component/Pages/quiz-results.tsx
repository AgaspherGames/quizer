"use client";
import { Button } from "@/components/ui/button";
import ResultItem from "../Results/ResultItem";
import { useEffect, useState } from "react";
import io, { Socket } from "Socket.IO-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { socket } from "@/lib/socket";

export function QuizResults() {
  const [isConnected, setIsConnected] = useState(socket?.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);

  useEffect(() => {
    console.log(socket);

    socket.on("connect", () => {
      console.log("asdasd");
    });

    socket.on("message", console.log);
  }, []);

  const [soc, setSoc] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const socketInitializer = async () => {
    const socket = io("http://localhost:3000", {
      reconnectionDelayMax: 10000,
    });

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("message", (data) => {
      console.log("data", data);
    });

    socket.io.on("error", console.log);

    setSoc(socket);
  };

  return (
    <section className="w-full h-screen bg-black text-white py-12 md:py-24 lg:py-32">
      <Button onClick={socketInitializer}>asd</Button>
      <Button
        onClick={() => {
          // console.log("aa", socket.emit("message", 2));
          // console.log("aaa", socket.emit("message", { message: 2 }));
          // console.log("aaa", socket.send("message", { message: 2 }));
          console.log("aaa", socket.emit("",2));
        }}
      >
        asd
      </Button>
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Результаты викторины
        </h2>
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            className="bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700"
            variant="outline"
          >
            Сортировать по рейтингу
          </Button>
          <Button
            className="bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700"
            variant="outline"
          >
            Сортировать по имени
          </Button>
          <Button
            className="bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700"
            variant="outline"
          >
            Сортировать по дате загрузки
          </Button>
        </div>
        <div>
          <h3 className="text-3xl font-medium mb-4">Топ результатов</h3>
        </div>
        <div className="flex flex-col gap-6 relative">
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem />

          <ResultItem />
          <ResultItem />
          <ResultItem />
          <ResultItem isMyResult />
          <ResultItem />
          <ResultItem />
        </div>
      </div>
    </section>
  );
}
