import { BookIcon, FolderCodeIcon, InfoIcon } from "lucide-react";

export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
}

export const menuItems: MenuItem[] = [
  {
    title: "About",
    url: "/#about",
    description: "Learn more about me and my background.",
    icon: <InfoIcon className="size-5 min-h-fit" />,
  },
  {
    title: "Services",
    url: "/#services",
    description: "Discover my range of services.",
    icon: <BookIcon className="size-5 min-h-fit" />,
  },
  {
    title: "Projects",
    url: "/#projects",
    description: "Explore my past projects and case studies.",
    icon: <FolderCodeIcon className="size-5 min-h-fit" />,
  },
];
