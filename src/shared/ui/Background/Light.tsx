import React from "react";
import { twMerge } from "tailwind-merge";
export interface LightProps {
  size: "small" | "medium";
  color: "sky" | "teal";
  pos: string;
  translateToRight?: boolean;
  translateToBottom?: boolean;
}

const Light: React.FC<LightProps> = ({
  color,
  pos,
  size,
  translateToBottom,
  translateToRight,
}) => {
  return (
    <div
      className={twMerge(
        "light -translate-x-1/2 -translate-y-1/2",
        translateToBottom && "translate-y-1/2",
        translateToRight && "translate-x-1/2",
        pos
      )}
      data-size={size}
      data-color={color}
    ></div>
  );
};

export default Light;
