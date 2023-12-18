import React from "react";
interface layoutProps extends React.HTMLAttributes<HTMLDivElement> {}

const layout: React.FC<layoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;
