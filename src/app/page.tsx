"use client";
import Bestseller from "@/components/home/BestSeller";
import Foter from "@/components/home/Foter";
import MainCourousel from "@/components/home/MainCourousel";
import Navbar from "@/components/home/Navbar";
import NewArrival from "@/components/home/NewArrival";
import Sevices from "@/components/home/Sevices";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <MainCourousel />
      <Bestseller />
      {/* Features */}
      <section className="bg-secondary py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-4">Premium Materials</h3>
              <p className="text-muted-foreground">
                100% organic cotton and sustainable materials for ultimate
                comfort
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Free Shipping</h3>
              <p className="text-muted-foreground">
                Complimentary shipping on all orders over $100
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">30-Day Returns</h3>
              <p className="text-muted-foreground">
                Try our products risk-free with our easy return policy
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <Sevices /> */}
      <NewArrival />
      <Foter />
    </main>
  );
}
