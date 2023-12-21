"use client";
import React, { Ref, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";
interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  setIsOpen: Function;
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
  posX?: number;
  posY?: number;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen = false,
  parentRef,
  setIsOpen,
  posX = 0,
  posY = 0,
  children,
}) => {
  const [mounted, setMounted] = React.useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  function clickHandler(e: MouseEvent) {
    if (
      !parentRef?.current?.contains(e.target as Node) &&
      !ref?.current?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }
  function contextHandler(e: MouseEvent) {
    if (!parentRef?.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    setMounted(true);

    window.addEventListener("click", clickHandler);
    window.addEventListener("contextmenu", contextHandler);
    return () => {
      window.removeEventListener("click", clickHandler);
      window.removeEventListener("contextmenu", contextHandler);
    };
  }, []);

  return mounted
    ? ReactDOM.createPortal(
        <div
          ref={ref}
          style={{ top: posY, left: posX }}
          className={twMerge(
            "absolute -translate-x-1/2 -translate-y-full z-50 bg-zinc-800 p-1 rounded-md text-white",
            !isOpen && "hidden"
          )}
        >
          <div className="flex flex-col">{children}</div>
        </div>,
        document.body
      )
    : null;
};

export default ContextMenu;
