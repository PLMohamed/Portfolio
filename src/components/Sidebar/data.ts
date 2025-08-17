import { FolderOpenIcon, LayoutDashboardIcon, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface SidebarItem {
  title: string;
  url: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Projects",
    url: "/admin/projects",
    icon: FolderOpenIcon,
  },
];
