import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, Heart } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductSchema, Variant } from "@/schema/schema";
import AddtoCartButton from "./AddtoCartButton";

const Product = ({ product }: { product: ProductSchema }) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  useEffect(() => {
    // Ensure a valid variant is selected on initial load
    if (product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product.variants]);

  const handleAddToCart = () => {
    console.log("Adding to cart:", {
      product: product.productName,
      variant: selectedVariant,
      quantity,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src={selectedImage}
              alt={product.productName}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`relative h-24 rounded-lg overflow-hidden ${
                  selectedImage === image ? "ring-2 ring-primary" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.productName}</h1>
          <p className="text-2xl font-semibold">₹{product.price}</p>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={
                  i < 4.5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }
                size={20}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              4.5 (128 reviews)
            </span>
          </div>
          <div className="space-y-4">
            {/* Color Selector */}
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <Select
                value={selectedVariant.color}
                onValueChange={(color) =>
                  setSelectedVariant(
                    product.variants.find((v) => v.color === color) ||
                      product.variants[0]
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.map((variant) => (
                    <SelectItem key={variant.color} value={variant.color}>
                      {variant.color} ({variant.stock} available)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity(Math.min(selectedVariant.stock, quantity + 1))
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedVariant.stock} items available
              </p>
            </div>
          </div>

          {/* Add to Cart and Wishlist Buttons */}
          <div className="flex space-x-4">
            <div>
              <AddtoCartButton
                productToAdd={product}
                variant={selectedVariant}
              />
              <p className="text-sm text-muted-foreground">
                {selectedVariant?.stock || 0} items available
              </p>
            </div>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Tabs Section */}
          <div className="border-t pt-6">
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 mt-4">
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
                <div>
                  <h3 className="font-medium">Category</h3>
                  <p className="text-muted-foreground">{product.category}</p>
                </div>
                <div>
                  <h3 className="font-medium">Sub Categories</h3>
                  <p className="text-muted-foreground">
                    {/* {product.subCategory.join(", ")} */}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="features" className="space-y-4 mt-4">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Premium quality materials</li>
                  <li>Carefully crafted for durability</li>
                  <li>Easy care instructions</li>
                  <li>OEKO-TEX® certified materials</li>
                  <li>Satisfaction guaranteed</li>
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-6 mt-4">
                {/* Reviews */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
