import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRightIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { categories } from "@/utils/data/categories";
import { brands } from "@/utils/data/brands";

export default function MobileNavMenu() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden">
            <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="md:hidden">
          <nav className="flex-1 overflow-auto px-4 py-6 space-y-2">
            <Link
              href="/products"
              prefetch={false}>
              <div className="w-full p-10 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                Products
              </div>
            </Link>
            <Collapsible className="grid gap-2">
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted [&[data-state=open]>svg]:rotate-90">
                Categories
                <ChevronRightIcon className="h-5 w-5 transition-transform" />
              </CollapsibleTrigger>
              <CollapsibleContent className="grid gap-1 pl-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={category.slug}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                    prefetch={false}>
                    {category.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="grid gap-2">
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted [&[data-state=open]>svg]:rotate-90">
                Brands
                <ChevronRightIcon className="h-5 w-5 transition-transform" />
              </CollapsibleTrigger>
              <CollapsibleContent className="grid gap-1 pl-4">
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={brand.slug}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                    prefetch={false}>
                    {brand.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
