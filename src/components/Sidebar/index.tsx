import { cn } from "@/lib/utils";
import { Lobster } from "next/font/google";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";
import NavUser from "./user";
import { NavMain } from "./main";

const lobster = Lobster({ subsets: ["latin"], weight: "400", display: "swap" });

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
              size="lg"
            >
              <Link href="/admin">
                <span
                  className={cn(
                    "mx-auto text-center text-lg md:text-xl lg:text-2xl",
                    lobster.className,
                  )}
                >
                  PLMohamed
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
