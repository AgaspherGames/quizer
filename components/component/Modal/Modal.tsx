"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  close: () => void;
}

const Modal: React.FC<ModalProps> = ({
  close,
  isOpen,
  className,
  children,
  ...props
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return mounted && isOpen
    ? createPortal(
        <div onClick={close} className={twMerge("absolute inset-0", className)}>
          <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
