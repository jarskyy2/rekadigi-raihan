import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { ArrowRight, Eye, Pencil, Trash } from "lucide-react";
import { useCustomer } from "@/hooks/use-customer";
import formatRupiah from "@/lib/rupiah";
import { text } from "stream/consumers";
import { cn } from "@/lib/utils";

const styleByLevel: Record<string, { bg: string }> = {
  warga: {
    bg: "bg-orange-100/50 text-orange-500",
  },
  juragan: {
    bg: "bg-sky-100/50 bg-sky-500",
  },
  sultan: {
    bg: "bg-green-100/50 text-green-500",
  },
  konglomerat: {
    bg: "bg-indigo-100/50 text-indigo-500",
  },
};

const defaultStyle = "bg-gray-200 text-gray-600";

export default function CustomerTable() {
  const { data, isLoading, isError } = useCustomer();
  return (
    <div className="rounded-lg overflow-hidden mt-6">
      <Table className="w-full">
        <TableHeader className="bg-gray-100 text-[#98949E]">
          <TableRow>
            <TableCell className="font-medium">Customer Name</TableCell>
            <TableCell className="font-medium">Level</TableCell>
            <TableCell className="font-medium">Favorite Menu</TableCell>
            <TableCell className="font-medium">Total Transaction</TableCell>
            <TableCell className="font-medium">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white font-semibold">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Error
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "px-6 py-3 rounded-lg capitalize",
                      styleByLevel[customer.level_customer]?.bg || defaultStyle
                    )}
                  >
                    {customer.level_customer || "Unknown"}
                  </span>
                </TableCell>
                <TableCell>
                  {customer.favourite_menu !== null
                    ? customer.favourite_menu
                    : "-"}
                </TableCell>
                <TableCell>
                  {formatRupiah(Number(customer.total_amount))}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" /> Detail
                  </Button>
                  <Button size="sm" variant="outline">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive2">
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="w-full mt-6 rounded-lg bg-gray-100 flex p-4 justify-between items-center">
        <p className="text-[#98949E] text-base font-semibold">
          Showing {data?.total_data} Data Customers
        </p>
        <div className="flex">
          <Button
            size="sm"
            className="bg-white text-black font-semibold px-4 py-4 hover:bg-gray-200 drop-shadow-md"
          >
            1
          </Button>
          <Button
            size="sm"
            className="hover:bg-white text-[#98949E] hover:text-black font-semibold px-4 py-4 bg-transparent"
          >
            2
          </Button>
          <Button
            size="sm"
            className="hover:bg-white text-[#98949E] hover:text-black font-semibold px-4 py-4 bg-transparent"
          >
            3
          </Button>
          <Button
            size="sm"
            className="hover:bg-white text-[#98949E] hover:text-black font-semibold px-4 py-4 bg-transparent"
          >
            ...
          </Button>
          <Button
            size="sm"
            className="hover:bg-white text-[#98949E] hover:text-black font-semibold px-4 py-4 bg-transparent"
          >
            38
          </Button>
          <Button
            size="sm"
            className="hover:bg-white text-[#98949E] hover:text-black font-semibold px-4 py-4 bg-transparent"
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
