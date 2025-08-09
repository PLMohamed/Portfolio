"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function NavbarDesktopContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [didScroll, setDidScroll] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);

  const headerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      const headerEl = headerRef.current;

      if (headerEl) {
        setDidScroll(y > headerEl.clientHeight / 3);
      }

      if (y <= 0) {
        setHidden(false);
        lastY = y;
        return;
      }

      if (y > lastY && y > (headerEl?.clientHeight ?? 0)) {
        setHidden(true);
      } else if (y < lastY) {
        setHidden(false);
      }

      lastY = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.section
      className={cn("z-50 mb-20 py-4 duration-150 will-change-transform", {
        "sticky top-0 border-b backdrop-blur-sm": didScroll,
      })}
      ref={headerRef}
      initial={false}
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 500, damping: 40, mass: 0.6 }
      }
    >
      {children}
    </motion.section>
  );
}
