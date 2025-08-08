import React, { ReactNode } from "react";
import Marquee from "react-fast-marquee";

interface StackWrapperProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
}

export default function StackWrapper({
  children,
  direction = "left",
}: StackWrapperProps) {
  return (
    <Marquee direction={direction} autoFill={true} pauseOnHover={true}>
      {React.Children.map(children, (child: any, index) =>
        React.cloneElement(child, {
          className:
            "box-border flex size-12 items-center justify-center rounded-md bg-white p-1 mx-2 dark:bg-zinc-700",
          key: index,
        }),
      )}
    </Marquee>
  );
}
