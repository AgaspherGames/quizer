import { url } from "@/utils/http";
import { getFileLink } from "@/utils/utils";
import Image from "next/image";
import React from "react";
interface QuizImageProps {
  image?: string;
}

const QuizImage: React.FC<QuizImageProps> = ({ image }) => {
  return (
    <>
      <Image
        alt=""
        width="800"
        height="100"
        className="h-32 w-auto rounded-xl object-cover sm:h-48"
        src={image ? getFileLink(image, "quizzes") : "/images/_defaultQuiz.jpg"}
      />
    </>
  );
};

export default QuizImage;
