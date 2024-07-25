"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { brands } from "@/utils/data/brands";
import { categories } from "@/utils/data/categories";
import Link from "next/link";
import { forwardRef } from "react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
];

export default function DesktopNavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/products" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <div className="font-normal text-foreground/70">Products</div>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <div className="font-normal text-foreground/70">Categories</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-[400px] w-[350px] rounded-md border p-4">
              {categories.map((category) => (
                <div>
                  <ListItem
                    key={category.id}
                    title={category.slug}
                    href={category.slug}
                  />
                  <Separator />
                </div>
              ))}
            </ScrollArea>
            {/* </ul> */}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <div className="font-normal text-foreground/70">Brands</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-[350px] w-[300px] rounded-md border p-4">
              {brands.map((brand) => (
                <div>
                  <ListItem
                    key={brand.id}
                    title={brand.title}
                    href={brand.slug}
                  />
                  <Separator />
                </div>
              ))}
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href ?? "/"}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
