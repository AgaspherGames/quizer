"use client";
import QuizForm from "@/components/component/CreatePage/QuizForm";
import { useAuthState } from "@/hooks/hooks";
import Lottie from "lottie-react";
import React from "react";
import useCreateStore from "@/stores/CreateStore";
import { useUserMe } from "@/hooks/useUserInfo";
import LoginRequiredModal from "@/components/component/Modal/LoginRequiredModal";
import { useRouter } from "next/navigation";
interface pageProps {
  params: {
    id: string;
  };
}

const page: React.FC<pageProps> = ({ params }) => {
  const { isAuthLoaded, isAuth } = useAuthState();
  const user_id = useCreateStore((state) => state.user_id);
  const id = useUserMe().userInfo?.user.id;

  const router = useRouter();

  if (isAuthLoaded && !isAuth) {
    router.replace("/quizasd");
  }

  if (id && user_id && id != user_id) {
    return <LoginRequiredModal close={() => {}} isOpen={true} />;
  }
  return (
    <div className="min-h-screen bg-black text-white py-6 flex flex-col justify-center sm:py-12">
      <QuizForm quizId={+params.id} />
    </div>
  );
};

export default page;
