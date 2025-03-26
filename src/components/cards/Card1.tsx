/* eslint-disable @next/next/no-img-element */
import React from "react";
import AddtoCartButton from "./AddtoCartButton";
import Link from "next/link";
import { ProductSchema } from "@/schema/schema";

interface CardProps {
  product: ProductSchema;
}

function Card1({ product }: CardProps) {
  return (
    <div className="group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <Link href={`/product/${product?.pid}`}>
        {/* Image Section */}
        <div className="relative h-64 md:h-72">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.productName}
              className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
              No Image Available
            </div>
          )}
        </div>
      </Link>
      {/* Text Section */}
      <div className="p-4 text-center">
        <Link href={`/product/${product?.pid}`}>
          <h3 className="text-lg font-semibold line-clamp-1">
            {product?.productName}
          </h3>
        </Link>
        {/* <p className="text-gray-600 text-sm my-2 line-clamp-2">
          {product.description || "No description available."}
        </p> */}
        <h4 className="text-xl font-bold">
          ₹{product?.price} <span className="text-sm font-normal">/-</span>
        </h4>
        {/* <div className="mt-4">
          <AddtoCartButton productToAdd={product} />
        </div> */}
      </div>
    </div>
  );
}

export default Card1;
