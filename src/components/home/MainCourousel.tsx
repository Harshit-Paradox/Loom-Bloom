"use client";
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Button } from "../ui/button";

const MainCarousel = () => {
  return (
    <Carousel
      className="w-full relative"
      draggable
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="relative h-[270px] sm:h-[400px] md:h-[550px] lg:h-[600px]">
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80"
              alt="Luxury bedding"
              fill
              className="object-cover"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Centered Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                <h1 className="text-5xl font-bold mb-6">
                  Transform Your Bedroom Into a Sanctuary
                </h1>
                <p className="text-xl mb-8">
                  Experience the luxury of premium bedding crafted for your
                  comfort
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100"
                >
                  <Link href="/shop">Shop Collection</Link>
                </Button>
              </div>
            </div>
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="relative h-[270px] sm:h-[400px] md:h-[550px] lg:h-[600px]">
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80"
              alt="Luxury bedding"
              fill
              className="object-cover"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Centered Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                <h1 className="text-5xl font-bold mb-6">
                  Transform Your Bedroom Into a Sanctuary
                </h1>
                <p className="text-xl mb-8">
                  Experience the luxury of premium bedding crafted for your
                  comfort
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100"
                >
                  <Link href="/shop">Shop Collection</Link>
                </Button>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious className="bg-slate-50/25 left-4 hidden md:flex" />
      <CarouselNext className="bg-slate-50/25 right-4 hidden md:flex" />
    </Carousel>
  );
};

export default MainCarousel;
