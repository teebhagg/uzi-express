"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense, useEffect, useState } from "react";
import { cartItemData } from "@/utils/data/cart-items";
import { TrashIcon } from "lucide-react";
import { CartItemWithProduct, CartWithIncludes } from "@/lib/prisma";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/utils/hooks/redux-hooks";
import { useDispatch } from "react-redux";
import { updateCart } from "@/utils/redux/features/cart-slice";
import { useLocalStorage } from "usehooks-ts";

export default function Cart() {

  const [cartData, setCartData, removeCart] = useLocalStorage<
    Partial<CartWithIncludes>
  >("cart", {});
  const cart = useAppSelector((state) => state.cart)
  const dispatch = useDispatch();
  // const [items, setItems] = useState<CartItemWithProduct[]>(cartItemData);
  const handleQuantityChange = (id: string, quantity: number) => {
    if (!cart.items) return;

  const newCartItems = cart.items.map((item) =>
    item.productId === id ? { ...item, count: quantity } : item
  );

  dispatch(updateCart({ ...cart, items: newCartItems }));
  setCartData({ ...cart, items: newCartItems });
  };
  
  const handleRemoveItem = (id: string) => {
    if (!cart.items) return;
    const newCartItems = cart.items.filter((item) => item.productId !== id);
    console.log(newCartItems)
    dispatch(updateCart({
      ...cart,
      items: newCartItems,
    }))
    setCartData({ ...cart, items: newCartItems })
  };

  const handleClearCart = () => {
    if (!cart.items) return;
    dispatch(updateCart({
      ...cart,
      items: [],
    }))
    removeCart()
  }

  const total = cart.items ? cart?.items.reduce(
    (acc, item) => acc + item.product.price * item.count,
    0
  ) : 0;
  const tax = total * 0.08;

  useEffect(() => {
    if (!cartData) return;
    dispatch(updateCart(cartData));
  }, [cartData]);

  return (
    <main
      className={`grid gap-8 py-4 sm:py-6 md:py-8 ${
        cart.items && cart.items.length > 0 && "md:grid-cols-[1fr_320px]"
      }`}>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          {cart.items && cart.items.length > 0 && <Button variant="destructive" size="sm" onClick={handleClearCart}>
            Clear Cart
          </Button>}
        </div>
        <div className="space-y-6">
          {cart.items && cart.items.length > 0 ? (
            cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))
          ) : (
            <div className="flex items-center justify-center ">
              <p>No items in cart</p>{" "}
            </div>
          )}
        </div>
      </div>
      {cart.items && cart.items.length > 0 && (
        <div className="bg-muted rounded-lg p-6 space-y-6 h-fit sticky top-[80px]">
          <div>
            <h2 className="text-lg font-bold mb-2">Order Summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">$250.00</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes(8%)</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>${(total + tax + 250.0).toFixed(2)}</span>
            </div>
          </div>
          <div>
            <label htmlFor="coupon" className="block font-medium mb-2">
              Coupon Code
            </label>
            <div className="flex gap-2">
              <Input
                id="coupon"
                type="text"
                placeholder="Enter coupon code"
                className="flex-1"
              />
              <Button variant="outline">Apply</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full">Proceed to Checkout</Button>
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}

type CartItemProps = {
  item: CartItemWithProduct;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

const CartItem = ({ item, onQuantityChange, onRemove }: CartItemProps) => {
  const { product, count } = item;
  const loader = <Skeleton className="h-[80px] w-[80px] rounded-md"></Skeleton>;
  return (
    <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4">
      <Suspense fallback={<>Loading...</>}>
        <Image
          src={product.images[0]}
          alt="Product Image"
          width={80}
          height={80}
          className="rounded-md object-cover h-[80px] w-[80px]"
        />
      </Suspense>
      <div className="flex-grow">
        <p className="font-medium">{product.title}</p>
        <p className="text-muted-foreground text-sm">{product.brand.title}</p>
        <p className="font-bold"> $ {(product.price * count).toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            disabled={count === 1}
            size="sm"
            className="rounded-full"
            onClick={() => onQuantityChange(item.productId, count - 1)}>
            -
          </Button>
          <span>{count}</span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => onQuantityChange(item.productId, count + 1)}>
            +
          </Button>
        </div>
        <div className="text-right font-medium">
          <Button size="icon" variant="ghost" className="rounded-full" onClick={() => onRemove(item.productId)}>
            <TrashIcon color="red" className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
