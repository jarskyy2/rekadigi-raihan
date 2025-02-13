import { Customer, CustomerResponse } from "@/lib/definition";
import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "@/lib/action";

export const useCustomer = () => {
    const { data, isLoading, isError } = useQuery<CustomerResponse>({
        queryKey: ["customer"],
        queryFn: async () => getCustomer(),
      });

    return {data, isLoading, isError}
}