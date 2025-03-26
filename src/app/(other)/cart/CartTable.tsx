import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Cross1Icon } from "@radix-ui/react-icons";
import { CartSchema } from "@/schema/schema";
import {
  useManipulateQuantityMutation,
  useRemoveFromCartMutation,
} from "@/redux/api/cartApi";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface CartProps {
  cart: CartSchema;
  updateCart: (cart: CartSchema) => void;
}

// const formatDate = (date: Date): string => {
//   const options: Intl.DateTimeFormatOptions = {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   };
//   return date.toLocaleDateString(undefined, options); // Format the date
// };

const CartTable = ({ cart, updateCart }: CartProps) => {
  // Calculate the delivery dates
  const deliveryDate7Days = new Date();
  deliveryDate7Days.setDate(deliveryDate7Days.getDate() + 7); // 7 days later

  const deliveryDate10Days = new Date();
  deliveryDate10Days.setDate(deliveryDate10Days.getDate() + 10); // 10 days later
  const [changeqty] = useManipulateQuantityMutation();
  const [removeqty] = useRemoveFromCartMutation();

  return (
    <section className="w-full h-full">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {/* Your Cart - {Object.keys(cart.products).length} items */}
          </h2>
        </div>

        {/* Products */}
        <div className="p-6 space-y-6">
          {Object.entries(cart.products).map(([productId, productData]) => (
            <div
              key={productId}
              className="flex flex-col md:flex-row items-center bg-gray-50 rounded-lg shadow-sm p-4 space-y-4 md:space-y-0 md:space-x-6"
            >
              {/* Product Image */}
              <div className="w-32 h-32 relative">
                <Image
                  src={productData.product.images[0]}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  alt={productData.product.productName}
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  {productData.product.productName}
                </h3>
                <p className="text-sm text-gray-500">
                  Variant: {productData.variant.color}
                </p>
                <Button
                  type="button"
                  className="mt-4 bg-black hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                  onClick={() =>
                    removeqty({
                      pid: productData.product.pid,
                      variant: productData.variant,
                    })
                  }
                >
                  Remove
                </Button>
              </div>

              {/* Quantity and Price */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 text-gray-600 px-3 py-1 rounded-l hover:bg-gray-300"
                    onClick={() => {
                      if (productData.quantity > 1) {
                        changeqty({
                          itemId: productData.product.pid,
                          quantity: productData.quantity - 1,
                          variant: productData.variant,
                        });
                      } else {
                        removeqty({
                          pid: productData.product.pid,
                          variant: productData.variant,
                        });
                      }
                    }}
                  >
                    -
                  </button>
                  <input
                    min="0"
                    name="quantity"
                    value={productData.quantity}
                    type="number"
                    className="w-12 text-center border-t border-b border-gray-300"
                    readOnly
                  />
                  <button
                    className="bg-gray-200 text-gray-600 px-3 py-1 rounded-r hover:bg-gray-300"
                    onClick={() => {
                      changeqty({
                        itemId: productData.product.pid,
                        quantity: productData.quantity + 1,
                        variant: productData.variant,
                      });
                    }}
                  >
                    +
                  </button>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  ₹
                  {(productData.quantity * productData.product.price).toFixed(
                    0
                  )}{" "}
                  /-
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer
        <div className="bg-gray-100 p-6 text-right">
          <Link href="/checkout">
            <Button className="bg-black hover:bg-grey text-white px-6 py-2 rounded-lg shadow">
              Proceed to Checkout
            </Button>
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default CartTable;
