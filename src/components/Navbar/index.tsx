"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Lobster } from "next/font/google";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { menuItems } from "./data";
import { renderMenuItem, renderMobileMenuItem } from "./utils";
import NavbarDesktopContainer from "./Container";
import ThemeController from "../Theme/Controller";
import Link from "next/link";

const lobster = Lobster({ subsets: ["latin"], weight: "400", display: "swap" });

export default function Navbar({ className }: { className?: string }) {
  return (
    <NavbarDesktopContainer className={className}>
      <header className="container">
        {/* Desktop Menu */}
        <nav className="relative hidden min-h-10 justify-between lg:flex">
          <Link href="/">
            <span
              className={cn(
                "text-lg font-bold tracking-wider md:text-xl lg:text-2xl",
                lobster.className,
              )}
            >
              PLMohamed
            </span>
          </Link>
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <ThemeController />
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-lg font-bold tracking-wider md:text-xl lg:text-2xl",
                lobster.className,
              )}
            >
              PLMohamed
            </span>
            <div className="flex items-center gap-2">
              <ThemeController />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MenuIcon className="size-4" />
                    <span className="sr-only">Open Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <span
                        className={cn(
                          "text-lg font-bold tracking-wider md:text-xl lg:text-2xl",
                          lobster.className,
                        )}
                      >
                        PLMohamed
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    {menuItems.map((item) => renderMobileMenuItem(item))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </NavbarDesktopContainer>
  );
}
