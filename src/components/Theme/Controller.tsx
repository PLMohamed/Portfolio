"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

export default function ThemeController() {
  const { theme, setTheme } = useTheme();
  const [value, setValue] = useState("");

  const onThemeChange = useCallback(
    (themeToSet: "light" | "dark" | "system") => {
      if (themeToSet === "system") {
        setTheme("system");
        setValue("system");
      } else {
        setTheme(themeToSet);
        setValue(themeToSet);
      }
    },
    [setTheme],
  );

  useEffect(() => {
    const preference = window.localStorage.getItem("theme");
    setValue(preference ?? "system");
  }, []);

  useEffect(() => {
    if (theme) setValue(theme);
  }, [theme]);

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onThemeChange("system")}
        className={cn({
          "bg-accent text-primary hover:bg-accent hover:text-primary":
            value === "system",
        })}
      >
        <MonitorIcon />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onThemeChange("light")}
        className={cn({
          "bg-accent text-primary hover:bg-accent hover:text-primary":
            value === "light",
        })}
      >
        <SunIcon />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onThemeChange("dark")}
        className={cn({
          "bg-accent text-primary hover:bg-accent hover:text-primary":
            value === "dark",
        })}
      >
        <MoonIcon />
      </Button>
    </div>
  );
}
