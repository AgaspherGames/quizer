import ProgressBar from "@/components/component/ProgressBar";

export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>
    <ProgressBar progress={5} />
    {children}
    </div>;
}
