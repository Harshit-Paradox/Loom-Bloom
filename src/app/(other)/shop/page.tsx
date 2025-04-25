"use client";
import React, { useEffect, useState } from "react";
// import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
import {
  useGetProductsWithFilterMutation,
  useGetCategoriesQuery,
} from "@/redux/api/prductsApi";
import { ProductSchema } from "@/schema/schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import PageLoader from "@/components/Loader/ShopLoader";
import { Slider } from "@/components/ui/slider";

const ShopPage = () => {
  const [products, setProducts] = useState<Array<ProductSchema> | null>(null);
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [sortBy, setSortBy] = useState<string>("price");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [page, setPage] = useState<number>(0);
  const [maxpage, setMaxPage] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200);

  const [getProducts, { isLoading, isError, data }] =
    useGetProductsWithFilterMutation();
  const { data: categoryData, isSuccess: categorySuccess } =
    useGetCategoriesQuery(null);

  useEffect(() => {
    if (categorySuccess && categoryData?.categories) {
      setCategories([
        "all",
        ...categoryData.categories.map((c: any) => c.name),
      ]);
    }
  }, [categoryData, categorySuccess]);

  useEffect(() => {
    const params: any = {
      sort: sortBy,
      category: selectedCategory === "all" ? undefined : selectedCategory,
    };

    if (priceRange) {
      params.priceRange = priceRange;
    }

    getProducts(params);
  }, [sortBy, selectedCategory, priceRange]);

  useEffect(() => {
    if (data) {
      setProducts(data.data);
      const maxProductPrice = Math.max(...data.data.map((p: any) => p.price));
      setMaxPrice(maxProductPrice);
    }
  }, [data]);

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading || !products) {
    return <PageLoader />;
  }

  return (
    <main>
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop Our Collection</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="price">Name (A-Z)</SelectItem>
              <SelectItem value="-price">Name (Z-A)</SelectItem> */}
              <SelectItem value="price">Price (Low to High)</SelectItem>
              <SelectItem value="-price">Price (High to Low)</SelectItem>
              <SelectItem value="sales">Best Selling</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <p className="text-sm font-medium">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </p>
            <Slider
              defaultValue={[0, maxPrice]}
              max={maxPrice}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
          {maxpage > 1 && (
            <nav className="flex space-x-2 justify-center mb-5">
              <div className="flex overflow-x-auto no-scrollbar gap-2 px-2">
                {/* Pagination Controls */}
                <Button
                  onClick={() => setPage(page > 0 ? page : 0)}
                  disabled={page === 0}
                  className="text-brown hover:text-white bg-pale px-3 py-1"
                >
                  {"<"}
                </Button>

                <Button
                  onClick={() => setPage(0)}
                  className={`text-brown hover:text-white ${
                    page === 0 ? "bg-lbrown text-white" : "bg-pale"
                  } px-3 py-1`}
                >
                  1
                </Button>

                {page > 1 && maxpage > 4 && (
                  <span className="text-gray-500">...</span>
                )}

                {page > 1 && page < maxpage && (
                  <Button
                    onClick={() => setPage(page - 1)}
                    className={`text-brown hover:text-white ${
                      page === page - 1 ? "bg-lbrown text-white" : "bg-pale"
                    } px-3 py-1`}
                  >
                    {page}
                  </Button>
                )}

                {page > 0 && page < maxpage - 1 && (
                  <Button
                    onClick={() => setPage(page)}
                    className="bg-lbrown text-white px-3 py-1"
                  >
                    {page + 1}
                  </Button>
                )}

                {page < maxpage - 2 && (
                  <Button
                    onClick={() => setPage(page + 1)}
                    className={`text-brown hover:text-white ${
                      page === page + 1 ? "bg-lbrown text-white" : "bg-pale"
                    } px-3 py-1`}
                  >
                    {page + 2}
                  </Button>
                )}

                {page < maxpage - 3 && maxpage > 4 && (
                  <span className="text-gray-500">...</span>
                )}

                <Button
                  onClick={() => setPage(maxpage - 1)}
                  className={`text-brown hover:text-white ${
                    page === maxpage - 1 ? "bg-lbrown text-white" : "bg-pale"
                  } px-3 py-1`}
                >
                  {maxpage}
                </Button>

                <Button
                  onClick={() =>
                    setPage(page < maxpage - 1 ? page + 1 : maxpage - 1)
                  }
                  disabled={page === maxpage - 1}
                  className="text-brown hover:text-white bg-pale px-3 py-1"
                >
                  {">"}
                </Button>
              </div>
            </nav>
          )}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

function ProductCard({ product }: { product: ProductSchema }) {
  return (
    <Link href={`/product/${product.pid}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader className="p-0">
          <div className="relative h-64">
            <Image
              src={product.images[0]}
              alt={product.productName}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.productName}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            {/* <p>Category: {product.category}</p> */}
            {/* <p>Available: {product.qtyavailable}</p> */}
            {/* <p>Price: ${product.price}</p> */}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <span className="text-lg font-semibold">${product.price}</span>
          <Button>View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ShopPage;
