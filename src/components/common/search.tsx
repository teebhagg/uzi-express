"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function SearchBar({ ...props }: AlertDialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setOpen(true)}
            {...props}>
            <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Search</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[300px] lg:w-[400px] xl:w-[500px] p-0">
          <Command >
            <CommandInput placeholder="Search for anything..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {searchData.sidebarNav.map((navItem) => (
                  <CommandItem
                    onSelect={() => router.push(navItem.href as string)}>
                    <span>{navItem.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
