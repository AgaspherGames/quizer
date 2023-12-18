import React from "react";
import { twMerge } from "tailwind-merge";
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "normal" | "small" | "big";
}

const paddings = {
  normal: "px-8 py-6",
  small: "px-6 py-4",
  big: "px-12 py-8",
};

const Card: React.FC<CardProps> = ({
  className,
  padding = "normal",
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "px-8 py-6 bg-blakc shadow-lg rounded-3xl bg-zinc-900",
        paddings[padding],
        className
      )}
      {...props}
    />
  );
};

export default Card;
