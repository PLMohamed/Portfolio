import { Link } from "../ui/link";
import { NavigationMenuItem, NavigationMenuLink } from "../ui/navigation-menu";
import { MenuItem } from "./data";

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md bg-inherit px-4 py-2 text-base font-medium transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link
      href={item.url}
      variant="ghost"
      key={item.title}
      className="justify-start"
    >
      {item.icon}
      <span>{item.title}</span>
    </Link>
  );
};

export { renderMenuItem, renderMobileMenuItem };
