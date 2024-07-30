import HeroSection from "@/components/sections/home/hero";
import ProductSection from "@/components/sections/home/product-sections";
import Image from "next/image";

export const revalidate = 0;

export default function Home() {
  return (
    <main className="space-y-10 my-10">
      <HeroSection />
      <ProductSection title="Featured" />
      <ProductSection title="Trending" />
      <ProductSection title="Men" />
      <ProductSection title="Women" />
      <ProductSection title="Tech" />
    </main>
  );
}
