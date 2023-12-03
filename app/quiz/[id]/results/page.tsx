import { QuizResults } from "@/components/component/Pages/quiz-results";
import React from "react";
interface pageProps {
  params: { id: string };
}

const page: React.FC<pageProps> = ({ params }) => {
  return <QuizResults params={params} />;
};

export default page;
