"use client";
import { useParsedQuestion } from "@/hooks/hooks";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
interface ProgressBarProps {}

const ProgressBar: React.FC<ProgressBarProps> = () => {
  const path = usePathname();
  const params = useParams<{ id: string; questionId: string }>();
  let { progress } = useParsedQuestion(params?.id||"", params?.questionId||"");
  if (path?.includes("/congratulations")) {
    progress = 1;
  }

  return (
    <div className="absolute inset-x-0 bg-cyan-950">
      <div
        style={{ width: progress * 100 + "%" }}
        className="h-2 bg-cyan-500 rounded-r-full transition-all duration-300 ease-out"
      ></div>
    </div>
  );
};

const ProgressBarHoc = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) return <div></div>;
  return <ProgressBar />;
};

export default ProgressBarHoc;
