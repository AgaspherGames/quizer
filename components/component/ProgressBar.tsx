import React from "react";
interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="absolute inset-x-0 bg-cyan-950">
      <div style={{width: progress+'%'}} className="h-2 bg-cyan-500 rounded-r-full transition-all"></div>
    </div>
  );
};

export default ProgressBar;
