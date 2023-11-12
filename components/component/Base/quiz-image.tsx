import { url } from "@/utils/http";
import Image from "next/image";
import React from "react";
interface QuizImageProps {
    image?: string
}

const QuizImage: React.FC<QuizImageProps> = ({image}) => {
  return (
    <>
      {image && (
        <Image
          alt=""
          width="800"
          height="100"
          className="h-32 w-auto rounded-xl object-cover sm:h-64"
          src={`${url}public/` + image}
        />
      )}
    </>
  );
};

export default QuizImage;
