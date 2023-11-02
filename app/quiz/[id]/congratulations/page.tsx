import { Congratulations } from "@/components/component/congratulations";
import React from "react";
interface pageProps {
  params: {id:string}
}

const page: React.FC<pageProps> = ({params}) => {
  return <Congratulations params={params} />;
};

export default page;
