'use client';

import CarouselImages from "@/components/sections/product/carousel-images";
import Details from "@/components/sections/product/details";
import { RelatedProducts } from "@/components/sections/product/related";
import { Reviews } from "@/components/sections/product/review";
import { Specifications } from "@/components/sections/product/specification";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductWithIncludes } from "@/lib/prisma";
import { useFetch } from "@/utils/hooks/useFetch";
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, error, loading } = useFetch<ProductWithIncludes>(`/api/products/${id}`);

  return (
    <div className="bg-background">
      {error ? (
        <div className="mt-12 w-full h-full text-center">{error}</div>
      ) : (
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading || !product ? (
              <Skeleton className="col-span-1 md:col-span-1 lg:col-span-2 w-full aspect-[4/3]" />
            ) : (
              <CarouselImages imgUrl={product.images} />
            )}
            {loading || !product ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <Details product={product} />
            )}
          </div>
          <div className="mt-12 md:mt-16 lg:mt-20">
            <Separator />
            {loading || !product ? (
              <Skeleton className="h-96 w-full" />
            ) : (
              <div className="grid gap-8 py-8 md:py-12 lg:py-16">
                <div>
                  <h2 className="text-2xl font-bold">Product Description</h2>
                  <div className="mt-4 text-muted-foreground">
                    <p>{product.description}</p>
                  </div>
                </div>
                <Specifications />
                <Reviews />
                <RelatedProducts />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
