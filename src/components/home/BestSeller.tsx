import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Card1 from "../cards/Card1";
import { useGetBestSellerQuery } from "@/redux/api/prductsApi";
import { ProductSchema } from "@/schema/schema";
import PageLoader from "../Loader/PageLoader";

const Bestseller = () => {
  const temproducts = useGetBestSellerQuery(null);
  if (temproducts.isError) return <>Network Error</>;
  if (temproducts.isLoading) return <PageLoader />;
  if (temproducts.isSuccess) {
    if (temproducts.data) {
      const product: ProductSchema[] = [];
      temproducts.data.data.forEach((p: any) => {
        const newProduct: ProductSchema = {
          productName: p.productName,
          category: p.category,
          images: p.images,
          description: p.description,
          qtyavailable: p.qtyavailable,
          pid: p.pid,
          price: p.price,
          variants: p.variants,
        };
        product.push(newProduct);
      });
      return (
        <div className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured Collections
            </h2>
          </div>
          <Carousel
            className="w-full flex items-center justify-center"
            opts={{
              align: "start",
            }}
          >
            <CarouselContent className="max-w-[1200px]">
              {product?.map((p, i) => {
                return (
                  <CarouselItem key={i} className="xl:basis-1/4 md:basis-1/3">
                    <Card1 product={p} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="justify-between px-4 absolute w-[90%] top-1/2 hidden md:flex">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      );
    }
  }
};

export default Bestseller;
