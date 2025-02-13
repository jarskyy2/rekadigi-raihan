"use client";

import {
  Layout,
  Server,
  Settings,
  History,
  Menu,
  X,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/home", icon: Layout },
  { name: "Stock", href: "/stock", icon: Server },
  { name: "Customer", href: "/", icon: History },
  { name: "Restaurant", href: "/restaurant", icon: Settings },
  { name: "Design", href: "/design", icon: Settings },
  { name: "Report", href: "/report", icon: Settings },
  { name: "Role & Admin", href: "/role", icon: Settings },
  { name: "Settings", href: "/settings", icon: Settings },
];

const integrationSidebar = [
  { name: "Stock", href: "/stock", icon: Settings },
  { name: "Supply", href: "/supply", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-3 mb-4">
          <Image src={Logo} alt="logo" width={112} height={35} />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="space-y-8">
        <div>
          <label className="text-[#98949E] text-xs">Menu</label>
          <nav className="flex flex-col gap-6 mt-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={cn(
                      "flex gap-2 items-center duration-150",
                      pathname === item.href
                        ? "text-[#5D5FEF] font-bold"
                        : "text-[#98949E] font-semibold hover:text-[#5D5FEF]"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
        <div>
          <label className="text-[#98949E] text-xs">Integration</label>
          <nav className="flex flex-col gap-6 mt-4">
            {integrationSidebar.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={cn(
                      "flex gap-2 items-center",
                      pathname === item.href
                        ? "text-[#5D5FEF] font-bold"
                        : "text-[#98949E] font-semibold"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Button
        size="icon"
        className="fixed top-28 -left-3 lg:hidden z-50 bg-indigo-500"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden",
          isMobileMenuOpen ? "block" : "hidden"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 border-r bg-card/50 backdrop-blur-xl p-6 space-y-3 z-50 transition-transform duration-300 lg:translate-x-0 lg:static  font-[family-name:var(--font-quicksand)]",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </div>
    </>
  );
}
