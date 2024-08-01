"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  UserWithIncludes,
  CartWithIncludes,
  ProductWithIncludes,
  CartItemWithProduct,
} from "@/lib/prisma";
import { useAppSelector } from "@/utils/hooks/redux-hooks";
import useFetch, { usePost } from "@/utils/hooks/useFetch";
import { addToCart, updateCart } from "@/utils/redux/features/cart-slice";
import { setUser } from "@/utils/redux/features/user-slice";
import { StarIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "usehooks-ts";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

// interface DetailsProps {
//   title: string;
//   brand: string;
//   rating: number;
//   price: number;
//   discountedPrice?: number;
// }

export default function Details({ product }: { product: ProductWithIncludes }) {
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const cart = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const router  = useRouter();

  const [cartData, setCartData, removeCart] = useLocalStorage<
    Partial<CartWithIncludes>
  >("cart", {});

  // const { data: userData, error: userError, loading: userLoading } = useFetch<UserWithIncludes>("/api/user");
  const {
    data: cartResponse,
    error: cartError,
    loading: cartLoading,
  } = useFetch<CartWithIncludes>("/api/cart");

  // cartData && dispatch(updateCart(cartData));
  // userData && dispatch(setUser(userData));

  const handleAddToCart = async () => {
    if (cart.items?.some(each => each.productId === product.id)){
      return router.push('/cart');
    }

    if (!user || user?.id === "anonymous") {
      setCartData({
          items: [
              ...cartData?.items ?? [],
              {
                  cartId: "anonymous",
                  productId: product.id,
                  product: product,
                  count: 1,
                  id: `anonymous-${(cartData.items ?? []).length + 1}`,
                },
              ],
        userId: "anonymous",
      });
      dispatch(addToCart({
        cartId: "anonymous",
        productId: product.id,
        product: product,
        count: 1,
        id: `anonymous-${(cartData.items ?? []).length + 1}`,
      }))
      toast({
        variant: "default",
        title: "Success!",
        description: "Product added to cart.",
      })
      return <LoginDialog />;
    }
    // setIsLoading(true);
    // var res = await fetch('/api/cart', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ id: user?.id }),
    //   });

    //   if (!res.ok) {
    //     toast({
    //       variant: "destructive",
    //       title: "Error!",
    //       description: "Failed to add product to cart.",
    //     })
    //   }

    //   const data: CartWithIncludes = await res.json();
    //   dispatch(updateCart(data));

    // dispatch(addToCart({ product: product, count: 1, cartId: user!.id!, id: faker.string.uuid(), }));
  };

  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-1">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
        <p className="text-muted-foreground">{product.brand.title}</p>
        <div className="flex items-center gap-2">
          <RatingIcons rating={product.rating} />
          <span className="text-muted-foreground">
            {product.rating} (124 reviews)
          </span>
        </div>
        <div className="flex items-baseline gap-4">
          <span className="text-4xl font-bold">
            $
            {product?.discount !== null
              ? product.price - product.discount!
              : product.price}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ${product.price}
          </span>
        </div>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="color">Color</Label>
            <RadioGroup
              id="color"
              defaultValue="black"
              className="flex items-center gap-2">
              <Label
                htmlFor="color-black"
                className="cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                <RadioGroupItem id="color-black" value="black" />
                Black
              </Label>
              <Label
                htmlFor="color-white"
                className="cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                <RadioGroupItem id="color-white" value="white" />
                White
              </Label>
              <Label
                htmlFor="color-blue"
                className="cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                <RadioGroupItem id="color-blue" value="blue" />
                Blue
              </Label>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="size">Size</Label>
            <RadioGroup
              id="size"
              defaultValue="m"
              className="flex items-center gap-2">
              <Label
                htmlFor="size-xs"
                className="cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                <RadioGroupItem id="size-xs" value="xs" />
                XS
              </Label>
              <Label
                htmlFor="size-s"
                className="cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                <RadioGroupItem id="size-s" value="s" />S
              </Label>
              <Label
                htmlFor="size-m"
                className="cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                <RadioGroupItem id="size-m" value="m" />M
              </Label>
              <Label
                htmlFor="size-l"
                className="cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                <RadioGroupItem id="size-l" value="l" />L
              </Label>
              <Label
                htmlFor="size-xl"
                className="cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                <RadioGroupItem id="size-xl" value="xl" />
                XL
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="lg" onClick={handleAddToCart}>
            {product.isAvailable
              ? !cart.items || cart.items?.length === 0 || cart.items.some(each => each.productId !== product.id)
                ? "Add to cart"
                : "Go to cart"
              : "Out of stock"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const RatingIcons = ({ rating }: { rating: number }) => {
  // Show star icons and if filled based on ratings
  return (
    <div className="flex items-center gap-1">
      {[...Array(rating)].map((_, i) => (
        <StarIcon key={i} className="h-5 w-5 fill-primary" />
      ))}
      {[...Array(5 - rating)].map((_, i) => (
        <StarIcon
          key={i}
          className="h-5 w-5 fill-muted stroke-muted-foreground"
        />
      ))}
    </div>
  );
};

export function LoginDialog() {
  return (
    <Dialog defaultOpen>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login to continue</DialogTitle>
          <DialogDescription>
            Enter your email and password to sign in to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <Separator />
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              {/* <ChromeIcon className="mr-2 h-4 w-4" /> */}
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="0.98em"
                  height="1em"
                  viewBox="0 0 256 262">
                  <path
                    fill="#4285f4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  />
                  <path
                    fill="#34a853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  />
                  <path
                    fill="#fbbc05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  />
                  <path
                    fill="#eb4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  />
                </svg>
              </div>
              Sign in with Google
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
