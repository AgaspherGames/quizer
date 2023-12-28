import React from "react";
import { twMerge } from "tailwind-merge";
import Light, { LightProps } from "./Light";

export interface LightsProps {
  lights: LightProps[];
}

const Lights: React.FC<LightsProps> = ({ lights }) => {
  return (
    <div className="-z-10 absolute inset-0 overflow-hidden">
      {lights.map((el, ind) => (
        <Light {...el} key={ind} />
      ))}
    </div>
  );
};

export default Lights;
