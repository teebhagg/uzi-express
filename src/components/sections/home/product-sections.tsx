import { ProductGrid } from "@/components/common/product-card";
import { productData } from "@/utils/data/products";

type ProductSectionProps = {
  title: string;
};

export default function ProductSection({ title }: ProductSectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-2xl md:2xl lg:3xl xl:5xl font-semibold mb-4">
        {title}
      </p>
      <ProductGrid products={productData} />
    </div>
  );
}
