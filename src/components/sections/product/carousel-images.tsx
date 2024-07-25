import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { faker } from "@faker-js/faker";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";

interface CarouselImagesProps {
    imgUrl: string[];
}

export default function CarouselImages({ imgUrl }: CarouselImagesProps) {
  const skeletonLoader = (
    <Skeleton className="w-full aspect-[4/3] rounded-lg" />
  );

  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-2">
      <Carousel className="rounded-lg overflow-hidden">
        <CarouselContent>
          {imgUrl.map((url) => (
            <CarouselItem key={url}>
              <Suspense fallback={skeletonLoader}>
                <Image
                  src={url}
                  alt="Product Image"
                  width={800}
                  height={600}
                  className="object-cover w-full aspect-[4/3]"
                />
              </Suspense>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-background/50 hover:bg-background/75 p-2 rounded-full shadow-lg">
          <ChevronLeftIcon className="w-6 h-6 text-foreground" />
        </CarouselPrevious>
        <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-background/50 hover:bg-background/75 p-2 rounded-full shadow-lg">
          <ChevronRightIcon className="w-6 h-6 text-foreground" />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
