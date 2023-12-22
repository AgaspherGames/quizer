import { Input } from "@/components/ui/input";
import { RegisterRequest } from "@/interfaces/AuthInterfaces";
import React from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registerProps: UseFormRegisterReturn<string>;
}

const AuthInput: React.FC<AuthInputProps> = (
  { registerProps, label, error, name, ...props },
  ref
) => {
  console.log(registerProps);

  return (
    <div>
      <label htmlFor={registerProps.name} className="block text-sm font-medium">
        {label}
        <span className="ml-2 text-red-200 font-normal">{error}</span>
      </label>
      <Input
        className="w-full px-4 py-2 bg-zinc-900 rounded-lg focus:border-transparent"
        {...props}
        {...registerProps}
      />
    </div>
  );
};

export default AuthInput;
