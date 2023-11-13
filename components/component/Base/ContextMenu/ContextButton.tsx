import React from "react";
import { twMerge } from "tailwind-merge";
interface ContextButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  borderBottom?: boolean;
  active?: boolean;
}

const ContextButton: React.FC<ContextButtonProps> = ({
  className,
  borderBottom = false,
  active = false,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "rounded-sm p-2 pr-2 text-left text-sm hover:bg-zinc-700",
        borderBottom && "border-b border-white border-opacity-10",
        active && "bg-zinc-600 hover:bg-zinc-600",
        className
      )}
      {...props}
    />
  );
};

export default ContextButton;
