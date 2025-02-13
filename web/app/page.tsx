"use client";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import BannerCard from "@/components/banner-card";
import CustomerTable from "@/components/customer-table";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("Customer");
  const tabs = ["Customer", "Promo", "Voucher"];
  return (
    <div className="flex-none sm:flex min-h-screen bg-background/50 backdrop-blur-xl font-[family-name:var(--font-quicksand)]">
      <Sidebar />
      <div className="flex-1 z-0">
        <div className="h-full px-8 py-6 space-y-6">
          <div className="space-y-2">
            <h1 className="font-bold text-2xl">Customer</h1>
            <p className="text-sm text-[#98949E]">
              You can manage and organize your customer and other things here
            </p>
            <div className="w-full border-b flex justify-end">
              {tabs.map((tab) => (
                <h1
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-[24px] py-[12px]  font-bold transition-all duration-300 cursor-pointer",
                    activeTab === tab
                      ? "border-b-[#5D5FEF] border-b-4 text-[#5D5FEF]"
                      : "text-[#98949E] font-semibold"
                  )}
                >
                  {tab}
                </h1>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Right Side (Ditaruh di atas pada layar kecil) */}
            <div className="order-2 lg:order-1 col-span-8">
              <BannerCard />
              <CustomerTable />
            </div>

            {/* Left Side (Dibawah pada layar kecil) */}
            <div className="order-1 lg:col-span-4">
              <h1>asdad</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
