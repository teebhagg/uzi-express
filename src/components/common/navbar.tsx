"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import UserAvatar from "./user";
import DesktopNavMenu from "./nav/desktop";
import MobileNavMenu from "./nav/mobile";
import { SearchBar } from "./search";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <h1 className="text-3xl font-bold text-violet-600 dark:text-violet-400">
            uzi
          </h1>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <DesktopNavMenu />
        </nav>
        <div className="flex items-center gap-4">
          <SearchBar />
          <ThemeToggle />
          <UserAvatar />
          <MobileNavMenu />
        </div>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-4" />
      ) : (
        <MoonIcon className="h-4" />
      )}
    </Button>
  );
}
