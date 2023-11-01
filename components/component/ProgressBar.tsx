'use client'
import { useParsedQuestion } from "@/hooks/hooks";
import { useParams } from "next/navigation";
import React from "react";
interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = () => {
  const params = useParams<{questionId: string}>()
  const {progress} = useParsedQuestion(params.questionId)
  
  return (
    <div className="absolute inset-x-0 bg-cyan-950">
      <div style={{width: progress*100+'%'}} className="h-2 bg-cyan-500 rounded-r-full transition-all duration-300 ease-out"></div>
    </div>
  );
};

export default ProgressBar;
