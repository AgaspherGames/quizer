import ProgressBar from "@/components/component/ProgressBar";

export default function QuestionLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {id: string, questionId: string}
}) {
  
  return (
    <div>
      <ProgressBar progress={5} />
      {children}
    </div>
  );
}
