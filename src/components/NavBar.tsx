"use client";

import Link from "next/link";
import { Inter, Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin"],
});

export default function NavBar() {
  const [isScrolled, setScrolled] = useState<boolean>(false);
  const [menuToggled, toggleMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = (): void => {
    toggleMenu(!menuToggled);
  };

  const handleOverlayClick = (): void => {
    toggleMenu(false);
  };

  return (
    <nav
      className={cn(
        "sticky inset-x-0 top-0 z-50 flex w-screen items-center justify-between border-b border-zinc-800 px-5 py-6 text-slate-900 no-underline backdrop-blur-sm dark:text-white md:px-16",
        inter.className,
        {
          "border-b  border-zinc-800 dark:border-zinc-900": isScrolled,
        },
      )}
    >
      <section>
        <Link
          href="/"
          className={cn(
            "text-xl font-bold uppercase tracking-wider",
            roboto.className,
          )}
        >
          PLMohamed
        </Link>
      </section>
      <section>
        <svg
          className="block h-7 w-7 fill-current md:hidden"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleMenuToggle}
        >
          <title>Mobile menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
        <div
          className={cn(
            "absolute top-0 z-50 flex h-screen w-56 min-w-fit flex-col gap-4 bg-slate-100 px-4 py-5 text-2xl  text-slate-900 transition-all duration-500",
            "dark:bg-zinc-800 dark:text-white md:relative md:left-auto md:top-auto md:flex md:h-fit md:w-fit md:flex-row md:bg-transparent md:bg-none",
            "md:p-0 md:text-lg",
            "md:dark:bg-transparent",
            {
              "left-0": menuToggled,
              "-left-full": !menuToggled,
            },
          )}
        >
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#contact">Contact</Link>
        </div>
        {menuToggled && (
          <div
            className=" absolute left-0 top-0 z-10 h-screen w-screen bg-gray-900 opacity-60"
            onClick={handleOverlayClick}
          ></div>
        )}
      </section>
    </nav>
  );
}
