"use client";
import React, { useMemo } from "react";
import {
  SpringOptions,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { FiMousePointer } from "react-icons/fi";

interface props extends React.HTMLAttributes<HTMLDivElement> {
  offset?: number;
}

export const Card3D = ({ children, offset: _offset }: props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const config: SpringOptions = {
    restSpeed: 3,
    damping: 10
};

  const mouseXSpring = useSpring(x, config);
  const mouseYSpring = useSpring(y, config);
  //   const mouseXSpring = useSpring(x);
  //   const mouseYSpring = useSpring(y);
  const thisoffset = 20;

  const offset = 10;

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${offset}deg`, `-${offset}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${offset}deg`, `${offset}deg`]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative "
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className=" inset-4 grid place-content-center "
      >
        {children}
      </div>
    </motion.div>
  );
};
