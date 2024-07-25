import CarouselImages from "@/components/sections/product/carousel-images";
import Details from "@/components/sections/product/details";
import { RelatedProducts } from "@/components/sections/product/related";
import { Reviews } from "@/components/sections/product/review";
import { Specifications } from "@/components/sections/product/specification";
import { Separator } from "@/components/ui/separator";
import { productData } from "@/utils/data/products";
import { DropletIcon, RulerIcon, ScissorsIcon, ShirtIcon, StarIcon } from "lucide-react";
import Link from "next/link";

export default function ProductDetails() {

    let product = productData[0];
  return (
    <div className="bg-background">
      <div className="container mx-auto py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <CarouselImages imgUrl={product.images} />
          <Details
            title={product.title}
            price={product.price}
            brand={product.brand.title}
            rating={0}
            discountedPrice={product.discount}
          />
        </div>
        <div className="mt-12 md:mt-16 lg:mt-20">
          <Separator />
          <div className="grid gap-8 py-8 md:py-12 lg:py-16">
            <div>
              <h2 className="text-2xl font-bold">Product Details</h2>
              <div className="mt-4 text-muted-foreground">
                <p>{product.description}</p>
              </div>
            </div>
            <Specifications />
            <Reviews />
            <RelatedProducts />
          </div>
        </div>
      </div>
    </div>
  );
}