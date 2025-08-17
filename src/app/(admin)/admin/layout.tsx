import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { withAuthPage } from "@/lib/server/wrappers";
import Providers from "@/providers";
import "@/styles/globals.css";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | Boumedine Mohamed Touati",
    template: "%s | Admin Dashboard - PLMohamed",
  },
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

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="text-foreground bg-background min-h-svh w-screen overflow-x-hidden scroll-smooth">
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <main className="mb-10 flex h-full w-full flex-col gap-8 scroll-smooth md:gap-12 lg:gap-16">
              {children}
            </main>
            <Toaster position="bottom-right" />
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}

export default withAuthPage(RootLayout);
