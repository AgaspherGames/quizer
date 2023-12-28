import React from "react";
interface AuthFormBottomProps extends React.HTMLAttributes<HTMLDivElement> {}

const AuthFormBottom: React.FC<AuthFormBottomProps> = ({ children }) => {
  return (
    <div className="px-10 py-4 bg-zinc-900 bg-opacity-50 border-t border-zinc-700 text-center text-white">
      {children}
    </div>
  );
};

export default AuthFormBottom;
