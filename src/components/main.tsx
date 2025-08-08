"use client";

import { useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface MainProps {
  children: ReactNode;
  id?: string;
  classNameInView: string;
  classNameNotInView: string;
}

export default function Main({
  children,
  id,
  classNameInView,
  classNameNotInView,
}: MainProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <article
      ref={ref}
      className={isInView ? classNameInView : classNameNotInView}
      id={id}
    >
      {children}
    </article>
  );
}
