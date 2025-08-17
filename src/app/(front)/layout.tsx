import "@/styles/globals.css";
import { Suspense, ReactNode } from "react";
import AboutLoading from "./@about/loading";
import ServiceLoading from "./@services/loading";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/providers/theme";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="text-foreground bg-background w-screen overflow-x-hidden scroll-smooth">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar className="mb-20" />
          <main className="mb-10 flex flex-col gap-8 scroll-smooth md:gap-12 lg:gap-16">
            <Suspense fallback={<AboutLoading />}>{about}</Suspense>
            <Suspense fallback={<ServiceLoading />}>{services}</Suspense>
            <Suspense>{works}</Suspense>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
