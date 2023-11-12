import Logo from "@/components/component/Base/Logo";
import ProgressBar from "@/components/component/Quiz/ProgressBar";
import Link from "next/link";

export default function QuestionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string; questionId: string };
}) {
  return (
    <div className="relative">
      <ProgressBar/>
      {children}
      <div className="absolute top-6 left-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
}
