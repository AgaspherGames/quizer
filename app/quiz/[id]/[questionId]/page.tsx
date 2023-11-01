import { Quiz } from "@/components/component/quiz";
import React from "react";
interface pageProps {
  params: { id: string; questionId: string };
}

const page: React.FC<pageProps> = ({params}) => {
  return <Quiz params={params} />;
};

export default page;
