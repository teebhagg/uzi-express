"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, ShoppingCartIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import UserAvatar from "./user";
import DesktopNavMenu from "./nav/desktop";
import MobileNavMenu from "./nav/mobile";
import { SearchBar } from "./search";
import { Badge } from "../ui/badge";
import { useAppSelector } from "@/utils/hooks/redux-hooks";
import { useFetch } from "@/utils/hooks/useFetch";
import { useDispatch } from "react-redux";
import { updateCart } from "@/utils/redux/features/cart-slice";
import { CartWithIncludes } from "@/lib/prisma";
import { useLocalStorage } from "usehooks-ts";
import { use, useEffect } from "react";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <h1 className="text-3xl font-bold text-violet-600 dark:text-violet-400">
            uzi
          </h1>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <DesktopNavMenu />
        </nav>
        <div className="flex items-center gap-6">
          <SearchBar />
          <ThemeToggle />
          <CartButton />
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

function CartButton() {
  const [cartData, setCartData, removeCart] = useLocalStorage<
    Partial<CartWithIncludes>
  >("cart", {});
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  // const { data, error, loading } = useFetch<CartWithIncludes>(`/api/cart/${user.id}`);
  // const dispatch = useDispatch();
  // data && dispatch(updateCart(data));
  // data && console.log(data)
  useEffect(() => {
    if (!cartData?.items) return;
    dispatch(updateCart(cartData));
  }, [cartData]);
  return (
    <Link href="/cart" passHref className="hidden md:inline-block relative ">
      <Button variant="outline" size="icon" className="rounded-full border-[1px]">
        <ShoppingCartIcon className="h-4" />
      </Button>
      {(cart.items && cart.items.length > 0) && <Badge className="absolute top-[4px] right-[1px] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cart.items.length ?? 0}</Badge>}
    </Link>
  );
}
