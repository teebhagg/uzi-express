"use client";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchData } from "@/utils/data/search";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

export function SearchBar({ ...props }: AlertDialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => setOpen(true)}
        {...props}>
        <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span className="sr-only">Search</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for anything..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {searchData.sidebarNav.map((navItem) => (
              <CommandItem onSelect={() => router.push(navItem.href as string)}>
                <span>{navItem.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
