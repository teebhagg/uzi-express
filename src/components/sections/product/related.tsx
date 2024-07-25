import { faker } from "@faker-js/faker";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const RelatedProducts = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-lg group">
          <Link href={`/products/${faker.string.uuid()}`} className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <Image
            src={faker.image.url()}
            alt="Related Product 1"
            width={300}
            height={300}
            className="aspect-square w-full object-cover group-hover:opacity-50 transition-opacity"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">Acme Circles Hoodie</h3>
            <p className="text-sm text-muted-foreground">Cozy and stylish</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-base font-semibold">$59.99</span>
              <span className="text-sm text-muted-foreground line-through">
                $69.99
              </span>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg group">
          <Link href={`/products/${faker.string.uuid()}`} className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <Image
            src={faker.image.url()}
            alt="Related Product 2"
            width={300}
            height={300}
            className="aspect-square w-full object-cover group-hover:opacity-50 transition-opacity"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">Acme Prism Backpack</h3>
            <p className="text-sm text-muted-foreground">Durable and stylish</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-base font-semibold">$79.99</span>
              <span className="text-sm text-muted-foreground line-through">
                $89.99
              </span>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg group">
          <Link href={`/products/${faker.string.uuid()}`} className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <Image
            src={faker.image.url()}
            alt="Related Product 3"
            width={300}
            height={300}
            className="aspect-square w-full object-cover group-hover:opacity-50 transition-opacity"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">Acme Prism Mug</h3>
            <p className="text-sm text-muted-foreground">
              Unique and functional
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-base font-semibold">$14.99</span>
              <span className="text-sm text-muted-foreground line-through">
                $19.99
              </span>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg group">
          <Link href={`/products/${faker.string.uuid()}`} className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
