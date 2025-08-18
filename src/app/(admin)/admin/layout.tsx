import AdminHeader from "@/components/Header";
import TokenHandler from "@/components/Other/Token";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { withAuthPage } from "@/lib/server/wrappers";
import Providers from "@/providers";
import "@/styles/globals.css";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";

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
            <main className="flex h-full w-full flex-col scroll-smooth">
              <AdminHeader />
              <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
              </div>
            </main>
            <Toaster position="bottom-right" />

            <Suspense>
              <TokenHandler />
            </Suspense>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}

export default withAuthPage(RootLayout);
