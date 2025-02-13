import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Banner from "@/public/bg-banner.jpg";
import Link from "next/link";

export default function BannerCard() {
  return (
    <div className="relative bg-[#5D5FEF] rounded-[8px] h-[167px] p-[12px] text-white overflow-hidden">
      <div className="relative flex flex-col justify-between h-full z-20">
        <h1 className="text-xl font-semibold">Customer</h1>
        <p className="text-xs tracking-wide">
          On this menu you will be able to create, edit, and also delete the{" "}
          <br />
          customer. Also you can manage it easily
        </p>
        <div className="flex">
          <Link href="/customer/add">
            <Button className="bg-white/20 hover:bg-white/30">
              <Plus />
              Add New Customer
            </Button>
          </Link>
        </div>
      </div>
      {/* Banner Kanan */}
      <div className="absolute top-0 lg:top-[-50px] left-0 lg:left-14 w-3/4 lg:w-1/2 h-[400px] bg-white/40 transform translate-x-full rotate-[-45deg] border-4 border-white/40 overflow-hidden">
        <div className="relative h-full w-[600px] rotate-45 left-[-30px] top-[-50px] z-0">
          <Image
            src={Banner}
            alt="Banner"
            width={700}
            height={700}
            className="absolute bg-black bg-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-[20%]"></div>
      </div>
      {/* Dust */}
      <div className="absolute inset-0 bg-dust opacity-[20%]"></div>
    </div>
  );
}
