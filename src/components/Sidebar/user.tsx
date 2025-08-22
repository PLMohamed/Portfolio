"use client";

import { EllipsisVerticalIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { useGetMe } from "@/hooks/api/useAuth";
import SkeletonNavUser from "../Skeleton/Sidebar/User";
import { Fragment } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function NavUser() {
  const { isMobile } = useSidebar();

  const { data: user, isPending } = useGetMe();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isPending}>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {isPending || !user ? (
                <SkeletonNavUser />
              ) : (
                <Fragment>
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarFallback className="rounded-lg">
                      {user?.name
                        ? user.name?.charAt(0) + user.name?.charAt(1)
                        : user.email.charAt(0) + user.email.charAt(1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.name ?? user.email}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                  <EllipsisVerticalIcon className="ms-auto size-4" />
                </Fragment>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {user?.name
                      ? user?.name.charAt(0) + user?.name.charAt(1)
                      : (user?.email?.charAt(0) ?? "") +
                        (user?.email?.charAt(1) ?? "")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <Tooltip>
                    <TooltipTrigger className="truncate text-start font-medium">
                      {user?.name ?? user?.email}
                    </TooltipTrigger>
                    <TooltipContent align="start" className="font-medium">
                      {user?.name ?? user?.email}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger className="text-muted-foreground truncate text-start text-xs">
                      {user?.email}
                    </TooltipTrigger>
                    <TooltipContent align="start">{user?.email}</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
