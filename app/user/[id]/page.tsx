import { ProfilePage } from "@/components/component/profile-page";
import React from "react";
interface pageProps {
  params: {
    id: string;
  };
}

const page: React.FC<pageProps> = ({ params }) => {
  return <ProfilePage params={params} />;
};

export default page;
