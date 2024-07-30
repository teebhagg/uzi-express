"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { SearchIcon, StarIcon } from "lucide-react";
import { Product } from "@/components/common/product-card";
import { productData } from "@/utils/data/products";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import {
  ProductWithIncludes,
  SubCategoryWithIncludes,
  BrandWithIncludes,
  CategoryWithIncludes,
} from "@/lib/prisma";
import { useFetch } from "@/utils/hooks/useFetch";
import { Skeleton } from "@/components/ui/skeleton";
import { Sub } from "@radix-ui/react-dropdown-menu";

type SelectedFilters = {
  priceRange: [number, number];
  category: string[];
  brand: string[];
};

const ListOrderedIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <line x1="10" x2="21" y1="6" y2="6" />
    <line x1="10" x2="21" y1="12" y2="12" />
    <line x1="10" x2="21" y1="18" y2="18" />
    <path d="M4 6h1v4" />
    <path d="M4 10h2" />
    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
  </svg>
);

const FilterCategory = ({
  categories,
  selectedFilters,
  onCategoryChange,
  loading,
  error,
}: any) => (
  <div className="mb-4">
    <h3 className="text-md font-bold mb-2">Category</h3>
    {loading ? (
      <Skeleton className="w-full h-8" />
    ) : error ? (
      <div className="text-red-500">Error loading categories</div>
    ) : (
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category: any) => (
          <Label
            key={category.id}
            className="flex items-center gap-2 font-normal">
            <Checkbox
              checked={selectedFilters.category.includes(category.title)}
              onCheckedChange={() => onCategoryChange(category.title)}
            />
            {category.title}
          </Label>
        ))}
      </div>
    )}
  </div>
);

const FilterBrand = ({
  brands,
  selectedFilters,
  onBrandChange,
  loading,
  error,
}: any) => (
  <div className="mb-4">
    <h3 className="text-md font-bold mb-2">Brand</h3>
    {loading ? (
      <Skeleton className="w-full h-16" />
    ) : error ? (
      <div className="text-red-500">Error loading brands</div>
    ) : (
      <div className="grid grid-cols-2 gap-2">
        {brands.map((brand: any) => (
          <Label key={brand.id} className="flex items-center gap-2 font-normal">
            <Checkbox
              checked={selectedFilters.brand.includes(brand.title)}
              onCheckedChange={() => onBrandChange(brand.title)}
            />
            {brand.title}
          </Label>
        ))}
      </div>
    )}
  </div>
);

