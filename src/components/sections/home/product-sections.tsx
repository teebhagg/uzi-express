import { ProductGrid } from "@/components/common/product-card";
import { ProductWithIncludes } from "@/lib/prisma";
import { productData } from "@/utils/data/products";
import useCustomFetch, { useGet } from "@/utils/hooks/useFetch";

type ProductSectionProps = {
  title: string;
};

export const revalidate = 0;

export default async function ProductSection({ title }: ProductSectionProps) {

  const products = await getProducts();

  return (
    <div className="space-y-4">
      <p className="text-2xl md:2xl lg:3xl xl:5xl font-semibold mb-4">
        {title}
      </p>
      <ProductGrid products={products} />
    </div> 
  );
}

// TODO: Fetch products from API
const getProducts = async (): Promise<ProductWithIncludes[]> => {
  let res = await fetch("http://localhost:3000/api/products", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  if (!res.ok) {
    console.error('Failed to fetch products:', res.status, res.statusText);
    return [];
  }

  let data = await res.json();
  return data as ProductWithIncludes[];
}
