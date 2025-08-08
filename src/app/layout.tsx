import NavBar from "@/components/NavBar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Suspense, ReactNode } from "react";
import AboutLoading from "./@about/loading";
import ServiceLoading from "./@services/loading";
import { Metadata } from "next";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Boumedine Mohamed Touati",
  description:
    "Portfolio of Boumedine Mohamed Touati 'aka' PLMohamed - Full Stack Developer",
  keywords: [
    "Boumedine Mohamed Touati",
    "PLMohamed",
    "Full Stack Developer",
    "Developer",
    "Devops",
    "JavaScript",
    "JS",
    "React",
    "Node.js",
    "Next.js",
    "TailwindCSS",
    "Express",
    "HTML",
    "CSS",
    "MYSQL",
    "Docker",
  ],
};

interface RootLayoutProps {
  about: ReactNode;
  services: ReactNode;
  works: ReactNode;
}

export default function RootLayout({
  about,
  services,
  works,
}: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="space-y-28 overflow-x-hidden scroll-smooth bg-slate-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
        <NavBar />
        <main className="flex flex-col  scroll-smooth px-5 md:px-16">
          <Suspense fallback={<AboutLoading />}>{about}</Suspense>
          <Suspense fallback={<ServiceLoading />}>{services}</Suspense>
          {works}
        </main>
      </body>
    </html>
  );
}
