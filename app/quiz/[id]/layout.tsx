"use client";

import Logo from "@/components/component/Base/Logo";
import ProgressBar from "@/components/component/Quiz/ProgressBar";
import { useAuthState } from "@/hooks/hooks";
import QuizService from "@/services/QuizService";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function QuestionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  useEffect(() => {
    QuizService.fetchEditQuizInfo(params.id);
  }, []);

  return (
    <div className="relative">
      <ProgressBar />
      {children}
      <div className="absolute top-6 left-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
}
