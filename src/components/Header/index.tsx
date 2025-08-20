"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { Fragment, useCallback } from "react";
import ThemeController from "../Theme/Controller";
import { useParams, usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const BREADCRUMB_TITLES = {
  "/admin": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/users": "Users",
  "/admin/settings": "Settings",
  "/admin/projects/new": "New Project",
  "/admin/projects/[projectId]": "Edit Project",
};

const BREADCRUMB_LINK_TITLE = {
  admin: "Dashboard",
  projects: "Projects",
  users: "Users",
  settings: "Settings",
  new: "New",
};

export default function AdminHeader(): React.JSX.Element {
  const pathname = usePathname();
  const params = useParams();

  const parts = pathname.split("/").filter(Boolean);

  const projectId = params?.projectId;

  const handleParams = useCallback((): keyof typeof BREADCRUMB_TITLES => {
    if (projectId) return "/admin/projects/[projectId]";
    return pathname as keyof typeof BREADCRUMB_TITLES;
  }, [pathname, projectId]);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="me-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumb>
          <BreadcrumbList>
            {parts.slice(0, -1).map((part, index) => (
              <Fragment key={index}>
                <BreadcrumbItem className="max-md:hidden">
                  <BreadcrumbLink
                    href={`/${parts.slice(0, index + 1).join("/")}`}
                  >
                    {
                      BREADCRUMB_LINK_TITLE[
                        part as keyof typeof BREADCRUMB_LINK_TITLE
                      ]
                    }
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="max-md:hidden" />
              </Fragment>
            ))}

            <BreadcrumbItem>
              <BreadcrumbPage>
                {BREADCRUMB_TITLES[handleParams()] || parts[parts.length - 1]}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ThemeController />
    </header>
  );
}
