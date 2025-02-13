"use client";
import React from "react";
import { Sidebar } from "@/components/sidebar";
import { ArrowBigLeft, ArrowLeftSquareIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const AddCustomerForm = dynamic(() => import("@/components/customer-form"), {
  ssr: false,
});

export default function AddCustomerPage() {
  return (
    <div className="flex-none sm:flex min-h-screen bg-background/50 backdrop-blur-xl font-[family-name:var(--font-quicksand)]">
      <Sidebar />
      <div className="flex-1 z-0">
        <div className="px-8 py-6 space-y-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link href={"/"}>
                <Button size={"sm"}>
                  <ArrowBigLeft />
                </Button>
              </Link>
              <h1 className="font-bold text-2xl">New Customer</h1>
            </div>
            <p className="text-sm text-[#98949E]">
              Please fill in the details below to add a new customer
            </p>
          </div>

          {/*  */}
          <AddCustomerForm />
        </div>
      </div>
    </div>
  );
}
