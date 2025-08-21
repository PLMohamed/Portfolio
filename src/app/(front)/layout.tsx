import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers";
import "@/styles/globals.css";
import { Metadata } from "next";
import { ReactNode } from "react";

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
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="text-foreground bg-background w-screen overflow-x-hidden scroll-smooth">
        <Providers>
          <Navbar className="mb-20" />
          <main className="mb-10 flex flex-col gap-8 scroll-smooth md:gap-12 lg:gap-16">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