const ProductList = ({
  products,
  sortedProducts,
  productsLoading,
  productsError,
}: any) => (
  <div className="">
    {productsLoading ? (
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 xl:grid-cols-3">
        {/* <div className="text-center w-full h-full"> */}
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-96" />
        {/* </div> */}
      </div>
    ) : products ? (
      products.length > 0 ? (
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 xl:grid-cols-3">
          {sortedProducts.map((product: any) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center w-full h-full">No products found</div>
      )
    ) : (
      <div className="text-center w-full h-full">Loading...</div>
    )}
  </div>
);

const SubCategoryFilter = ({
  categories,
  selectedTag,
  handleTagSelect,
  loading,
  error,
}: any) => (
  <div>
    {loading ? (
      <Skeleton className="w-full h-8" />
    ) : error ? (
      <div className="text-red-500">Error loading categories</div>
    ) : (
      <ScrollArea className="whitespace-nowrap md:max-w-[400px] overflow-scroll rounded-md">
      <div className="flex items-center gap-2">
        {categories?.flatMap((category: any) =>
          category.subCategories?.map((subCategory: any) => (
            <Button
              key={subCategory.id}
              variant={
                selectedTag === subCategory.title ? "default" : "outline"
              }
              size="sm"
              className="rounded-full"
              onClick={() => handleTagSelect(subCategory.title)}>
              {subCategory.title}
            </Button>
          ))
          )}
      </div>
      <Scrollbar orientation="horizontal" />
    </ScrollArea>
    )}
  </div>
);

export default function Component() {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    priceRange: [0, 500],
    category: [],
    brand: [],
  });
  const [sortOption, setSortOption] = useState("popularity");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: products,
    error: productsError,
    loading: productsLoading,
  } = useFetch<ProductWithIncludes[]>("/api/products");
  const {
    data: categories,
    error: categoriesError,
    loading: categoriesLoading,
  } = useFetch<CategoryWithIncludes[]>("/api/categories/");
  const {
    data: brands,
    error: brandsError,
    loading: brandsLoading,
  } = useFetch<BrandWithIncludes[]>("/api/brands");

  const filteredProducts = useMemo(() => {
    return products?.filter((product) => {
      const inPriceRange =
        product.price >= selectedFilters.priceRange[0] &&
        product.price <= selectedFilters.priceRange[1];
      const inCategory =
        selectedFilters.category.length === 0 ||
        selectedFilters.category.some((cat) =>
          product.categories[0]?.title.includes(cat)
        );
      const inBrand =
        selectedFilters.brand.length === 0 ||
        selectedFilters.brand.some((brand) =>
          product.brand?.title.includes(brand)
        );
      const hasSelectedTag =
        selectedTag === null ||
        (product.subCategory &&
          (product.subCategory as SubCategoryWithIncludes[]).some(
            (subCategory) => subCategory.title.includes(selectedTag)
          ));
      return inPriceRange && inCategory && inBrand && hasSelectedTag;
    });
  }, [selectedFilters, selectedTag, products]);

  const sortedProducts = useMemo(() => {
    let result = filteredProducts?.slice().sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popularity":
        default:
          return 0;
      }
    });

    if (searchTerm) {
      result = result?.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [filteredProducts, sortOption, searchTerm]);

  const handlePriceRangeChange = (range: [number, number]) => {
    setSelectedFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((cat) => cat !== category)
        : [...prev.category, category],
    }));
  };

  const handleBrandChange = (brand: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      brand: prev.brand.includes(brand)
        ? prev.brand.filter((b) => b !== brand)
        : [...prev.brand, brand],
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      priceRange: [0, 500],
      category: [],
      brand: [],
    });
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  return (
    <div className="mx-auto py-8">
      <div className="md:flex items-center justify-between mb-6 space-y-3 md:space-y-0">
        <h1 className="text-2xl font-bold">Product List</h1>
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-2 pl-10 text-sm border focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] xl:grid-cols-[400px_1fr] gap-8">
        <div className="rounded-lg border p-4 h-min md:sticky md:top-[80px]">
          <h2 className="text-lg font-bold mb-4">Filters</h2>
          <FilterCategory
            categories={categories}
            selectedFilters={selectedFilters}
            onCategoryChange={handleCategoryChange}
            loading={categoriesLoading}
            error={categoriesError}
          />
          <FilterBrand
            brands={brands}
            selectedFilters={selectedFilters}
            onBrandChange={handleBrandChange}
            loading={brandsLoading}
            error={brandsError}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-4 gap-2 w-full">
            <div className="w-1/2">
              <SubCategoryFilter
                categories={categories}
                selectedTag={selectedTag}
                handleTagSelect={handleTagSelect}
                loading={categoriesLoading}
                error={categoriesError}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ListOrderedIcon className="w-4 h-4 mr-2" />
                  Sort by: {sortOption}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                  value={sortOption}
                  onValueChange={handleSortChange}>
                  <DropdownMenuRadioItem value="price-asc">
                    Price: Low to High
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-desc">
                    Price: High to Low
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="rating">
                    Rating
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="popularity">
                    Popularity
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ProductList
            products={products}
            sortedProducts={sortedProducts}
            productsLoading={productsLoading}
            productsError={productsError}
          />
        </div>
      </div>
    </div>
  );
}
