import React from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
// import { DesktopMenu } from "./DesktopMenu";
import Mobilebar from "./MobileMenu";
import { ProfileButtonD } from "./ProfieButton";
import DesktopMenu from "./DesktopMenu";

const Navbar = () => {
  return (
    <div className="sticky z-10 bg-white shadow-sm h-16 top-0 w-full px-5 py-4">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto">
        {/* <Image
          src="/Logo THB.svg"
          // alt={""}
          alt="A cute cat"
          width={50}
          height={50}
          // className="mt-6 sm:mt-8 rounded-md w-[150px] aspect-[2/3] sm:w-[180px] object-cover"
        /> */}
        <Link href="/" className="text-black font-bold text-xl">
          Loom n Bloom
        </Link>
        <DesktopMenu />
        <div className="flex justify-center gap-3 items-center text-black ">
          {/* <Link href="/payment">
            <MagnifyingGlassIcon className="h-[28px] w-[30px]  cursor-pointer"></MagnifyingGlassIcon>
          </Link> */}
          <Link href="/cart">
            <ShoppingBagIcon className="h-[28px] w-[30px]  cursor-pointer"></ShoppingBagIcon>
          </Link>
          <Mobilebar />

          <ProfileButtonD />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
