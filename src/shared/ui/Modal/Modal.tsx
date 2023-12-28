"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
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

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && isOpen
    ? createPortal(
        <div
          onClick={close}
          className={twMerge("fixed inset-0 z-50", className)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
