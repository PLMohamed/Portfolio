"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  id?: string;
  classNameInView: string;
  classNameNotInView: string;
  className?: string;
}

export default function FadeIn({
  children,
  id,
  classNameInView,
  classNameNotInView,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Slot
      ref={ref}
      className={cn(className, isInView ? classNameInView : classNameNotInView)}
      id={id}
    >
      {children}
    </Slot>
  );
}
