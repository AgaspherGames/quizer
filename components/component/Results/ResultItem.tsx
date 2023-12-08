import { IResultItem } from "@/interfaces/QuizInterfaces";
import { getFileLink } from "@/utils/utils";
import Image from "next/image";
import React from "react";
import { BiHash } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import moment from "moment";
interface ResultItemProps {
  isMyResult?: boolean;
  result: IResultItem;
  maxScore: number;
  place: number;
}

const ResultItem: React.FC<ResultItemProps> = ({
  isMyResult = false,
  result,
  maxScore,
  place,
}) => {
  return (
    <div
      id={isMyResult ? "current" : ""}
      className={twMerge(isMyResult && "sticky bottom-4 z-10 ")}
    >
      {isMyResult && (
        <div>
          <div
            style={{
              background:
                "background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
            }}
            className="absolute inset-0 z-0 -my-12"
          ></div>
          <a href="#current" className="absolute inset-0 z-10"></a>
        </div>
      )}
      <div
        className={twMerge(
          "p-6 rounded-lg bg-zinc-900 flex items-center  justify-between relative overflow-hidden",
          isMyResult && "bg-zinc-800"
        )}
      >
        <div className="flex gap-4 items-center">
          <div className="flex justify-center items-center text-2xl mr-2">
            <BiHash />
            <p>{place}</p>
          </div>
          <Image
            alt="Avatar of user"
            height="50"
            src={getFileLink("")}
            style={{
              aspectRatio: "50/50",
              objectFit: "cover",
            }}
            className="rounded-full"
            width="50"
          />
          <h3 className="text-2xl font-semibold">{result.username}</h3>
          <p className="text-xl mx-4 px-4 py-2 rounded-lg bg-zinc-700 ">
            {result.score}/{maxScore}
          </p>
        </div>
        <div className="flex text-xl items-end">
          <p className="">{moment(result.created_at).format("H:mm")}</p>
          <p className="ml-2 text-base text-gray-300">
            {moment(result.created_at).format("DD.MM.YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
