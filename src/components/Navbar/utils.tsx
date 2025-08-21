import Link from "next/link";
import { NavigationMenuItem, NavigationMenuLink } from "../ui/navigation-menu";
import { MenuItem } from "./data";
import { Link as LinkButton } from "../ui/link";

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        className="hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md bg-inherit px-4 py-2 text-base font-medium transition-colors"
        asChild
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <LinkButton
      href={item.url}
      variant="ghost"
      key={item.title}
      className="justify-start"
    >
      {item.icon}
      <span>{item.title}</span>
    </LinkButton>
  );
};

export { renderMenuItem, renderMobileMenuItem };
