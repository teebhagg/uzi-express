'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { StarIcon } from "lucide-react";

interface DetailsProps {
  title: string;
  brand: string;
  rating: number;
  price: number;
  discountedPrice?: number;
}

export default function Details ({brand, discountedPrice, price, rating, title}: DetailsProps) {
  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-1">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground">
          {brand}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <StarIcon className="h-5 w-5 fill-primary" />
            <StarIcon className="h-5 w-5 fill-primary" />
            <StarIcon className="h-5 w-5 fill-primary" />
            <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
            <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
          </div>
          <span className="text-muted-foreground">4.3 (124 reviews)</span>
        </div>
        <div className="flex items-baseline gap-4">
          <span className="text-4xl font-bold">${discountedPrice !== null ? (price - discountedPrice!): price}</span>
          <span className="text-sm text-muted-foreground line-through">
            ${price}
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
          <div>
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
          <Button size="lg">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};
