import React from "react";
import { twMerge } from "tailwind-merge";
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classname?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  classname,
  onChange,
  value,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "w-full px-4 py-2 bg-zinc-900 rounded-lg ",
        classname
      )}
    >
      <input
        className="bg-transparent outline-none w-full"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
