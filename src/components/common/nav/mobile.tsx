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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CartWithIncludes } from "@/lib/prisma";
import { useAppSelector } from "@/utils/hooks/redux-hooks";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { updateCart } from "@/utils/redux/features/cart-slice";

export default function MobileNavMenu() {
  const [cartData, setCartData, removeCart] = useLocalStorage<
    Partial<CartWithIncludes>
  >("cart", {});
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!cartData?.items) return;
    dispatch(updateCart(cartData));
  }, [cartData]);

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
        <SheetContent
          side="left"
          className="md:hidden flex h-full max-h-screen flex-col">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
              uzi
            </p>
          </Link>
          <Separator className="p-0 m-0" />
          <nav className="flex-1 overflow-scroll pb-6 space-y-2">
            <Link href="/products" prefetch={false}>
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
            <Link href="/cart" prefetch={false}>
              <div className="w-full p-10 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted space-x-2">
                <div className="flex items-center gap-2 w-fit">
                  <p>Cart</p>
                  {cart.items && cart.items.length > 0 && (
                    <Badge className="bg-red-600 rounded-full text-white">
                      {cart.items.length ?? 0}
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
