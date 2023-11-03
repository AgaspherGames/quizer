import Logo from "@/components/component/Logo";
import ProgressBar from "@/components/component/ProgressBar";
import Link from "next/link";

export default function QuestionLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string, questionId: string }
}) {

  return (
    <div className="relative">
      <ProgressBar progress={5} />
      {children}
      <div className="absolute bottom-4 left-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
}
