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
import { categories } from "@/utils/data/categories";
import { brands } from "@/utils/data/brands";
import { SubCategoryWithIncludes } from "@/lib/prisma";

type SelectedFilters = {
  priceRange: [number, number];
  category: string[];
  brand: string[];
};

export default function Component() {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    priceRange: [0, 500],
    category: [],
    brand: [],
  });
  const [sortOption, setSortOption] = useState("popularity");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return productData.filter((product) => {
      const inPriceRange =
        product.price >= selectedFilters.priceRange[0] &&
        product.price <= selectedFilters.priceRange[1];
      const inCategory =
        selectedFilters.category.length === 0 ||
        selectedFilters.category.some((cat) =>
          product.categories[0].title.includes(cat)
        );
      const inBrand =
        selectedFilters.brand.length === 0 ||
        selectedFilters.brand.some((brand) =>
          product.brand.title.includes(brand)
        );
      const hasSelectedTag =
        selectedTag === null ||
        (product.subCategory && (product.subCategory as SubCategoryWithIncludes[]).some((subCategory) =>
          subCategory.title.includes(selectedTag)
        ));
      return inPriceRange && inCategory && inBrand && hasSelectedTag;
    });
  }, [selectedFilters, selectedTag]);

  const sortedProducts = useMemo(() => {
    let result = filteredProducts.sort((a, b) => {
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
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [filteredProducts, sortOption, searchTerm]);

  const handlePriceRangeChange = (range: [number, number]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      priceRange: range,
    }));
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
          <div className="mb-4">
            <h3 className="text-md font-bold mb-2">Category</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Label
                  key={category.id}
                  className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedFilters.category.includes(category.title)}
                    onCheckedChange={() => handleCategoryChange(category.title)}
                  />
                  {category.title}
                </Label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-md font-bold mb-2">Brand</h3>
            <div className="grid grid-cols-2 gap-2">
              {brands.map((brand) => (
                <Label
                  key={brand.id}
                  className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedFilters.brand.includes(brand.title)}
                    onCheckedChange={() => handleBrandChange(brand.title)}
                  />
                  {brand.title}
                </Label>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-between mb-4 gap-2 w-full">
            <div className="w-1/2">
              <ScrollArea className=" whitespace-nowrap md:max-w-[400px] overflow-scroll rounded-md">
                <div className="flex items-center gap-2">
                  {categories.map((category) =>
                    category.subCategories.map((subCategory) => (
                      <Button
                        key={subCategory.id}
                        variant={
                          selectedTag === subCategory.title
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => handleTagSelect(subCategory.title)}>
                        {subCategory.title}
                      </Button>
                    ))
                  )}
                </div>
                <Scrollbar orientation="horizontal" />
              </ScrollArea>
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
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 xl:grid-cols-3">
            {sortedProducts && sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <Product product={product} key={product.id} />
              ))
            ) : (
              <div className="text-center w-full h-full">No products found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListOrderedIcon(props: any) {
  return (
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
}
